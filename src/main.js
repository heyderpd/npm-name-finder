import { isEssential, isObject, path } from 'pytils'

const illegalChars = /[{}()\[\]:=!\\$^?*+,|-]+/gim

const removeIllegalChars = word => word.replace(illegalChars, '')

const spaces = /\s+/gim

const singleSpaces = word => word.replace(spaces, ' ')

const dict = [
  'aáàãâä',
  'eéèẽêë',
  'iíìĩîï',
  'oóòõôö',
  'uúùũûü',
  'yýỳŷÿ',
  'wẃẁŵẅ',
  'cç',
  'nñńǹ'
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

const initReplacer = () => {
  const exp = `([${ dict.join("])|([") }])`
  if (exp.length > 2) {
    const rgx = RegExp(exp, 'gi')
    return word => word.replace(rgx, replaceDict)
  } else {
    return word => word
  }
}

const replacer = initReplacer()

export const regexName = (name, retRegex = true) => {
  const ref = singleSpaces(removeIllegalChars(name))
  const pattern = ref
    .split('')
    .map(n => `(?:[^${n}]*([${n}]))?`)
    .map(n => replacer(n))
    .join('')
  return retRegex
    ? { ref, pattern: RegExp(pattern, 'i') }
    : pattern
}

const clear = match => match
  .slice(1, match.length)

const compareChars = (pattern, test) => {
  return test
    ? (pattern.exec(test) !== null
      ? 1
      : 0.5)
    : 0
}

const getCharPattern = chars => chars
  .split('')
  .map(n => RegExp(`${n}`, 'i'))

export const match = (fullName, list) => {
  isEssential([
    { fullName, t: 'string' },
    { list, t: 'array' }
  ])
  const { ref, pattern } = regexName(fullName)
  const charPattern = getCharPattern(ref)
  let match
  return list
    .map(item => {
      const name = isObject(item) ? path(['name'], item) : item
      if (match = pattern.exec(name)) {
        const equality = clear(match)
          .map(
            (char, k) => compareChars(charPattern[k], char))
          .reduce(
            (p, n) => p +n, 0) /ref.length *0.6
        if (equality > 0) {
          const length = ref.length /name.length *0.4
          const rank = Math.floor((equality +length) *1000) /1000
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
