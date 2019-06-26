export type HashFunction<T> = (value: T) => string;

export class HashMap<T> {
  public static fromArray<T>(
    values: ReadonlyArray<T>,
    hashFunction: HashFunction<T>
  ): HashMap<T> {
    return new HashMap(values, hashFunction);
  }

  private map: { [key: string]: T[] | undefined } = {};
  private hashFunction: HashFunction<T>;

  private constructor(values: ReadonlyArray<T>, hashFunction: HashFunction<T>) {
    this.hashFunction = hashFunction;

    for (const currentValue of values) {
      const hashOfCurrentValue = this.hashFunction(currentValue);
      const maybeExistingBin = this.map[hashOfCurrentValue];

      const currentBin =
        // check if it is an array because for hash values like 'constructor'
        // the default object prototype function is returned
        maybeExistingBin === undefined || !Array.isArray(maybeExistingBin)
          ? []
          : maybeExistingBin;

      const updatedBin = currentBin.concat(currentValue);

      this.map[hashOfCurrentValue] = updatedBin;
    }
  }

  public getBinForHashOfValue(value: T): T[] {
    const maybeBin = this.map[this.hashFunction(value)];

    return maybeBin !== undefined ? maybeBin : [];
  }
}
