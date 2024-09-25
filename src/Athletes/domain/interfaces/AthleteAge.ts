import { NumberValueObject } from "../../../shared/domain/value-objects/NumberValueObject";

export class AthleteAge extends NumberValueObject {
  constructor(value: number) {
    super(value);
  }
}
