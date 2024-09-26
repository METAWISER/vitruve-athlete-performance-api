import { AthleteId } from "./interfaces/AthleteId";
import { AthleteName } from "./interfaces/AthleteName";
import { AthleteAge } from "./interfaces/AthleteAge";
import { AthleteEmail } from "./interfaces/AthleteEmail";
import { AthleteTeam } from "./interfaces/AthleteTeam";

export class Athlete {
  constructor(
    readonly uid: AthleteId,
    readonly name?: AthleteName,
    readonly age?: AthleteAge,
    readonly email?: AthleteEmail,
    readonly team?: AthleteTeam
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
      plainData.name ? new AthleteName(plainData.name) : undefined,
      plainData.age ? new AthleteAge(plainData.age): undefined,
      plainData.email ? new AthleteEmail(plainData.email): undefined,
      plainData.team ? new AthleteTeam(plainData.team) : undefined
    );
  }

  toPrimitives() {
    return {
      uid: this.uid.value,
      name: this.name?.value,
      age: this.age?.value,
      email: this.email?.value,
      team: this.team?.value,
    };
  }
}
