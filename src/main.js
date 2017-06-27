import { isEssential, isObject, path } from 'pytils'

const dict = [
  '[aáàãâ]',
  '[eéèẽê]',
  '[iíìĩî]',
  '[oóòõô]',
  '[uúùũû]',
  '[yýỳŷ]',
  '[wẃẁŵ]',
  '[cç]'
]

const findKey = args => {
  args.splice(-2)
  const key = args
    .reduce(
      (p, n, k) => n ? k : p) -1
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
    return word => word.replace(rgx, replaceDict)
  } else {
    return word => word
  }
}

const replacer = initReplacer()

export const regexName = (fullName, retRegex = true) => {
  fullName = fullName
    .split(/\s+/)
    .map(n => replacer(n))
    .reduce(
      (p, n, k) => k === 0
        ? `(${n})?`
        : `${p}(?:\\s+)(${n})?`, 0)
  return retRegex
    ? RegExp(fullName, 'i')
    : fullName
}

const clearAndCount = match => match
  .slice(1, match.length)
  .filter(Boolean)
  .length

const compareStrings = (ref, test) => {
  if (test) {
    const pattern = RegExp(
      ref
        .split('')
        .reduce(
          (p, n) => `${p}(?:(${n})|.|)`, ''),
      'i')
    let match
    if (match = pattern.exec(test)) {
      return clearAndCount(match)
    }
  }
  return 0
}

export const match = (fullName, list) => {
  isEssential([
    { fullName, t: 'string' },
    { list, t: 'array' }
  ])

  const _pattern = regexName(fullName, false)
  const orignal = fullName.split(/\s+/)
  const max = _pattern.match(/\(/g).length
  const pattern = RegExp(_pattern, 'i')
  let match

  return list
    .map(item => {
      const name = isObject(item) ? path(['name'], item) : item
      if (match = pattern.exec(name)) {
        const perc = orignal
          .map(
            (sub, k) => ({
              s: compareStrings(sub, match[k+1]),
              l: sub.length
            }))
          .reduce(
            (p, n) => ({
              s: p.s +n.s,
              l: p.l +n.l
            }))
        const rank = Math.floor(perc.s /perc.l *1000) /1000
        if (rank > 0) {
          return {
            value: item,
            rank
          }
        }
      }
    })
    .filter(Boolean)
}

const _sort = get => (_a, _b) => {
  const a = get(_a)
  const b = get(_b)
  return a < b
    ? +1
    : (a > b
      ? -1
      : 0)
}

const byRank = _sort(path(['rank']))

export const rank = (fullName, list) => match(fullName, list)
  .sort(byRank)
  .map(n => n.value)
