export function createSequence(count: number): number[] {
  const array = [];
  for (let i = 0; i < count; i++) {
    array.push(i);
  }
  return array;
}

export function concatArrays<T>(array1: T[], array2: T[]): T[] {
  return array1.concat(array2);
}

export function spliceString(
  stringToSplice: string,
  startIndex: number,
  deleteCount: number
): string {
  const charactersInFrontOfStartIndex = stringToSplice.slice(0, startIndex);
  const charactersAfterDeletedCharacters = stringToSplice.slice(
    startIndex + deleteCount
  );

  return charactersInFrontOfStartIndex + charactersAfterDeletedCharacters;
}
