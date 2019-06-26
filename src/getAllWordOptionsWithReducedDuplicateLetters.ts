import {
  concatArrays,
  createSequence,
  spliceString,
} from './languageExtensions';

export function getAllWordOptionsWithReducedDuplicateLetters(
  wordToCheck: string,
  indexToStartAt: number = 0
): string[] {
  const wordOptionsToCheck = [wordToCheck];

  const duplicateLetterStartAndEndIndex = findNextDuplicateLetters(
    wordToCheck,
    indexToStartAt
  );

  if (duplicateLetterStartAndEndIndex === null) {
    return wordOptionsToCheck;
  }

  const [
    indexOfFirstDuplicateLetter,
    indexOfLastDuplicateLetter,
  ] = duplicateLetterStartAndEndIndex;

  const countOfDuplicateLetters =
    indexOfLastDuplicateLetter - indexOfFirstDuplicateLetter + 1;

  const additionalWordOptions = getAdditionalWordOptionsWithLessDuplicateLettersToCheck(
    wordToCheck,
    indexOfFirstDuplicateLetter,
    countOfDuplicateLetters
  );

  wordOptionsToCheck.push(...additionalWordOptions);

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
