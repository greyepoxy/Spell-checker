import {
  concatArrays,
  createSequence,
  spliceString,
} from './languageExtensions';

export function findWordOptionsWithLessDuplicateLetters(
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

    const numberOfDuplicateLetters =
      indexOfLastDuplicateLetter - indexOfFirstDuplicateLetter + 1;

    const additionalWordOptions = getAdditionalWordOptionsToCheck(
      lowerCaseWordToCheck,
      indexOfFirstDuplicateLetter,
      numberOfDuplicateLetters
    );

    wordOptionsToCheck.push(...additionalWordOptions);
  }

  return wordOptionsToCheck;
}

function getAdditionalWordOptionsToCheck(
  lowerCaseWordToCheck: string,
  indexOfFirstDuplicateLetter: number,
  numberOfDuplicateLetters: number
): string[] {
  return createSequence(numberOfDuplicateLetters - 1)
    .map(count => count + 1)
    .map(newNumberOfDuplicateCharacters => {
      const numberOfCharactersToDelete =
        numberOfDuplicateLetters - newNumberOfDuplicateCharacters;
      const newWordOption = spliceString(
        lowerCaseWordToCheck,
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
      return findWordOptionsWithLessDuplicateLetters(
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
