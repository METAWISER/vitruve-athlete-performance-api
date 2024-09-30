import { PrismaClient } from "@prisma/client";
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


}
