export abstract class BooleanValueObject {
  constructor(readonly value: boolean) {}
  toString(): string {
    return this.value.toString();
  }
}
