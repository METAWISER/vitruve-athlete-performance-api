import { IAthleteRepository } from "../domain/interfaces/IAthleteRepository";
import { Athlete } from "../domain/Athlete";
import { AthleteInstance } from "./AthleteInstance";
import { AthleteId } from "../domain/interfaces/AthleteId";
import { DomainError } from "../../shared/domain/errors/DomainError";

export class AthleteRepository implements IAthleteRepository {
  save(save: any) {
    throw new Error('Method not implemented.');
  }
  constructor(readonly Model: typeof AthleteInstance) {}
  update(athlete: Athlete): Promise<void> {
    throw new Error("Method not implemented.");
  }
  delete(uid: AthleteId): Promise<void> {
    throw new Error("Method not implemented.");
  }
  search(uid: string): Promise<Athlete | []> {
    throw new Error("Method not implemented.");
  }
  async searchAll(): Promise<Athlete[]> {
    const athletes = await this.Model.findAll();
    return athletes.map((athlete) => Athlete.fromPrimitives(athlete.toJSON()));
  }

  async create(athlete: Athlete): Promise<void> {
    const athletePrimitives = athlete.toPrimitives();
    const athleteExists = await this.Model.findOne({
      where: { email: athletePrimitives.email },
    });
    if (athleteExists) {
      throw new DomainError("Athlete already registered with this email");
    }
    await this.Model.create(athletePrimitives);
  }
}
