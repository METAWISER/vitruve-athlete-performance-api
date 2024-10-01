import { MetricsRepository } from "../infrastructure/MetricsRepository";
import { AthleteId } from "../../Athletes/domain/interfaces/AthleteId";
import { DomainError } from "../../shared/domain/errors/DomainError";
import redisClient from "../../shared/infrastructure/cache/redisClient";
import logger from "../../shared/infrastructure/logger/logger";
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
  
  private generateCacheKey(athleteId: AthleteId, filterOptions: MetricsFilterOptions): string {
    const { metricType, startDate, endDate } = filterOptions;
    return `metrics:${athleteId.value}:${metricType || "all"}:${startDate?.toISOString() || "noStart"}:${endDate?.toISOString() || "noEnd"}`;
  }

async run(athleteId: AthleteId, filterOptions: MetricsFilterOptions): Promise<MetricsPrimitives[]> {

  if (!athleteId || !athleteId.value) {
    throw new DomainError("Invalid athlete ID");
  }

  if (filterOptions.startDate && filterOptions.endDate && filterOptions.startDate > filterOptions.endDate) {
    throw new DomainError("Invalid date range: startDate is after endDate");
  }

  const cacheKey = this.generateCacheKey(athleteId, filterOptions);

  try {
    const cachedMetrics = await redisClient.get(cacheKey);
    if (cachedMetrics) {
      logger.info(`Cache hit for key: ${cacheKey}`);
      return JSON.parse(cachedMetrics);
    }

    const metrics = await this.metricsRepository.findByAthleteIdWithFilters(athleteId, filterOptions);

    await redisClient.set(cacheKey, JSON.stringify(metrics), { EX: 3600 });
    logger.info(`Cache set for key: ${cacheKey}`);

    return metrics;
  } catch (error) {
    if (error instanceof Error) {
      logger.error(`Error fetching metrics: ${error.message}`);
      throw new DomainError(`Error fetching metrics: ${error.message}`);
    } else {
      throw new DomainError("Error fetching metrics: Unknown error");
    }
  }
}
}