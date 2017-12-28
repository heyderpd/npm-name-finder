import { path } from 'pytils'

import match from './match'

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

export const rank = (_config) => {
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

export default rank
