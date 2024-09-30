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
    readonly timestamp: Date
  ) {}

  static fromPrimitives(plainData: {
    id: string;
    athleteId: string;
    metricType: string;
    value: number;
    unit: string;
    timestamp: Date;
  }): Metrics {
    return new Metrics(
      new MetricsId(plainData.id),
      new AthleteId(plainData.athleteId),
      new MetricType(plainData.metricType),
      plainData.value,
      new MetricUnit(plainData.unit),
      new Date(plainData.timestamp)
    );
  }

  toPrimitives() {
    return {
      id: this.id.value,
      athleteId: this.athleteId.value,
      metricType: this.metricType.value,
      value: this.value,
      unit: this.unit.value,
      timestamp: this.timestamp,
    };
  }
}
