export function createSequence(count: number): number[] {
  const array = [];
  for (let i = 0; i < count; i++) {
    array.push(i);
  }
  return array;
}
