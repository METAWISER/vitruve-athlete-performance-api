import { Athlete } from "../domain/Athlete";
import { AthleteRepository } from "../infrastructure/AthleteRepository";

export class AthleteGetterAll {
  constructor(private readonly athleteRepository: AthleteRepository) {}

  async run(): Promise<Athlete[]> {
    const athletes = await this.athleteRepository.searchAll();
    return athletes;
  }
}
