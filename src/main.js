import { isEssential, isArray } from 'pytils'

const dict = [
  '[aáàãâ]',
  '[eéèẽê]',
  '[iíìĩî]',
  '[oóòõô]',
  '[uúùũû]'
]

const findKey = args => {
  args.splice(-2)
  const key = args.reduce((p,n,k) => n?k:p) -1
  return key >= 0
    ? dict[key]
    : args[0]
}

const replaceDict = function () {
  return arguments.length <= 3
    ? arguments[0]
    : findKey(Array.from(arguments))
}

const createObj = (word, replaced) => ([ word, replaced ])

const initReplacer = () => {
  const exp = `(${dict.join(")|(")})`
  if (exp.length > 2) {
    const rgx = RegExp(exp, 'gi')
    return word => {
      word = word.split(/\s+/)
      replaced = word.map(w => w.replace(rgx, replaceDict))
      return createObj(word, replaced)
    }
  } else {
    return word => {
      word = word.split(/\s+/)
      return createObj(word, word)
    }
  }
}

const replacer = initReplacer()

export const regexName = fullName => {
  fullName = isArray(fullName)
    ? fullName
    : fullName.split(/\s+/)
  return fullName
    .reduce(
      (p, n, k) => k === 0
        ? `(${n})`
        : `${p}\s+(${n})?`, 0)
}

const compareStrings = (ref, test) => {
  if (test) {
    const _ref = ref
      .split('')
    const pattern = RegExp(
      _ref
        .reduce(
          (p, n) => `${p}(${n})?`, ''),
      'i')
    let match
    if (match = pattern.exec(test)) {
      return (match.length -1) /_ref.length
    }
  }
  return 0
}

export const match = (fullName, list) => {
  isEssential([
    { fullName, t: 'string' },
    { list, t: 'array' }
  ])

  const [ orignal, newName ] = replacer(fullName)
  const _pattern = regexName(newName)
  const max = _pattern.match(/\(/g).length
  const pattern = RegExp(_pattern, 'i')

  return list
    .map(item => {
      let match
      if (match = pattern.exec(item)) {
        const perc = orignal
          .map(
            (name, k) => compareStrings(name, match[k+1]))
          .reduce(
            (p, n) => p +n)
        return {
          value: item,
          rank:  Math.floor(perc /orignal.length *100) /100
        }
      }
    })
    .filter(Boolean)
}

const _sort = get => (_a, _b) => {
  const a = get(_a)
  const b = get(_b)
  return a < b
    ? -1
    : (a > b
      ? 1
      : 0)
}

const byRank = _sort(n => n.rank)

export const rank = (fullName, list) => match(fullName, list)
  .sort(byRank)
  .map(n => n.value)
