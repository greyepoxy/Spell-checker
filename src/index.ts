import { Dictionary } from './dictionary';

export function checkWord(
  wordToCheck: string,
  wordsToCheckAgainst: ReadonlyArray<string>
): string {
  const dictionary = Dictionary.getInstance(wordsToCheckAgainst);

  if (dictionary.isWordPresent(wordToCheck)) {
    return wordToCheck;
  }

  return 'No Correction Found';
}
