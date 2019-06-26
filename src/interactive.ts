import * as path from 'path';
import * as readline from 'readline';
import { readWordsFromFile, Spellchecker } from '../src/index';

function foreverAskToSpellcheckAWord(
  rl: readline.Interface,
  spellchecker: Spellchecker
) {
  rl.question('What word would you like spellchecked? > ', answer => {
    const result = spellchecker.checkWord(answer);
    // tslint:disable-next-line: no-console
    console.log(result);

    foreverAskToSpellcheckAWord(rl, spellchecker);
  });
}

async function run() {
  const spellchecker: Spellchecker = Spellchecker.getInstance(
    await readWordsFromFile(path.join(__dirname, '../resources/words'))
  );

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  foreverAskToSpellcheckAWord(rl, spellchecker);
}

run();
