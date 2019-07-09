import {
  concatArrays,
  createSequence,
  spliceString,
} from './languageExtensions';

export function getAllWordOptionsWithReducedDuplicateLetters(
  wordToCheck: string,
  indexToStartAt: number = 0
): string[] {
  const duplicateLetterStartAndEndIndex = findNextDuplicateLetters(
    wordToCheck,
    indexToStartAt
  );

  if (duplicateLetterStartAndEndIndex === null) {
    return [wordToCheck];
  }

  const [
    indexOfFirstDuplicateLetter,
    indexOfLastDuplicateLetter,
  ] = duplicateLetterStartAndEndIndex;

  const countOfDuplicateLetters =
    indexOfLastDuplicateLetter - indexOfFirstDuplicateLetter + 1;

  return getAdditionalWordOptionsWithLessDuplicateLettersToCheck(
    wordToCheck,
    indexOfFirstDuplicateLetter,
    countOfDuplicateLetters
  );
}

function getAdditionalWordOptionsWithLessDuplicateLettersToCheck(
  originalWord: string,
  indexOfFirstDuplicateLetter: number,
  originalCountOfDuplicateLetters: number
): string[] {
  return createSequence(originalCountOfDuplicateLetters)
    .map(count => count + 1)
    .reverse()
    .map(newNumberOfDuplicateCharacters => {
      const numberOfCharactersToDelete =
        originalCountOfDuplicateLetters - newNumberOfDuplicateCharacters;
      const newWordOption = spliceString(
        originalWord,
        indexOfFirstDuplicateLetter,
        numberOfCharactersToDelete
      );
      const newFirstIndexAfterDuplicateLetters =
        indexOfFirstDuplicateLetter + newNumberOfDuplicateCharacters;

      return {
        newFirstIndexAfterDuplicateLetters,
        newWordOption,
      };
    })
    .map(({ newWordOption, newFirstIndexAfterDuplicateLetters }) => {
      return getAllWordOptionsWithReducedDuplicateLetters(
        newWordOption,
        newFirstIndexAfterDuplicateLetters
      );
    })
    .reduce(concatArrays, []);
}

function findNextDuplicateLetters(
  word: string,
  indexToStartAt: number
): [number, number] | null {
  for (
    let indexOfFirstDuplicateLetter = indexToStartAt;
    indexOfFirstDuplicateLetter < word.length - 1;
    indexOfFirstDuplicateLetter++
  ) {
    const indexOfLastDuplicateLetter = currentIndexOrLastIndexOfMatchingLetters(
      word,
      indexOfFirstDuplicateLetter
    );

    if (indexOfFirstDuplicateLetter === indexOfLastDuplicateLetter) {
      continue;
    }

    return [indexOfFirstDuplicateLetter, indexOfLastDuplicateLetter];
  }

  return null;
}

function currentIndexOrLastIndexOfMatchingLetters(
  wordToCheck: string,
  currentIndex: number
): number {
  const nextIndex = currentIndex + 1;
  if (
    nextIndex < wordToCheck.length &&
    lettersMatch(wordToCheck[currentIndex], wordToCheck[nextIndex])
  ) {
    return currentIndexOrLastIndexOfMatchingLetters(wordToCheck, nextIndex);
  }

  return currentIndex;
}

function lettersMatch(firstLetter: string, secondLetter: string): boolean {
  return firstLetter.toLowerCase() === secondLetter.toLowerCase();
}
