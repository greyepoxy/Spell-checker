## Spell-checker

This project is an attempt at the [Ripl Spell-checker homework](https://github.com/RiplApp/spellchecker-homework).

### Usage

Install a recent version of Node https://nodejs.org/en/ (developed against v11.10.0 although older versions should work as well).

Import into an existing node application using a local file reference [npm local paths documents](https://docs.npmjs.com/files/package.json#local-paths)

Then this package can be used as follows

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

### Limitations

#### Matching against multiple words with different casing

When there are multiple words with just casing differences in the dictionary then the matching is a little arbitrary. Will match correctly if in the dictionary the word exists with the exact casing but if there is a slight casing mistake then will always prefer matching against the last version of the word loaded into the dictionary. Likely the desired behavior would be to match against the word with the fewest required casing transformations to be an exact match.

### How to build from source

From this project directory

`npm run build`

This will install the required dependencies, build and lint the source TypeScript, and then run the tests.
