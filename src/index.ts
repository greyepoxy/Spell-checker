import * as fs from 'fs';
import * as readline from 'readline';
import { Dictionary } from './dictionary';

export function checkWord(
  wordToCheck: string,
  wordsToCheckAgainst: ReadonlyArray<string>
): string {
  const dictionary = Dictionary.getInstance(wordsToCheckAgainst);

  if (dictionary.isWordPresent(wordToCheck)) {
    return wordToCheck;
  }

  return 'No Correction Found';
}

export async function readWordsFromFile(
  absolutePathToWordsFile: string
): Promise<ReadonlyArray<string>> {
  const fileReadlineStream = readline.createInterface({
    crlfDelay: Infinity,
    input: fs.createReadStream(absolutePathToWordsFile),
  });

  return new Promise(resolve => {
    const words: string[] = [];
    fileReadlineStream.on('line', line => {
      words.push(line);
    });

    fileReadlineStream.once('close', () => {
      resolve(words);
    });
  });
}
