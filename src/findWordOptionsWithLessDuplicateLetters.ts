import { concatArrays, createSequence } from './languageExtensions';

export function findWordOptionsWithLessDuplicateLetters(
  lowerCaseWordToCheck: string,
  indexToStartAt: number = 0
): string[] {
  const wordOptionsToCheck = [lowerCaseWordToCheck];

  // tslint:disable-next-line: prefer-for-of
  for (
    let currentIndex = indexToStartAt;
    currentIndex < lowerCaseWordToCheck.length - 1;
    currentIndex++
  ) {
    const indexOfLastDuplicateLetter = currentIndexOrLastIndexOfMatchingLetters(
      lowerCaseWordToCheck,
      currentIndex
    );

    if (currentIndex === indexOfLastDuplicateLetter) {
      continue;
    }

    const numberOfDuplicateLetters =
      indexOfLastDuplicateLetter - currentIndex + 1;

    const additionalWordOptions = createSequence(numberOfDuplicateLetters - 1)
      .map(indexDifference => {
        const newIndexOfLastDuplicateLetter =
          indexOfLastDuplicateLetter - indexDifference;
        const charactersInFrontOfDuplicateLetters = lowerCaseWordToCheck.slice(
          0,
          currentIndex
        );
        const charactersAfterDuplicateLetters = lowerCaseWordToCheck.slice(
          newIndexOfLastDuplicateLetter,
          lowerCaseWordToCheck.length
        );

        const newNumberOfDuplicateCharacters = indexDifference + 1;

        return {
          newFirstIndexAfterDuplicateLetters:
            currentIndex + newNumberOfDuplicateCharacters,
          newWordOption:
            charactersInFrontOfDuplicateLetters +
            charactersAfterDuplicateLetters,
        };
      })
      .map(
        ({
          newWordOption,
          newFirstIndexAfterDuplicateLetters: firstIndexAfterDuplicateLetters,
        }) => {
          return findWordOptionsWithLessDuplicateLetters(
            newWordOption,
            firstIndexAfterDuplicateLetters
          );
        }
      )
      .reduce(concatArrays, []);

    wordOptionsToCheck.push(...additionalWordOptions);
  }

  return wordOptionsToCheck;
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
