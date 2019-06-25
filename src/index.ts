import * as fs from 'fs';
import * as readline from 'readline';
export { Spellchecker } from './spellchecker';

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
