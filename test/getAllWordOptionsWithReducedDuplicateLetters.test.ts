import test, { ExecutionContext } from 'ava';
import { getAllWordOptionsWithReducedDuplicateLetters } from '../src/getAllWordOptionsWithReducedDuplicateLetters';

function assertItemOrderingIsTheSame<T>(
  actual: T[],
  expected: T[],
  t: ExecutionContext<{}>
): void {
  const getErrorMessage = () =>
    `expected elements in [${actual}] to equal and match the ordering of the elements in [${expected}]`;

  t.deepEqual(actual, expected, getErrorMessage());

  for (let i = 0; i < expected.length; i++) {
    const actualValue = actual[i];
    const expectedValue = expected[i];

    t.deepEqual(actualValue, expectedValue, getErrorMessage());
  }
}

test('should return original word if no duplicate letters', t => {
  const wordOptions = getAllWordOptionsWithReducedDuplicateLetters('blah');

  t.deepEqual(wordOptions, ['blah']);
});

test('should return two words if one duplicate letters', t => {
  const wordOptions = getAllWordOptionsWithReducedDuplicateLetters('bllah');

  assertItemOrderingIsTheSame(wordOptions, ['bllah', 'blah'], t);
});

test('should return four words if one letter is duplicated four times', t => {
  const wordOptions = getAllWordOptionsWithReducedDuplicateLetters('bllllah');

  assertItemOrderingIsTheSame(
    wordOptions,
    ['bllllah', 'blllah', 'bllah', 'blah'],
    t
  );
});

test('should return combinatorial words if multiple letter are duplicated', t => {
  assertItemOrderingIsTheSame(
    getAllWordOptionsWithReducedDuplicateLetters('bllllaah'),
    [
      'bllllaah',
      'bllllah',
      'blllaah',
      'blllah',
      'bllaah',
      'bllah',
      'blaah',
      'blah',
    ],
    t
  );

  assertItemOrderingIsTheSame(
    getAllWordOptionsWithReducedDuplicateLetters('vveerrryy'),
    [
      'vveerrryy',
      'vveerrry',
      'vveerryy',
      'vveerry',
      'vveeryy',
      'vveery',
      'vverrryy',
      'vverrry',
      'vverryy',
      'vverry',
      'vveryy',
      'vvery',
      'veerrryy',
      'veerrry',
      'veerryy',
      'veerry',
      'veeryy',
      'veery',
      'verrryy',
      'verrry',
      'verryy',
      'verry',
      'veryy',
      'very',
    ],
    t
  );
});
