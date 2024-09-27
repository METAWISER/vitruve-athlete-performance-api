import { StringValueObject } from "../../../shared/domain/value-objects/StringValueObject";

export class AthletePassword extends StringValueObject {
  constructor(value: string) {
    super(value);
  }
}