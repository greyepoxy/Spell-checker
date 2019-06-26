## Spell-checker

This project is an attempt at the [Ripl Spell-checker homework](https://github.com/RiplApp/spellchecker-homework).

### Usage

Install a recent version of Node https://nodejs.org/en/ (developed against v11.10.0 although older versions should work as well).

Import into an existing node application using a local file reference ([npm docs](https://docs.npmjs.com/files/package.json#local-paths) / [yarn docs](https://yarnpkg.com/lang/en/docs/cli/add/))

Then this package can be used as follows

```ts
import {readWordsFromFile, Spellchecker} from 'spellchecker';

const words = await readWordsFromFile('path/to/words/file');
const spellchecker = Spellchecker.getInstance(words);

const correctedWord = spellchecker.checkWord('wordToCheck');
```

Check out [the examples](./test/examples.ts) file for more usage examples

### Implementation Assumptions / Limitations

1. Only works for English words
1. Better performance could be achieved if needed
1. As currently implemented it does not work in the browser

### How to build from source and run the tests

From this project directory

`npm run build`

This will install the required dependencies, build and lint the source TypeScript, and then run the tests.

Other sub-tasks are available in the [package.json](./package.json) `scripts` section.
