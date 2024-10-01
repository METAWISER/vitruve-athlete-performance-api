import { MetricsId } from "./interfaces/MetricsId";
import { AthleteId } from "../../Athletes/domain/interfaces/AthleteId";
import { MetricType } from "./interfaces/MetricType";
import { MetricUnit } from "./interfaces/MetricUnit";

export class Metrics {
  constructor(
    readonly id: MetricsId,
    readonly athleteId: AthleteId,
    readonly metricType: MetricType,
    readonly value: number,
    readonly unit: MetricUnit,
    readonly startDate?: Date | null,
    readonly endDate?: Date | null,
    readonly createdAt?: Date,
    readonly updatedAt?: Date
  ) {}

  static fromPrimitives(plainData: {
    id: string;
    athleteId: string;
    metricType: string;
    value: number;
    unit: string;
    startDate?: Date;
    endDate?: Date;
    createdAt?: Date;
    updatedAt?: Date;
  }): Metrics {
    return new Metrics(
      new MetricsId(plainData.id),
      new AthleteId(plainData.athleteId),
      new MetricType(plainData.metricType),
      plainData.value,
      new MetricUnit(plainData.unit),
      plainData.startDate ? new Date(plainData.startDate) : null,
      plainData.endDate ? new Date(plainData.endDate) : null,
      plainData.createdAt ? new Date(plainData.createdAt) : undefined,
      plainData.updatedAt ? new Date(plainData.updatedAt) : undefined
    );
  }

  toPrimitives() {
    return {
      id: this.id.value,
      athleteId: this.athleteId.value,
      metricType: this.metricType.value,
      value: this.value,
      unit: this.unit.value,
      startDate: this.startDate,
      endDate: this.endDate,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
