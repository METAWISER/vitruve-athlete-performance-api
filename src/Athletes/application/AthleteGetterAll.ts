import { Athlete } from "../domain/Athlete";
import { AthleteRepository } from "../infrastructure/AthleteRepository";

type AthleteWithoutPassword = Omit<ReturnType<Athlete['toPrimitives']>, 'password'>;
export class AthleteGetterAll {
  constructor(private readonly athleteRepository: AthleteRepository) {}

  async run(): Promise<AthleteWithoutPassword[]> {
    const athletes = await this.athleteRepository.searchAll();

    return athletes.map((athlete) => {
      const { password, ...athleteWithoutPassword } = athlete.toPrimitives();
      return athleteWithoutPassword;
    });
  }
}