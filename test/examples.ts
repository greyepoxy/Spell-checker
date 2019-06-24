import test from 'ava';
import * as path from 'path';
import { checkWord, readWordsFromFile } from '../src/index';

let words: ReadonlyArray<string>;

test.before(async () => {
  words = await readWordsFromFile(path.join(__dirname, '../resources/words'));
});

test('some lower case words that match', t => {
  t.deepEqual(checkWord('engender', words), 'engender');
  t.deepEqual(checkWord('table', words), 'table');
});
