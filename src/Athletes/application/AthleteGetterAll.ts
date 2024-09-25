import { AthleteRepository } from "../infrastructure/AthleteRepository";

export class AthleteFinder {
  constructor(private readonly athleteRepository: AthleteRepository) {}

  async run(): Promise<any[]> {
    const athletes = await this.athleteRepository.searchAll();
    return athletes;
  }
}
