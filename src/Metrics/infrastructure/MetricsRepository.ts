import { PrismaClient } from "@prisma/client";
import { AthleteId } from "../../Athletes/domain/interfaces/AthleteId";
import { Metrics } from "../domain/Metrics";

export class MetricsRepository {
  constructor(private prisma: PrismaClient) {}

  async create(metric: Metrics): Promise<void> {
    const metricPrimitives = metric.toPrimitives();

    await this.prisma.performanceMetric.create({
      data: {
        id: metricPrimitives.id,
        athleteId: metricPrimitives.athleteId,
        metricType: metricPrimitives.metricType,
        value: metricPrimitives.value,
        unit: metricPrimitives.unit,
        timestamp: metricPrimitives.timestamp,
      },
    });
  }

  async getAllMetricsByAthlete(athleteId: AthleteId): Promise<Metrics[]> {
    const metrics = await this.prisma.performanceMetric.findMany({
      where: { athleteId: athleteId.value },
    });

    return metrics.map((metric) =>
      Metrics.fromPrimitives({
        id: metric.id,
        athleteId: metric.athleteId,
        metricType: metric.metricType,
        value: metric.value,
        unit: metric.unit,
        timestamp: metric.timestamp,
      })
    );
  }

}
