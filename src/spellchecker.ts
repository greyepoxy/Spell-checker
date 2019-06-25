import { getAllWordsOptionsWithReducedDuplicateLetters } from './getAllWordsOptionsWithReducedDuplicateLetters';

interface IWords {
  [key: string]: string[] | undefined;
}

export class Spellchecker {
  public static getInstance(words: ReadonlyArray<string>): Spellchecker {
    return new Spellchecker(words);
  }

  private caseInSensitiveWordMap: IWords = {};

  private constructor(words: ReadonlyArray<string>) {
    for (const currentWord of words) {
      const lowerCaseCurrentWord = currentWord.toLowerCase();
      const maybeExistingWords = this.caseInSensitiveWordMap[
        lowerCaseCurrentWord
      ];

      const existingWordsList =
        // check if it is an array because for words like 'constructor'
        // the default object prototype function is returned
        maybeExistingWords === undefined || !Array.isArray(maybeExistingWords)
          ? []
          : maybeExistingWords;

      const wordsToSet = existingWordsList.concat(currentWord);

      this.caseInSensitiveWordMap[lowerCaseCurrentWord] = wordsToSet;
    }
  }

  public checkWord(wordToCheck: string): string {
    const wordsToCheck = getAllWordsOptionsWithReducedDuplicateLetters(
      wordToCheck
    );

    for (const word of wordsToCheck) {
      const matchingWord = this.tryGetMatchingWord(word);
      if (matchingWord !== null) {
        return matchingWord;
      }
    }

    return 'No Correction Found';
  }

  private tryGetMatchingWord(wordToCheck: string): string | null {
    const matchingWords = this.caseInSensitiveWordMap[
      wordToCheck.toLowerCase()
    ];

    if (matchingWords === undefined) {
      return null;
    }

    const matchingWordsWithCountOfCasingDifferences = matchingWords.map(
      matchingWord => {
        const countOfCasingDifferences = getCountOfCharacterDifferencesBetweenWords(
          wordToCheck,
          matchingWord
        );

        return {
          countOfCasingDifferences,
          word: matchingWord,
        };
      }
    );

    return getWordWithMinimumCasingDifferences(
      matchingWordsWithCountOfCasingDifferences
    );
  }
}

function getWordWithMinimumCasingDifferences(
  matchingWordsWithCountOfCasingDifferences: Array<{
    countOfCasingDifferences: number;
    word: string;
  }>
): string {
  const matchingWordWithMinimumCasingDifferences = matchingWordsWithCountOfCasingDifferences.reduce(
    (previous, current) => {
      return current.countOfCasingDifferences <
        previous.countOfCasingDifferences
        ? current
        : previous;
    },
    matchingWordsWithCountOfCasingDifferences.splice(0, 1)[0]
  );

  return matchingWordWithMinimumCasingDifferences.word;
}

function getCountOfCharacterDifferencesBetweenWords(
  word1: string,
  word2: string
): number {
  let countOfDifferences = 0;
  for (let i = 0; i < word1.length; i++) {
    if (word1[i] !== word2[i]) {
      countOfDifferences++;
    }
  }

  return countOfDifferences;
}
