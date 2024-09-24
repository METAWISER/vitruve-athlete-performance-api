import { StringValueObject } from "../../../shared/domain/value-objects/StringValueObject";

export class AthleteTeam extends StringValueObject {
  constructor(value: string) {
    if (value.length < 2) {
      throw new Error("AthleteTeam must be at least 2 characters long.");
    }
    super(value);
  }
}