export class MetricType {
  constructor(readonly value: string) {
    const validTypes = ["speed", "strength", "stamina"]; 
    if (!validTypes.includes(value)) {
      throw new Error(`Invalid metric type: ${value}`);
    }
  }
}