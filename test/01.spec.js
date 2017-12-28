const assert = require('assert')

import { regexName, match, rank } from '../src'

const list = [
  'John Lennon',
  'José Sìlvéîrã',
  'Jose da Silva',
  'Jose Silveira',
  'Jôse Sìlveira'
]

const what = 'Jô-se  (Sìlve!ir#a'

describe('name-finder', () => {
  it('regexName', () => {
    const pattern = regexName(what, false).pattern

    assert.equal(
      pattern,
      '/(?:[^J]*([J]))?(?:[^oóòõôö]*([oóòõôö]))?(?:[^sśŝ]*([sśŝ]))?(?:[^eéèẽêë]*([eéèẽêë]))?(?:[^ ]*([ ]))?(?:[^sśŝ]*([sśŝ]))?(?:[^iíìĩîï]*([iíìĩîï]))?(?:[^lĺ]*([lĺ]))?(?:[^v]*([v]))?(?:[^eéèẽêë]*([eéèẽêë]))?(?:[^iíìĩîï]*([iíìĩîï]))?(?:[^rŕ]*([rŕ]))?(?:[^aáàãâä]*([aáàãâä]))?/i')
  })

  it('match', () => {
    const listOfNameAndRanks = match(what, list)
    assert.deepEqual(listOfNameAndRanks, [
      { value: 'José Sìlvéîrã', match: "José Sìlvéîrã", rank: 97.3 },
      { value: 'Jose da Silva', match: "Jose Silv***a", rank: 58.53  },
      { value: 'Jose Silveira', match: "Jose Silveira", rank: 98.92 },
      { value: 'Jôse Sìlveira', match: "Jôse Sìlveira", rank: 100   }
    ])
  })

  it('rank', () => {
    const listSortByRank = rank({
      find: what,
      list
    })
    assert.deepEqual(listSortByRank, [
      "Jôse Sìlveira",
      "Jose Silveira",
      "José Sìlvéîrã",
      "Jose da Silva"
    ])
  })
})

const a = [1, 2, 3]
const f = x => x
const o = {}

const listObj = [
  { name: 'John Lennon',   things: [1,2,3] },
  { name: 'José Sìlvéîrã', xyz: '123' },
  { name: 'Jose da Silva', r: 42 },
  { name: 'Jose Silveira', o: o },
  { name: 'Jôse Sìlveira', f: f }
]

const deepListObj = [
  { full: { name: 'Jôse Sìlveira' }, f: f },
  { full: { name: 'Jose Silveira' }, o: o },
  { full: { name: 'José Sìlvéîrã' }, xyz: '123' },
  { full: { name: 'Jose da Silva' }, r: 42 },
  { full: { name: 'John Lennon' }, things: a }
]

describe('name-finder with obj', () => {
  it('match', () => {
    const listOfNameAndRanks = match(what, listObj)
    assert.deepEqual(listOfNameAndRanks, [
      { value: { name: 'José Sìlvéîrã', xyz: '123' },
        rank: 97.3,
        match: 'José Sìlvéîrã' },
      { value: { name: 'Jose da Silva', r: 42 },
        rank: 58.53,
        match: 'Jose Silv***a' },
      { value: { name: 'Jose Silveira', o: o },
        rank: 98.92,
        match: 'Jose Silveira' },
      { value: { name: 'Jôse Sìlveira', f: f },
        rank: 100,
        match: 'Jôse Sìlveira' }
    ])
  })

  it('rank', () => {
    const listSortByRank = rank({
      find: what,
      list: listObj
    })
    assert.deepEqual(listSortByRank, [
      { name: 'Jôse Sìlveira', f: f },
      { name: 'Jose Silveira', o: o },
      { name: 'José Sìlvéîrã', xyz: '123' },
      { name: 'Jose da Silva', r: 42 }
    ])
  })

  it('rank with path', () => {
    const listSortByRank = rank({
      find: what,
      list: deepListObj,
      propPath: ['full', 'name']
    })
    assert.deepEqual(listSortByRank, [
      { full: { name: 'Jôse Sìlveira' }, f: f },
      { full: { name: 'Jose Silveira' }, o: o },
      { full: { name: 'José Sìlvéîrã' }, xyz: '123' },
      { full: { name: 'Jose da Silva' }, r: 42 }
    ])
  })

  it('rank with path and limit', () => {
    const listSortByRank = rank({
      find: what,
      list: deepListObj,
      limit: 0,
      propPath: ['full', 'name']
    })
    assert.deepEqual(listSortByRank, [
      { full: { name: 'Jôse Sìlveira' }, f: f },
      { full: { name: 'Jose Silveira' }, o: o },
      { full: { name: 'José Sìlvéîrã' }, xyz: '123' },
      { full: { name: 'Jose da Silva' }, r: 42 }
    ])
  })
})
