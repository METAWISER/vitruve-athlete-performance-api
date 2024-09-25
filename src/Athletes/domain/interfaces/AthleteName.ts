import { StringValueObject } from "../../../shared/domain/value-objects/StringValueObject";

export class AthleteName extends StringValueObject {
  constructor(value: string) {
    super(value);
  }
}