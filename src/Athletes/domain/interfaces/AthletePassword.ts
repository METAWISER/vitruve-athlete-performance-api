import { Bcrypt } from "../../../shared/domain/value-objects/Bcrypt";

export class AthletePassword extends Bcrypt{
  constructor(value: string) {
    super(value);
  }
}