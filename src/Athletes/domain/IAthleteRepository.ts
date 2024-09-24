import { Athlete } from "./Athlete";
import { AthleteId } from "./AthleteId";

export interface IAthleteRepository {
  create(athlete: Athlete): Promise<void>;
  update(athlete: Athlete): Promise<void>;
  delete(uid: AthleteId): Promise<void>;
  search(uid: string): Promise<Athlete | []>;
  searchAll(): Promise<Athlete[]>;
}