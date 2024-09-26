import { AthleteUpdateDto } from "../../../api/dtos/AthleteUpdate.dto";
import { Athlete } from "../Athlete";
import { AthleteId } from "./AthleteId";

export interface IAthleteRepository {
  create(athlete: Athlete): Promise<void>;
  update(uid: AthleteId, athleteUpdateDto: AthleteUpdateDto): Promise<Athlete>;
  delete(uid: AthleteId): Promise<void>;
  search(uid: string): Promise<Athlete | []>;
  searchAll(): Promise<Athlete[]>;
}