import { IAthleteRepository } from "../domain/interfaces/IAthleteRepository";
import { Athlete } from "../domain/Athlete";
import { AthleteInstance } from "./AthleteInstance";
import { AthleteId } from "../domain/interfaces/AthleteId";
import { DomainError } from "../../shared/domain/errors/DomainError";
import { AthleteUpdateDto } from "../../api/dtos/AthleteUpdate.dto";

export class AthleteRepository implements IAthleteRepository {
  save(save: any) {
    throw new Error('Method not implemented.');
  }
  constructor(readonly Model: typeof AthleteInstance) {}

  async findOne(uid: string): Promise<AthleteInstance> {
    const athlete = await this.Model.findByPk(uid);
    if (!athlete) {
      throw new DomainError(`Athlete with ID ${uid} not found`);
    }
    
    return athlete;
  }
  async update(uid: AthleteId, updateAthleteDto: AthleteUpdateDto): Promise<Athlete> {
    const athlete = await this.findOne(uid.value);

    if (updateAthleteDto.name) {
      updateAthleteDto.name = updateAthleteDto.name.toLowerCase();
    }

    try {
      await athlete.update(updateAthleteDto);
      await athlete.save();

      return Athlete.fromPrimitives(athlete.toJSON());
    } catch (error) {
      this.handleException(error);
      throw error;
    }
  }

  private handleException(error: any): void {
    if (error instanceof DomainError) {
      throw new DomainError(error.message);
    }
    throw new Error('Unexpected error occurred while updating Athlete');
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
