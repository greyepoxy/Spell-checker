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

export function mergeObjectWithIndexedProperties<
  T extends IObjectWithIndexedProperties
>(object1: T, object2: T) {
  return Object.assign(object1, object2);
}
