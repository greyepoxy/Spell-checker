import { concatArrays, createSequence } from './languageExtensions';

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

    const additionalWordOptions = createSequence(numberOfDuplicateLetters - 1)
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

    wordOptionsToCheck.push(...additionalWordOptions);
  }

  return wordOptionsToCheck;
}

function spliceString(
  stringToSplice: string,
  startIndex: number,
  deleteCount: number
): string {
  const charactersInFrontOfStartIndex = stringToSplice.slice(0, startIndex);
  const charactersAfterDeletedCharacters = stringToSplice.slice(
    startIndex + deleteCount
  );

  return charactersInFrontOfStartIndex + charactersAfterDeletedCharacters;
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
