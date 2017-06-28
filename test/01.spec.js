const assert = require('assert')

import { regexName, match, rank } from '../src/main'

const list = [
  /*'John Lennon',*/
  'Jose da Silva',
  'José Sìlvéîrã',
  'Jose Silveira',
  'Jôse Sìlveira'
]

const what = 'Jôse  Sìlveira'

describe('name-finder', () => {
  it('regexName', () => {
    const pattern = regexName(what, false)
    assert.equal(
      pattern,
      '(?:[^J]*([J]))?(?:[^oóòõôö]*([oóòõôö]))?(?:[^s]*([s]))?(?:[^eéèẽêë]*([eéèẽêë]))?(?:[^ ]*([ ]))?(?:[^S]*([S]))?(?:[^iíìĩîï]*([iíìĩîï]))?(?:[^l]*([l]))?(?:[^v]*([v]))?(?:[^eéèẽêë]*([eéèẽêë]))?(?:[^iíìĩîï]*([iíìĩîï]))?(?:[^r]*([r]))?(?:[^aáàãâä]*([aáàãâä]))?')
  })

  it('match', () => {
    const listOfNameAndRanks = match(what, list)
    assert.deepEqual(listOfNameAndRanks, [
      { value: 'Jose da Silva', rank: 0.815 },
      { value: 'José Sìlvéîrã', rank: 0.884 },
      { value: 'Jose Silveira', rank: 0.953 },
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
