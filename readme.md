## Spell-checker

This project is an attempt at the [Ripl Spell-checker homework](https://github.com/RiplApp/spellchecker-homework).

### Usage

Install a recent version of Node https://nodejs.org/en/ (developed against v11.10.0 although older versions should work as well).

Import into an existing node application using a local file reference [npm local paths documents](https://docs.npmjs.com/files/package.json#local-paths)

Then this package can be used

```ts
import {readWordsFromFile, Spellchecker} from 'spellchecker';

const words = await readWordsFromFile('path/to/words/file');
const spellchecker = Spellchecker.getInstance(words);

const correctedWord = spellchecker.checkWord('wordToCheck');
```

Check out [the examples](./test/examples.ts) file for more usage examples

### Implementation Assumptions

1. Only works for English words
1. Better performance could be achieved if needed
1. This is needed on a server or in a desktop application (won't work in the browser as written)

### How to build from source

From this project directory

`npm run build`

This will install the required dependencies, build and lint the source TypeScript, and then run the tests.
