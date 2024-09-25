import { IAthleteRepository } from "../domain/interfaces/IAthleteRepository";
import { Athlete } from "../domain/Athlete";
import { AthleteInstance } from "./AthleteInstance";
import { AthleteId } from "../domain/interfaces/AthleteId";
import { DomainError } from "../../shared/domain/errors/DomainError";

export class AthleteRepository implements IAthleteRepository {
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
  searchAll(): Promise<Athlete[]> {
    throw new Error("Method not implemented.");
  }

  async create(athlete: Athlete): Promise<void> {
    const athletePrimitives = athlete.toPrimitives();
    const athleteExists = await this.Model.findOne({
      where: { email: athletePrimitives.email }
    });
    if (athleteExists) {
      throw new DomainError("Athlete already registered with this email");
    }
    await this.Model.create(athletePrimitives);
  }

  
}
