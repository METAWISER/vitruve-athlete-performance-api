import { Bcrypt } from "../../shared/domain/value-objects/Bcrypt";
import { AthleteRepository } from "../infrastructure/AthleteRepository";
import { AthleteCreatorDto } from "../../api/dtos/AthleteCreator.dto";
import { AthleteName } from "../domain/interfaces/AthleteName";
import { AthleteAge } from "../domain/interfaces/AthleteAge";
import { AthleteId } from "../domain/interfaces/AthleteId";
import { Athlete } from "../domain/Athlete";
import { AthleteEmail } from "../domain/interfaces/AthleteEmail";
import { AthleteTeam } from "../domain/interfaces/AthleteTeam";
import { AthletePassword } from "../domain/interfaces/AthletePassword";

export class AthleteCreator {
  constructor(private repository: AthleteRepository) {}

  async run(data: AthleteCreatorDto): Promise<void> {
    const hashedPassword = await Bcrypt.create(data.password);

    const athlete = new Athlete(
      new AthleteId(),
      new AthleteName(data.name),
      new AthleteAge(data.age),
      new AthleteEmail(data.email),
      new AthletePassword(hashedPassword.toPrimitives()),
      new AthleteTeam(data.team)
    );

    await this.repository.create(athlete);
  }
}
