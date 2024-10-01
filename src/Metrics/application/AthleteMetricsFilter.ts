import { MetricsRepository } from "../infrastructure/MetricsRepository";
import { AthleteId } from "../../Athletes/domain/interfaces/AthleteId";
import { DomainError } from "../../shared/domain/errors/DomainError";

interface MetricsFilterOptions {
  metricType?: string;
  startDate?: Date;
  endDate?: Date;
}

interface MetricsPrimitives {
  id: string;
  athleteId: string;
  metricType: string;
  value: number;
  unit: string;
  startDate?: Date | null;
  endDate?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export class AthleteMetricsFilterService {
  constructor(private readonly metricsRepository: MetricsRepository) {}

  async run(athleteId: AthleteId, filterOptions: MetricsFilterOptions): Promise<MetricsPrimitives[]> {
    if (!athleteId || !athleteId.value) {
      throw new DomainError("Invalid athlete ID");
    }

    if (filterOptions.startDate && filterOptions.endDate && filterOptions.startDate > filterOptions.endDate) {
      throw new DomainError("Invalid date range: startDate is after endDate");
    }

    try {
      const metrics = await this.metricsRepository.findByAthleteIdWithFilters(athleteId, filterOptions);

      return metrics
    } catch (error) {
      if (error instanceof Error) {
        throw new DomainError(`Error fetching metrics: ${error.message}`);
      } else {
        throw new DomainError("Error fetching metrics: Unknown error");
      }
    }
  }
}
