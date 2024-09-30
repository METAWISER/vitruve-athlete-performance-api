import { AthleteRepository } from "../infrastructure/AthleteRepository";
import { AthleteId } from "../domain/interfaces/AthleteId";
import { AthleteUpdateDto } from "../../api/dtos/AthleteUpdate.dto";
import { Athlete } from "../domain/Athlete";

export class AthleteUpdateService {
  constructor(private readonly athleteRepository: AthleteRepository) {}

  async run(uid: AthleteId, updateData: AthleteUpdateDto): Promise<Athlete> {

    const updatedAthlete = await this.athleteRepository.update(uid, updateData);

    return updatedAthlete;
  }
}
