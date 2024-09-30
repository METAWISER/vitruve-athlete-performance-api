import { AthleteRepository } from "../infrastructure/AthleteRepository";
import { MetricsRepository } from "../../Metrics/infrastructure/MetricsRepository";
import { AthleteId } from "../domain/interfaces/AthleteId";

export class AthleteDeleteService {
  constructor(
    private readonly athleteRepository: AthleteRepository,
    private readonly metricsRepository: MetricsRepository
  ) {}

  async run(athleteId: AthleteId): Promise<void> {

    await this.metricsRepository.deleteMetricsByAthlete(athleteId);
    await this.athleteRepository.delete(athleteId);
  }
}
