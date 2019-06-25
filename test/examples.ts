import test from 'ava';
import * as path from 'path';
import { readWordsFromFile, Spellchecker } from '../src/index';

let spellchecker: Spellchecker;

test.before(async () => {
  spellchecker = Spellchecker.getInstance(
    await readWordsFromFile(path.join(__dirname, '../resources/words'))
  );
});

test('some lower case words that match', t => {
  t.deepEqual(spellchecker.checkWord('engender'), 'engender');
  t.deepEqual(spellchecker.checkWord('table'), 'table');
});
