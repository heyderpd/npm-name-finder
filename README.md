# name-finder
name finder with regex and rank of similarity

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
listSortByRank =
*/
```

## Example of match:
```javascript
const listOfNameAndRanks = match('Jôse Sìlveira', list)
/*
listOfNameAndRanks =
*/
```

## Example of regexName:
```javascript
const pattern = regexName(what)
/*
pattern =
*/
```
