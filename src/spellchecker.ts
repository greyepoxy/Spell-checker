import { getAllWordsOptionsWithReducedDuplicateLetters } from './getAllWordsOptionsWithReducedDuplicateLetters';
import { HashMap } from './hashMap';

export class Spellchecker {
  public static getInstance(words: ReadonlyArray<string>): Spellchecker {
    return new Spellchecker(words);
  }

  private caseInSensitiveHashMap: HashMap<string>;

  private constructor(words: ReadonlyArray<string>) {
    this.caseInSensitiveHashMap = HashMap.fromArray(words, word =>
      word.toLowerCase()
    );
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
    const matchingWords = this.caseInSensitiveHashMap.getBinForHashOfValue(
      wordToCheck
    );

    if (matchingWords.length === 0) {
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
