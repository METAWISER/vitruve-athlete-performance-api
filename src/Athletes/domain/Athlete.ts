import { AthleteId } from "./interfaces/AthleteId";
import { AthleteName } from "./interfaces/AthleteName";
import { AthleteAge } from "./interfaces/AthleteAge";
import { AthleteEmail } from "./interfaces/AthleteEmail";
import { AthleteTeam } from "./interfaces/AthleteTeam";

export class Athlete {
  constructor(
    readonly uid: AthleteId,
    readonly name: AthleteName,
    readonly age: AthleteAge,
    readonly email: AthleteEmail,
    readonly team: AthleteTeam
  ) {}

  static fromPrimitives(plainData: {
    uid: string;
    name: string;
    age: number;
    email: string;
    team: string;
  }): Athlete {
    return new Athlete(
      new AthleteId(plainData.uid),
      new AthleteName(plainData.name),
      new AthleteAge(plainData.age),
      new AthleteEmail(plainData.email),
      new AthleteTeam(plainData.team)
    );
  }

  toPrimitives() {
    return {
      uid: this.uid.toString(),
      name: this.name.toString(),
      age: this.age.toString(),
      email: this.email.toString(),
      team: this.team.toString(),
    };
  }
}
