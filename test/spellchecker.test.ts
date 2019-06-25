import test from 'ava';
import { Spellchecker } from '../src/index';

test('should report no correction for un-recognized words', t => {
  t.deepEqual(
    Spellchecker.getInstance([]).checkWord('england'),
    'No Correction Found'
  );
});

test('should report no correction for empty string', t => {
  t.deepEqual(
    Spellchecker.getInstance([]).checkWord(''),
    'No Correction Found'
  );
});

test('should return original word if matching word found', t => {
  t.deepEqual(
    Spellchecker.getInstance(['table', 'document']).checkWord('table'),
    'table'
  );
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

test('should return original word (and casing) if multiple match options that only differ in casing', t => {
  t.deepEqual(Spellchecker.getInstance(['A', 'a']).checkWord('a'), 'a');
  t.deepEqual(Spellchecker.getInstance(['A', 'a']).checkWord('A'), 'A');
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

test('should still return original word if it has duplicate letters even if there is a reduced letter option', t => {
  t.deepEqual(
    Spellchecker.getInstance(['abbotship']).checkWord('abbotship'),
    'abbotship'
  );

  t.deepEqual(Spellchecker.getInstance(['a', 'aa']).checkWord('aa'), 'aa');
});

test('should return the closest option to the original word if duplicate letters', t => {
  t.deepEqual(Spellchecker.getInstance(['a', 'aa']).checkWord('aaa'), 'aa');
});
