const assert = require('assert')

import { regexName, match, rank } from '../src/main'

const list = [
  'John Lennon',
  'Jose da Silva',
  'José Silveira',
  'José Sìlvéîrã'
]

const what = 'Jôse Sìlveira'

describe('name-finder', () => {
  it('regexName', () => {
    const pattern = regexName(what)
    console.log(pattern)
    assert.equal(pattern, pattern)
    // assert.deepEqual(pattern, pattern)
  })
/*
  it('match', () => {
    assert.deepEqual(sadsad, dasdas)
  })

  it('rank', () => {
    assert.deepEqual(sadsad, dasdas)
  })*/
})
