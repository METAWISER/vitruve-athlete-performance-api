import { IAthleteRepository } from "../domain/interfaces/IAthleteRepository";
import { Athlete } from "../domain/Athlete";
import { AthleteId } from "../domain/interfaces/AthleteId";
import { DomainError } from "../../shared/domain/errors/DomainError";
import { AthleteUpdateDto } from "../../api/dtos/AthleteUpdate.dto";
import { PrismaClient } from '@prisma/client';

export class AthleteRepository implements IAthleteRepository {
  
  constructor(private prisma: PrismaClient) {}
  
  async create(athlete: Athlete): Promise<void> {
    const athletePrimitives = athlete.toPrimitives();
  
    const athleteExists = await this.prisma.athlete.findUnique({
      where: { email: athletePrimitives.email },
    });
  
    if (athleteExists) {
      throw new DomainError("Athlete already registered with this email");
    }
    
    await this.prisma.athlete.create({
      data: {
        uid: athletePrimitives.uid,
        name: athletePrimitives.name ?? "",
        age: athletePrimitives.age ?? 0,
        email: athletePrimitives.email!,
        password: athletePrimitives.password!,
        team: athletePrimitives.team ?? "",
      },
    });
  }
  
  async searchAll(): Promise<Athlete[]> {
    const athletes = await this.prisma.athlete.findMany();
    return athletes.map((athlete) => Athlete.fromPrimitives(athlete));
  }

  async update(uid: AthleteId, updateAthleteDto: AthleteUpdateDto): Promise<Athlete> {
    const athlete = await this.findById(uid.value);

    if (updateAthleteDto.name) {
      updateAthleteDto.name = updateAthleteDto.name.toLowerCase();
    }

    try {
      const updatedAthlete = await this.prisma.athlete.update({
        where: { uid: uid.value },
        data: updateAthleteDto,
      });

      return Athlete.fromPrimitives(updatedAthlete);
    } catch (error) {
      this.handleException(error);
      throw error;
    }
  }

  
  async findById(uid: string): Promise<Athlete> {
    const athlete = await this.prisma.athlete.findUnique({
      where: { uid: uid },
    });
    
    if (!athlete) {
      throw new DomainError(`Athlete with ID ${uid} not found`);
    }
    
    return Athlete.fromPrimitives(athlete);
  }
  
  async findByEmail(email: string): Promise<Athlete> {
    const athlete = await this.prisma.athlete.findUnique({
      where: { email: email },
    });
    
    if (!athlete) {
      throw new DomainError(`Athlete with email ${email} not found`);
    }
    
    return Athlete.fromPrimitives(athlete);
  }
  
  
  private handleException(error: any): void {
    if (error instanceof DomainError) {
      throw new DomainError(error.message);
    }
    throw new Error('Unexpected error occurred while updating Athlete');
  }
  
  async delete(uid: AthleteId): Promise<void> {
    try {
      await this.prisma.athlete.delete({
        where: { uid: uid.value },
      });
    } catch (error) {
      this.handleException(error);
    }
  }
  
  search(uid: string): Promise<Athlete | []> {
    throw new Error("Method not implemented.");
  }
}
