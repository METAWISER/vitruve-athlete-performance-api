import { NumberValueObject } from "../../shared/domain/value-objects/NumberValueObject";

export class AthleteAge extends NumberValueObject {
  constructor(value: number) {
    if (value < 15) {
      throw new Error("Age must be greater than 15.");
    }
    super(value);
  }
}
