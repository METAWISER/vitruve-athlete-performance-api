import { MetricsRepository } from "../infrastructure/MetricsRepository";
import { AthleteRepository } from "../../Athletes/infrastructure/AthleteRepository";
import { Metrics } from "../domain/Metrics";
import { MetricsCreatorDto } from "../../api/dtos/MetricsCreator.dto";
import { AthleteId } from "../../Athletes/domain/interfaces/AthleteId";
import { MetricsId } from "../domain/interfaces/MetricsId";
import { MetricType } from "../domain/interfaces/MetricType";
import { MetricUnit } from "../domain/interfaces/MetricUnit";
import {
  DomainError,
  InternalServerError,
  ValidationError,
} from "../../shared/domain/errors/index";

export class MetricsCreator {
  constructor(
    private repository: MetricsRepository,
    private athleteRepository: AthleteRepository
  ) {}

  async run(athleteId: AthleteId, data: MetricsCreatorDto): Promise<void> {
    const athlete = await this.athleteRepository.findById(athleteId.value);
    if (!athlete) {
      throw new DomainError(`Athlete with ID ${athleteId.value} not found`);
    }

    if (!data.metricType || !data.value || !data.unit) {
      throw new ValidationError("Required fields are missing");
    }

    if (data.value <= 0) {
      throw new ValidationError("Metric value must be a positive number");
    }

    const validUnits = ["km", "meters/second", "minutes", "reps"];
    if (!validUnits.includes(data.unit)) {
      throw new ValidationError(
        "Invalid unit provided, try one of the following: km, meters/second, minutes, reps"
      );
    }

    const startDate = data.startDate ? new Date(data.startDate) : null;
    const endDate = data.endDate ? new Date(data.endDate) : null;

    try {
      const metric = new Metrics(
        new MetricsId(),
        athleteId,
        new MetricType(data.metricType),
        data.value,
        new MetricUnit(data.unit),
        startDate,
        endDate
      );

      await this.repository.create(metric);
    } catch (error) {
      throw new InternalServerError("Failed to save metric");
    }
  }
}
