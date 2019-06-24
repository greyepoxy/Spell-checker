import test from 'ava';
import { checkWord } from '../src/index';

test('should report no correction for un-recognized words', t => {
  t.deepEqual(checkWord('england', []), 'No Correction Found');
});

test('should return original word if matching word found', t => {
  t.deepEqual(checkWord('table', ['table']), 'table');
});

test('should return matching word with fixed casing', t => {
  t.deepEqual(checkWord('england', ['England']), 'England');
  t.deepEqual(checkWord('enGLaNd', ['England']), 'England');
});
