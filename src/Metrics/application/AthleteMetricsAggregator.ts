import { MetricsRepository } from "../infrastructure/MetricsRepository";
import { AthleteRepository } from "../../Athletes/infrastructure/AthleteRepository";
import { AthleteId } from "../../Athletes/domain/interfaces/AthleteId";
import { DomainError } from "../../shared/domain/errors/DomainError";

interface MetricsAggregateOptions {
  metricType?: string;
}

interface MetricsAggregateResult {
  average: number;
  max: number;
  min: number;
  totalCount: number;
  stddev?: number;
}

export class AthleteMetricsAggregateService {
  constructor(
    private readonly metricsRepository: MetricsRepository,
    private readonly athleteRepository: AthleteRepository 
  ) {}

  async run(athleteId: AthleteId, options: MetricsAggregateOptions): Promise<MetricsAggregateResult> {

    const athleteExists = await this.athleteRepository.findById(athleteId.value);

    if (!athleteExists) {
      throw new DomainError(`Athlete with ID ${athleteId.value} not found`);
    }

    const aggregates = await this.metricsRepository.aggregateMetrics(athleteId, options);

    return {
      average: aggregates._avg.value ?? 0,
      max: aggregates._max.value ?? 0,
      min: aggregates._min.value ?? 0,
      totalCount: aggregates._count.value ?? 0,
      stddev: aggregates.stddev,
    };
  }
}
