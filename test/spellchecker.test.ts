import test from 'ava';
import { checkWord } from '../src/index';

test('should report no correction for un-recognized words', t => {
  t.deepEqual(checkWord('england'), 'No Correction Found');
});
