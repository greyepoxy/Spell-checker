export function createSequence(count: number): number[] {
  const array = [];
  for (let i = 0; i < count; i++) {
    array.push(i);
  }
  return array;
}

export interface IObjectWithIndexedProperties {
  [key: string]: string | undefined;
}

export function mergeObjectsWithIndexedProperties<
  T extends IObjectWithIndexedProperties
>(object1: T, object2: T): T {
  return Object.assign(object1, object2);
}

export function concatArrays<T>(array1: T[], array2: T[]): T[] {
  return array1.concat(array2);
}
