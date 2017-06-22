const assert = require('assert')

import { regexName, match, rank } from '../src/main'

const list = [
  'John Lennon',
  'Jose da Silva',
  'José Sìlvéîrã',
  'Jose Silveira',
  'Jôse Sìlveira'
]

const what = 'Jôse Sìlveira'

describe('name-finder', () => {
  it('regexName', () => {
    const pattern = regexName(what)
    assert.equal(
      pattern,
      '/(J[oóòõô]s[eéèẽê])\\s+(S[iíìĩî]lv[eéèẽê][iíìĩî]r[aáàãâ])?/i')
  })

  it('match', () => {
    const listOfNameAndRanks = match(what, list)
    assert.deepEqual(listOfNameAndRanks, [
      { value: 'Jose da Silva', rank: 0.25 },
      { value: 'José Sìlvéîrã', rank: 0.583 },
      { value: 'Jose Silveira', rank: 0.833 },
      { value: 'Jôse Sìlveira', rank: 1 }
    ])
  })

  it('rank', () => {
    const listSortByRank = rank(what, list)
    assert.deepEqual(listSortByRank, [
      "Jôse Sìlveira",
      "Jose Silveira",
      "José Sìlvéîrã",
      "Jose da Silva"
    ])
  })
})
