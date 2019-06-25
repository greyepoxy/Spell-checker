import test from 'ava';
import { Spellchecker } from '../src/index';

test('should report no correction for un-recognized words', t => {
  t.deepEqual(
    Spellchecker.getInstance([]).checkWord('england'),
    'No Correction Found'
  );
});

test('should return original word if matching word found', t => {
  t.deepEqual(Spellchecker.getInstance(['table']).checkWord('table'), 'table');
});

test('should return matching word with fixed casing', t => {
  t.deepEqual(
    Spellchecker.getInstance(['England']).checkWord('england'),
    'England'
  );
  t.deepEqual(
    Spellchecker.getInstance(['England']).checkWord('enGLaNd'),
    'England'
  );
});

test('should return matching word if only one letter is duplicated', t => {
  t.deepEqual(
    Spellchecker.getInstance(['England']).checkWord('Enggland'),
    'England'
  );
  t.deepEqual(
    Spellchecker.getInstance(['England']).checkWord('Enggggggland'),
    'England'
  );
});

test('should return matching word if multiple letters are duplicated', t => {
  t.deepEqual(
    Spellchecker.getInstance(['England']).checkWord('Engglaaand'),
    'England'
  );
  t.deepEqual(
    Spellchecker.getInstance(['England']).checkWord('Eeennnggllllaaannnddd'),
    'England'
  );
});
