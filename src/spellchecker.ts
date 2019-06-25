import { findWordOptionsWithLessDuplicateLetters } from './findWordOptionsWithLessDuplicateLetters';
import { mergeObjectsWithIndexedProperties } from './languageExtensions';

interface IWords {
  [lowerCaseWord: string]: string | undefined;
}

export class Spellchecker {
  public static getInstance(words: ReadonlyArray<string>): Spellchecker {
    return new Spellchecker(words);
  }

  private words: IWords;

  private constructor(words: ReadonlyArray<string>) {
    this.words = words
      .map(word => ({ [word.toLowerCase()]: word }))
      .reduce(mergeObjectsWithIndexedProperties, {} as IWords);
  }

  public checkWord(wordToCheck: string): string {
    const lowerCaseWordToCheck = wordToCheck.toLowerCase();

    const wordsToCheck = findWordOptionsWithLessDuplicateLetters(
      lowerCaseWordToCheck
    );

    for (const word of wordsToCheck) {
      const matchingWord = this.tryGetMatchingWord(word);
      if (matchingWord !== null) {
        return matchingWord;
      }
    }

    return 'No Correction Found';
  }

  private tryGetMatchingWord(word: string): string | null {
    const maybeWordInDictionary = this.words[word];

    return maybeWordInDictionary !== undefined ? maybeWordInDictionary : null;
  }
}
