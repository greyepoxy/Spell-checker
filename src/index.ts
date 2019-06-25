import * as fs from 'fs';
import * as readline from 'readline';
import { Dictionary } from './dictionary';
import { findWordOptionsWithLessDuplicateLetters } from './findWordOptionsWithLessDuplicateLetters';

export function checkWord(
  wordToCheck: string,
  wordsToCheckAgainst: ReadonlyArray<string>
): string {
  const dictionary = Dictionary.getInstance(wordsToCheckAgainst);

  const lowerCaseWordToCheck = wordToCheck.toLowerCase();

  const wordsToCheck = findWordOptionsWithLessDuplicateLetters(
    lowerCaseWordToCheck
  );

  for (const word of wordsToCheck) {
    const matchingWord = dictionary.tryGetMatchingWord(word);
    if (matchingWord !== null) {
      return matchingWord;
    }
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
