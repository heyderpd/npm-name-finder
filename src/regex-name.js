import { isEssential, compose } from 'pytils'

let dictionary = [
  'aáàãâä',
  'eéèẽêë',
  'iíìĩîï',
  'oóòõôö',
  'uúùũûü',
  'cç'
].concat([
  'yýỳŷÿ',
  'wẃẁŵẅ',
  'rŕ',
  'pṕ',
  'sśŝ',
  'gǵĝ',
  'kḱ',
  'lĺ',
  'zźẑ',
  'nñńǹ',
  'mḿ',
])

const findMathInDict = args => {
  args.splice(-2)
  const key = args
    .reduce(
      (p, n, k) => n ? k : p) -1
  return key >= 0
    ? dictionary[key]
    : args[0]
}

const replaceDict = function () {
  return arguments.length <= 3
    ? arguments[0]
    : findMathInDict(Array.from(arguments))
}

const initDictionaryReplacer = () => {
  if (dictionary.length > 0) {
    const exp = `([${ dictionary.join("])|([") }])`
    const rgx = RegExp(exp, 'gi')
    return word => word.replace(rgx, replaceDict)

  } else {
    return word => word
  }
}

const replacer = initDictionaryReplacer()

const illegalChars = /[{}():=!$^?*+,|#\-\[\]\.\\]+/gim

const removeIllegalChars = word => word.replace(illegalChars, '')

const spaces = /\s+/gim

const singleSpaces = word => word.replace(spaces, ' ')

const safeStringToRegex = compose(
  singleSpaces,
  removeIllegalChars
)

const getCharPattern = chars => chars
  .split('')
  .map(n => RegExp(`${n}`, 'i'))

const createRegexFromName = (name, removeRef = false) => {
  isEssential([{ name, t: 'string' }])

  const ref = safeStringToRegex(name)
  const pattern = ref
    .split('')
    .map(n => `(?:[^${n}]*([${n}]))?`)
    .map(n => replacer(n))
    .join('')

  return {
    ref,
    pattern: RegExp(pattern, 'i'),
    charPattern: getCharPattern(ref)
  }
}

export default createRegexFromName
