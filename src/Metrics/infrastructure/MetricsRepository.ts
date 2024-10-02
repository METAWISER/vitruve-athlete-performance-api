import { PrismaClient, Prisma } from "@prisma/client";
import { AthleteId } from "../../Athletes/domain/interfaces/AthleteId";
import { Metrics } from "../domain/Metrics";

interface MetricsFilterOptions {
  metricType?: string;
  startDate?: Date;
  endDate?: Date;
}
interface MetricsAggregateOptions {
  metricType?: string;
}

type TPerformanceMetric = {
  id: string;
  athleteId: string;
  metricType: string;
  value: number;
  unit: string;
  startDate?: Date | null;
  endDate?: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

type TMetricsPrimitives = ReturnType<Metrics['toPrimitives']>;

export class MetricsRepository {
  constructor(private prisma: PrismaClient) {}

  async aggregateMetrics(athleteId: AthleteId, options: MetricsAggregateOptions) {
    const { metricType } = options;
    const result = await this.prisma.performanceMetric.aggregate({
      where: {
        athleteId: athleteId.value,
        ...(metricType && { metricType }),
      },
      _avg: { value: true },
      _min: { value: true },
      _max: { value: true },
      _count: { value: true },
    });

    const metrics: TMetricsPrimitives[] = await this.prisma.performanceMetric.findMany({
      where: {
        athleteId: athleteId.value,
        ...(metricType && { metricType }),
      },
    });

    const stddev = this.calculateStandardDeviation(metrics.map(metric => metric.value));

    return {
      ...result,
      stddev,
    };
  }

  private calculateStandardDeviation(values: number[]): number {
    const n = values.length;
    const mean = values.reduce((acc, value) => acc + value, 0) / n;
    const variance = values.reduce((acc, value) => acc + (value - mean) ** 2, 0) / n;
    return Math.sqrt(variance);
  }

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

    return metrics.map((metric: TPerformanceMetric) =>
      Metrics.fromPrimitives({
        id: metric.id,
        athleteId: metric.athleteId,
        metricType: metric.metricType,
        value: metric.value,
        unit: metric.unit,
        startDate: metric.startDate ?? undefined,
        endDate: metric.endDate ?? undefined,
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
