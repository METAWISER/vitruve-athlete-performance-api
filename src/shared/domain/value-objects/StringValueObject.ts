export abstract class StringValueObject {
  constructor(readonly value: string) {
    this.value = value.toLocaleLowerCase();
  }
  toString(): string {
    return this.value;
  }
}
