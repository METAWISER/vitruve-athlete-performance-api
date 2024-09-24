import { StringValueObject } from "../../shared/domain/value-objects/StringValueObject";

export class AthleteName extends StringValueObject {
  constructor(value: string) {
    if (value.length < 2) {
      throw new Error("Athletename must be at least 2 characters long.");
    }
    super(value);
  }
}