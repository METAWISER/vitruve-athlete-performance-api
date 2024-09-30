// src/Athletes/application/MetricsCreator.ts
import { MetricsRepository } from "../infrastructure/MetricsRepository";
import { Metrics } from "../domain/Metrics";
import { MetricsCreatorDto } from "../../api/dtos/MetricsCreator.dto";
import { AthleteId } from "../../Athletes/domain/interfaces/AthleteId";
import { MetricsId } from "../domain/interfaces/MetricsId";
import { MetricType } from "../domain/interfaces/MetricType";
import { MetricUnit } from "../domain/interfaces/MetricUnit";

export class MetricsCreator {
  constructor(private repository: MetricsRepository) {}

  async run(athleteId: AthleteId, data: MetricsCreatorDto): Promise<void> {
    const metric = new Metrics(
      new MetricsId(),
      athleteId,
      new MetricType(data.metricType),
      data.value,
      new MetricUnit(data.unit),
      new Date(),
    );

    await this.repository.create(metric);
  }
}
