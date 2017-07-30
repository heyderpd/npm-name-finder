const assert = require('assert')

import { regexName, match, rank } from '../dist/main'

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
    const pattern = regexName(what, false)
    assert.equal(
      pattern,
      '(?:[^J]*([J]))?(?:[^oóòõôö]*([oóòõôö]))?(?:[^s]*([s]))?(?:[^eéèẽêë]*([eéèẽêë]))?(?:[^ ]*([ ]))?(?:[^S]*([S]))?(?:[^iíìĩîï]*([iíìĩîï]))?(?:[^l]*([l]))?(?:[^v]*([v]))?(?:[^eéèẽêë]*([eéèẽêë]))?(?:[^iíìĩîï]*([iíìĩîï]))?(?:[^r]*([r]))?(?:[^aáàãâä]*([aáàãâä]))?')
  })

  it('match', () => {
    const listOfNameAndRanks = match(what, list)
    assert.deepEqual(listOfNameAndRanks, [
      { value: 'John Lennon',   match: "Jo*e*********", rank: 29.12 },
      { value: 'José Sìlvéîrã', match: "José Sìlvéîrã", rank: 82.69 },
      { value: 'Jose da Silva', match: "Jose Silv***a", rank: 72.3  },
      { value: 'Jose Silveira', match: "Jose Silveira", rank: 93.07 },
      { value: 'Jôse Sìlveira', match: "Jôse Sìlveira", rank: 100   }
    ])
  })

  it('rank', () => {
    const listSortByRank = rank(what, list)
    assert.deepEqual(listSortByRank, [
      "Jôse Sìlveira",
      "Jose Silveira",
      "José Sìlvéîrã",
      "Jose da Silva",
      "John Lennon"
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
      { value: { name: 'John Lennon', things: a },
        rank: 29.12,
        match: 'Jo*e*********' },
      { value: { name: 'José Sìlvéîrã', xyz: '123' },
        rank: 82.69,
        match: 'José Sìlvéîrã' },
      { value: { name: 'Jose da Silva', r: 42 },
        rank: 72.3,
        match: 'Jose Silv***a' },
      { value: { name: 'Jose Silveira', o: o },
        rank: 93.07,
        match: 'Jose Silveira' },
      { value: { name: 'Jôse Sìlveira', f: f },
        rank: 100,
        match: 'Jôse Sìlveira' }
    ])
  })

  it('rank', () => {
    const listSortByRank = rank(what, listObj)
    assert.deepEqual(listSortByRank, [
      { name: 'Jôse Sìlveira', f: f },
      { name: 'Jose Silveira', o: o },
      { name: 'José Sìlvéîrã', xyz: '123' },
      { name: 'Jose da Silva', r: 42 },
      { name: 'John Lennon', things: a }
    ])
  })

  it('rank with path', () => {
    const listSortByRank = rank(what, deepListObj, ['full', 'name'])
    assert.deepEqual(listSortByRank, [
      { full: { name: 'Jôse Sìlveira' }, f: f },
      { full: { name: 'Jose Silveira' }, o: o },
      { full: { name: 'José Sìlvéîrã' }, xyz: '123' },
      { full: { name: 'Jose da Silva' }, r: 42 },
      { full: { name: 'John Lennon' }, things: a }
    ])
  })

  it('rank with path and limit', () => {
    const listSortByRank = rank(what, deepListObj, ['full', 'name'], 80)
    assert.deepEqual(listSortByRank, [
      { full: { name: 'Jôse Sìlveira' }, f: f },
      { full: { name: 'Jose Silveira' }, o: o },
      { full: { name: 'José Sìlvéîrã' }, xyz: '123' }
    ])
  })
})
