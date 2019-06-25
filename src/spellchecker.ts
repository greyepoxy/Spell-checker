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

    const matchingWordsAndNumberOfCasingDifferences = matchingWords.map(
      matchingWord => {
        let numberOfCasingDifferences = 0;
        for (let i = 0; i < wordToCheck.length; i++) {
          if (wordToCheck[i] !== matchingWord[i]) {
            numberOfCasingDifferences++;
          }
        }

        return { matchingWord, numberOfCasingDifferences };
      }
    );

    const matchingWordWithMinimumCasingDifferences = matchingWordsAndNumberOfCasingDifferences.reduce(
      (previous, current) => {
        return current.numberOfCasingDifferences <
          previous.numberOfCasingDifferences
          ? current
          : previous;
      },
      matchingWordsAndNumberOfCasingDifferences.splice(0, 1)[0]
    );

    return matchingWordWithMinimumCasingDifferences.matchingWord;
  }
}
