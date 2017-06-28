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

const listSortByRank = rank('Jôse Sìlveira', list)

listSortByRank = [
  "Jôse Sìlveira",
  "Jose Silveira",
  "José Sìlvéîrã",
  "Jose da Silva",
  "John Lennon"
]

/*
Match chars:
[J][o]hn L[e]nnon
[J][o][s][e][ ]da [S][i][l][v][a]
*/
```

## Example of rank with list of object's:
```javascript
import { rank } from 'name-finder'

const list = [
  { name: 'John Lennon',   things: [1,2,3] },
  { name: 'José Sìlvéîrã', xyz: '123' },
  { name: 'Jose da Silva', r: 42 },
  { name: 'Jose Silveira', o: o },
  { name: 'Jôse Sìlveira', f: f }
]

const listSortByRank = rank('Jôse Sìlveira', list)

listSortByRank = [
  { name: 'Jôse Sìlveira', f: f },
  { name: 'Jose Silveira', o: o },
  { name: 'José Sìlvéîrã', xyz: '123' },
  { name: 'Jose da Silva', r: 42 },
  { name: 'John Lennon', things: a }
]
```

## Example of match:
```javascript
const listOfNameAndRanks = match('Jôse Sìlveira', list)

listOfNameAndRanks = [
  { value: 'John Lennon',   match: "Jo*e*********", rank: 29.12 },
  { value: 'José Sìlvéîrã', match: "José Sìlvéîrã", rank: 82.69 },
  { value: 'Jose da Silva', match: "Jose Silv***a", rank: 72.3  },
  { value: 'Jose Silveira', match: "Jose Silveira", rank: 93.07 },
  { value: 'Jôse Sìlveira', match: "Jôse Sìlveira", rank: 100   }
]
```

## Example of regexName:
```javascript
const pattern = regexName(what).pattern

pattern = /(?:[^J]*([J]))?(?:[^oóòõôö]*([oóòõôö]))?(?:[^s]*([s]))?(?:[^eéèẽêë]*([eéèẽêë]))?(?:[^ ]*([ ]))?(?:[^S]*([S]))?(?:[^iíìĩîï]*([iíìĩîï]))?(?:[^l]*([l]))?(?:[^v]*([v]))?(?:[^eéèẽêë]*([eéèẽêë]))?(?:[^iíìĩîï]*([iíìĩîï]))?(?:[^r]*([r]))?(?:[^aáàãâä]*([aáàãâä]))?/i
```
