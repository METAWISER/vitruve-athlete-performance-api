import { AthleteRepository } from "../infrastructure/AthleteRepository";
import { AthleteCreatorDto } from "../../api/dtos/AthleteCreator.dto";
import { AthleteName } from "../domain/AthleteName";
import { AthleteAge } from "../domain/AthleteAge";
import { AthleteId } from "../domain/AthleteId";
import { Athlete } from "../domain/Athlete";
import { AthleteEmail } from "../domain/AthleteEmail";
import { AthleteTeam } from "../domain/AthleteTeam";

export class AthleteCreator {
    constructor(private repository: AthleteRepository) {}
    
    async run(data: AthleteCreatorDto): Promise<void> {
        const athlete = new Athlete(
            new AthleteId(),
            new AthleteName(data.name),
            new AthleteAge(data.age),
            new AthleteEmail(data.email),
            new AthleteTeam(data.team)
        );
        
        await this.repository.create(athlete);
    }
}