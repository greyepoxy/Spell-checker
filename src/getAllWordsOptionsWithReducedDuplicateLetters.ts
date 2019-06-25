import {
  concatArrays,
  createSequence,
  spliceString,
} from './languageExtensions';

export function getAllWordsOptionsWithReducedDuplicateLetters(
  lowerCaseWordToCheck: string,
  indexToStartAt: number = 0
): string[] {
  const wordOptionsToCheck = [lowerCaseWordToCheck];

  // tslint:disable-next-line: prefer-for-of
  for (
    let indexOfFirstDuplicateLetter = indexToStartAt;
    indexOfFirstDuplicateLetter < lowerCaseWordToCheck.length - 1;
    indexOfFirstDuplicateLetter++
  ) {
    const indexOfLastDuplicateLetter = currentIndexOrLastIndexOfMatchingLetters(
      lowerCaseWordToCheck,
      indexOfFirstDuplicateLetter
    );

    if (indexOfFirstDuplicateLetter === indexOfLastDuplicateLetter) {
      continue;
    }

    const countOfDuplicateLetters =
      indexOfLastDuplicateLetter - indexOfFirstDuplicateLetter + 1;

    const additionalWordOptions = getAdditionalWordOptionsWithLessDuplicateLettersToCheck(
      lowerCaseWordToCheck,
      indexOfFirstDuplicateLetter,
      countOfDuplicateLetters
    );

    wordOptionsToCheck.push(...additionalWordOptions);
  }

  return wordOptionsToCheck;
}

function getAdditionalWordOptionsWithLessDuplicateLettersToCheck(
  originalWord: string,
  indexOfFirstDuplicateLetter: number,
  originalCountOfDuplicateLetters: number
): string[] {
  return createSequence(originalCountOfDuplicateLetters - 1)
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
      return getAllWordsOptionsWithReducedDuplicateLetters(
        newWordOption,
        newFirstIndexAfterDuplicateLetters
      );
    })
    .reduce(concatArrays, []);
}

function currentIndexOrLastIndexOfMatchingLetters(
  wordToCheck: string,
  currentIndex: number
): number {
  const nextIndex = currentIndex + 1;
  if (
    nextIndex < wordToCheck.length &&
    wordToCheck[currentIndex] === wordToCheck[nextIndex]
  ) {
    return currentIndexOrLastIndexOfMatchingLetters(wordToCheck, nextIndex);
  }

  return currentIndex;
}
