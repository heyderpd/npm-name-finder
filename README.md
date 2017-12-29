# name-finder
Sorts a list of strings by the similarity of the search value and filter with it

## I will help if you have any difficulty =)
Contact me by [github:heyderpd](https://github.com/heyderpd). I'll be glad to help you.

## Thanks for [npm~lucasmreis](https://www.npmjs.com/~lucasmreis)

## Example of rank with list of strings:
```javascript
import { regexName, match, rank } from 'name-finder'

const list = [
  'John Lennon',
  'José Sìlvéîrã',
  'Jose da Silva',
  'Jose Silveira',
  'Jôse Sìlveira'
]

const listSortByRank = rank({
  find: 'Jôse Sìlveira',
  list
})

listSortByRank = [
  'Jôse Sìlveira',
  'Jose Silveira',
  'José Sìlvéîrã',
  'Jose da Silva'
]

/*
Find:
  [J][o][s][e][ ][S][i][l][v][a]
Match chars:
  [J][o]hn L[e]nnon
  [J][o][s][e][ ]da [S][i][l][v][a]
*/
```

## Example of rank with list of object's:
```javascript
import { rank } from 'name-finder'

const list = [
  { deep: { name: 'John Lennon',   things: [1,2,3] }, },
  { deep: { name: 'José Sìlvéîrã', xyz: '123' }, },
  { deep: { name: 'Jose da Silva', r: 42 },      },
  { deep: { name: 'Jose Silveira', o: o },       },
  { deep: { name: 'Jôse Sìlveira', f: f }        }
]

const listSortByRank = rank({
  find: 'Jôse Sìlveira',
  list,
  propPath: ['deep', 'name'],
  limit: 50
})

listSortByRank = [
  { deep: { name: 'Jôse Sìlveira', f: f }       },
  { deep: { name: 'Jose Silveira', o: o }       },
  { deep: { name: 'José Sìlvéîrã', xyz: '123' } },
  { deep: { name: 'Jose da Silva', r: 42 }      }
]
```

## Example of match:
```javascript
const listOfNameAndRanks = match('Jôse Sìlveira', list)

listOfNameAndRanks = [
  { value: 'José Sìlvéîrã', match: 'José Sìlvéîrã', rank: 97.3  },
  { value: 'Jose da Silva', match: 'Jose Silv***a', rank: 58.53 },
  { value: 'Jose Silveira', match: 'Jose Silveira', rank: 98.92 },
  { value: 'Jôse Sìlveira', match: 'Jôse Sìlveira', rank: 100   }
]
```

## Example of regexName:
```javascript
const pattern = regexName(what).pattern

pattern = /(?:[^J]*([J]))?(?:[^oóòõôö]*([oóòõôö]))?(?:[^sśŝ]*([sśŝ]))?(?:[^eéèẽêë]*([eéèẽêë]))?(?:[^ ]*([ ]))?(?:[^sśŝ]*([sśŝ]))?(?:[^iíìĩîï]*([iíìĩîï]))?(?:[^lĺ]*([lĺ]))?(?:[^v]*([v]))?(?:[^eéèẽêë]*([eéèẽêë]))?(?:[^iíìĩîï]*([iíìĩîï]))?(?:[^rŕ]*([rŕ]))?(?:[^aáàãâä]*([aáàãâä]))?/i
```
