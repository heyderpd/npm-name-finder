import { isEssential, isObject, path, compose } from 'pytils'

export const regexName = (_=>{

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

  return createRegexFromName
})()

export const match = (_=>{

  const clearRegexMath = match => match
    .slice(1, match.length)

  const executeClearPattern = pattern => name => clearRegexMath(pattern.exec(name))

  const compareChars = (pattern, test) => {
    return !!test
      ? (pattern.exec(test) !== null
        ? +1
        : +0.9) // áàãâä
      : -1.5
  }

  const getEquality = (charPattern, ref) => match => match
    .map(
      (char, k) => compareChars(charPattern[k], char))
    .reduce(
      (p, n) => p +n, 0) /ref.length

  const getRank = (ref, name, equality) => {
    const _ref = ref.length
    const _name = name.length
    const length = (_ref -Math.min(Math.abs(_name -_ref), _ref)) /_ref
    return Math.floor((equality *0.7 + length *0.3) *10000) /100
  }

  const getMatchString = match => match.map(n => Boolean(n) ? n : '*').join('')

  const match = (fullName, list, getMatch = true, propPath = ['name']) => {
    isEssential([
      { fullName, t: 'string' },
      { list, t: 'array' }
    ])

    const { ref, pattern, charPattern } = regexName(fullName)
    const _executeClearPattern = executeClearPattern(pattern)
    const _getEquality = getEquality(charPattern, ref)
    let match
    return list
      .map(item => {
        const name = isObject(item) ? path(propPath, item) : item
        if (name) {
          if (match = _executeClearPattern(name)) {
            const equality = _getEquality(match)
            if (equality > 0) {
              return {
                value: item,
                rank: getRank(ref, name, equality),
                match: getMatch ? getMatchString(match) : false
              }
            }
          }
        }
      })
      .filter(Boolean)
  }

  return match
})()

export const rank = (_=>{

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

  const defaultConfig = {
    find: null,
    list: null,
    limit: 0,
    propPath: ['name'],
    returnMatch: true,
    sortItens: true,
    getOnlyValues: true
  }

  // const rank = (fullName, list, limit = 0, returnMatch = true, sortItens = true, getOnlyValues = true) => {
  const rank = (_config) => {
    const config = Object.assign({}, defaultConfig, _config)

    let result = match(
      config.find,
      config.list,
      config.returnMatch,
      config.propPath
    )

    if (config.limit > 0) {
      result = result.filter(item => path('rank', item) >= config.limit)
    }

    if (config.sortItens) {
      result = result.sort(byRank)
    }

    if (config.getOnlyValues) {
      result = result.map(n => n.value)
    }

    return result
  }

  return rank
})()
