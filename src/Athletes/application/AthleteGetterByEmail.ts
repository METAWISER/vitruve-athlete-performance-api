import { Athlete } from "../domain/Athlete";
import { AthleteRepository } from "../infrastructure/AthleteRepository";

export class AthleteGetterByEmail {
  constructor(private readonly repository: AthleteRepository) {}

  async run(email: string): Promise<Athlete> {
    const athlete = await this.repository.findByEmail(email);
    return athlete;
  }
}