interface IWords {
  [lowerCaseWord: string]: string | undefined;
}

export class Dictionary {
  public static getInstance(words: ReadonlyArray<string>): Dictionary {
    return new Dictionary(words);
  }

  private words: IWords;

  private constructor(words: ReadonlyArray<string>) {
    this.words = words
      .map(word => ({ [word.toLowerCase()]: word }))
      .reduce(
        (previousValue, currentValue) => {
          return Object.assign(previousValue, currentValue);
        },
        {} as IWords
      );
  }

  public tryGetMatchingWord(word: string): string | null {
    const maybeWordInDictionary = this.words[word];

    return maybeWordInDictionary !== undefined ? maybeWordInDictionary : null;
  }
}
