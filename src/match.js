import { isEssential, isObject, path } from 'pytils'

import regexName from './regex-name'

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

export const match = (fullName, list, getMatch = true, propPath = ['name']) => {
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

export default match
