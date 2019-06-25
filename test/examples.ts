import test from 'ava';
import * as path from 'path';
import { readWordsFromFile, Spellchecker } from '../src/index';

let spellchecker: Spellchecker;

test.before(async () => {
  spellchecker = Spellchecker.getInstance(
    await readWordsFromFile(path.join(__dirname, '../resources/words'))
  );
});

test('exact matches return the original word', t => {
  t.deepEqual(spellchecker.checkWord('engender'), 'engender');
  t.deepEqual(spellchecker.checkWord('table'), 'table');
  t.deepEqual(spellchecker.checkWord('Englander'), 'Englander');
  t.deepEqual(spellchecker.checkWord('Parnassus'), 'Parnassus');
});

test('if no match for incoming word returns “No Correction Found”', t => {
  t.deepEqual(spellchecker.checkWord('England'), 'No Correction Found');
  t.deepEqual(spellchecker.checkWord('asdfasdfasdf'), 'No Correction Found');
});

test('fixes bad casing in original word', t => {
  t.deepEqual(spellchecker.checkWord('paRNAssus'), 'Parnassus');
  t.deepEqual(spellchecker.checkWord('vishnuvite'), 'Vishnuvite');
  t.deepEqual(spellchecker.checkWord('MiSter'), 'mister');
});

test('removes repeating characters', t => {
  t.deepEqual(spellchecker.checkWord('tabble'), 'table');
  t.deepEqual(spellchecker.checkWord('rrreally'), 'really');
  t.deepEqual(spellchecker.checkWord('miiiisttter'), 'mister');
});

test('removes repeating characters and fixes casing simultaneously', t => {
  t.deepEqual(spellchecker.checkWord('paRNAsssus'), 'Parnassus');
  t.deepEqual(spellchecker.checkWord('rrreAlly'), 'really');
  t.deepEqual(spellchecker.checkWord('MiiiIstTter'), 'mister');
});
