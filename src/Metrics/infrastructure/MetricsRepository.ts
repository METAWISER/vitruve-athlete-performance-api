import { PrismaClient, Prisma } from "@prisma/client";
import { AthleteId } from "../../Athletes/domain/interfaces/AthleteId";
import { Metrics } from "../domain/Metrics";

interface MetricsFilterOptions {
  metricType?: string;
  startDate?: Date;
  endDate?: Date;
}

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
        startDate: metricPrimitives.startDate,
        endDate: metricPrimitives.endDate,    
      },
    });
  }
  

  async getAllMetricsByAthlete(athleteId: AthleteId): Promise<Metrics[]> {
    const metrics = await this.prisma.performanceMetric.findMany({
      where: { athleteId: athleteId.value },
    });

    return metrics.map((metric: any) =>
      Metrics.fromPrimitives({
        id: metric.id,
        athleteId: metric.athleteId,
        metricType: metric.metricType,
        value: metric.value,
        unit: metric.unit,
        startDate: metric.startDate ?? null,
        endDate: metric.endDate ?? null,
        createdAt: metric.createdAt,
        updatedAt: metric.updatedAt,
      })
    );
  }

  async deleteMetricsByAthlete(athleteId: AthleteId): Promise<void> {
    await this.prisma.performanceMetric.deleteMany({
      where: { athleteId: athleteId.value },
    });
  }

  async findByAthleteIdWithFilters(athleteId: AthleteId, filterOptions: MetricsFilterOptions) {
    const { metricType, startDate, endDate } = filterOptions;

    return this.prisma.performanceMetric.findMany({
      where: {
        athleteId: athleteId.value,
        ...(metricType && { metricType }),
        ...(startDate && { timestamp: { gte: startDate } }),
        ...(endDate && { timestamp: { lte: endDate } }),
      },
    });
  }
}
