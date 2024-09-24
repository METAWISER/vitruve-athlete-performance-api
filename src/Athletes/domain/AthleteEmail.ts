import { StringValueObject } from "../../shared/domain/value-objects/StringValueObject";

export class AthleteEmail implements StringValueObject {
  constructor(readonly value: string) {
    this.ensureIsValidEmail(value);
  }

  private ensureIsValidEmail(value: string): void {
    if (!/^\S+@\S+\.\S+$/.test(value)) {
      throw new Error(`Email ${value} is invalid`);
    }
  }

  toString(): string {
    return this.value.toLowerCase();
  }
}