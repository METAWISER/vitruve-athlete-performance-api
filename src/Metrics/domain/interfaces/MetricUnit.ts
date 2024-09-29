export class MetricUnit {
  constructor(readonly value: string) {
    const validUnits = ["kg", "meters/second", "seconds", "km"];
    if (!validUnits.includes(value)) {
      throw new Error(`Invalid metric unit: ${value}`);
    }
  }
}