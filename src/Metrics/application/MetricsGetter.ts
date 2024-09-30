import { AthleteId } from "../../Athletes/domain/interfaces/AthleteId";
import { MetricsRepository } from "../../Metrics/infrastructure/MetricsRepository";

export class AthleteMetricsGetter {
  constructor(private readonly metricsRepository: MetricsRepository) {}

  async run(athleteId: AthleteId): Promise<any[]> {
    const metrics = await this.metricsRepository.getAllMetricsByAthlete(athleteId);
    return metrics;
  }
}
