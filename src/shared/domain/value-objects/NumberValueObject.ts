export abstract class NumberValueObject {
  constructor(readonly value: number) {}
  toString(): string {
    return this.value.toString();
  }
}
