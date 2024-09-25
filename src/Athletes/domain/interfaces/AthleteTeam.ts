import { StringValueObject } from "../../../shared/domain/value-objects/StringValueObject";

export class AthleteTeam extends StringValueObject {
  constructor(value: string) {
    super(value);
  }
}