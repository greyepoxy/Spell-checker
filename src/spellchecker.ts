import { getAllWordsOptionsWithReducedDuplicateLetters } from './getAllWordsOptionsWithReducedDuplicateLetters';

interface IWords {
  [key: string]: string | undefined;
}

export class Spellchecker {
  public static getInstance(words: ReadonlyArray<string>): Spellchecker {
    return new Spellchecker(words);
  }

  private caseInSensitiveWordMap: IWords;
  private caseSensitiveWordMap: IWords;

  private constructor(words: ReadonlyArray<string>) {
    const wordMaps = words.reduce(
      (previous, current) => {
        return {
          caseInSensitiveWordMap: Object.assign(
            previous.caseInSensitiveWordMap,
            {
              [current.toLowerCase()]: current,
            }
          ),
          caseSensitiveWordMap: Object.assign(previous.caseSensitiveWordMap, {
            [current]: '',
          }),
        };
      },
      {
        caseInSensitiveWordMap: {} as IWords,
        caseSensitiveWordMap: {} as IWords,
      }
    );

    this.caseInSensitiveWordMap = wordMaps.caseInSensitiveWordMap;
    this.caseSensitiveWordMap = wordMaps.caseSensitiveWordMap;
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
    const maybeWordInCaseSensitiveWordMap = this.caseSensitiveWordMap[
      wordToCheck
    ];

    if (maybeWordInCaseSensitiveWordMap !== undefined) {
      return wordToCheck;
    }

    const maybeWordInCaseInSensitiveWordMap = this.caseInSensitiveWordMap[
      wordToCheck.toLowerCase()
    ];

    if (maybeWordInCaseInSensitiveWordMap !== undefined) {
      return maybeWordInCaseInSensitiveWordMap;
    }

    return null;
  }
}
