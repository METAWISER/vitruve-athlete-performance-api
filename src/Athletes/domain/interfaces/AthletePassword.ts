import { StringValueObject } from "../../../shared/domain/value-objects/StringValueObject";

export class UserPassword extends StringValueObject {
  constructor(value: string) {
    super(value);
  }
}