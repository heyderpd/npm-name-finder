# name-finder
Sorts a list of strings by the similarity of the search value and filter with it

## I will help if you have any difficulty =)
Contact me by [github:heyderpd](https://github.com/heyderpd). I'll be glad to help you.

## Thanks for [npm~lucasmreis](https://www.npmjs.com/~lucasmreis)

## Example of rank:
```javascript
import { regexName, match, rank } from 'name-finder'

const list = [
  'John Lennon',
  'Jose da Silva',
  'José Silveira',
  'José Sìlvéîrã'
]

const listSortByRank = rank('Jôse Sìlveira', list)
/*
listSortByRank = [
  "Jôse Sìlveira",
  "Jose Silveira",
  "José Sìlvéîrã",
  "Jose da Silva",
  "John Lennon"
]

Match chars:
[J][o]hn L[e]nnon
[J][o][s][e][ ]da [S][i][l][v][a]
*/
```

## Example of match:
```javascript
const listOfNameAndRanks = match('Jôse Sìlveira', list)
/*
listOfNameAndRanks = [
  { value: 'John Lennon',   rank: 0.291 },
  { value: 'Jose da Silva', rank: 0.723 },
  { value: 'José Sìlvéîrã', rank: 0.826 },
  { value: 'Jose Silveira', rank: 0.93 },
  { value: 'Jôse Sìlveira', rank: 1 }
]
*/
```

## Example of regexName:
```javascript
const pattern = regexName(what).pattern
/*
pattern = /(?:[^J]*([J]))?(?:[^oóòõôö]*([oóòõôö]))?(?:[^s]*([s]))?(?:[^eéèẽêë]*([eéèẽêë]))?(?:[^ ]*([ ]))?(?:[^S]*([S]))?(?:[^iíìĩîï]*([iíìĩîï]))?(?:[^l]*([l]))?(?:[^v]*([v]))?(?:[^eéèẽêë]*([eéèẽêë]))?(?:[^iíìĩîï]*([iíìĩîï]))?(?:[^r]*([r]))?(?:[^aáàãâä]*([aáàãâä]))?/i
*/
```
