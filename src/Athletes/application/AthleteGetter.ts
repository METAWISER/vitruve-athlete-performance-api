import { AthleteRepository } from "../infrastructure/AthleteRepository";
import { AthleteMetricsGetter } from "../../Metrics/application/MetricsGetter";
import { AthleteId } from "../domain/interfaces/AthleteId";
import { Athlete } from "../domain/Athlete";
import { Metrics } from "../../Metrics/domain/Metrics";

type AthleteDataWithoutPassword = Omit<ReturnType<Athlete["toPrimitives"]>, "password">;
type AthleteWithMetrics = {
  athlete: AthleteDataWithoutPassword;
  metrics: ReturnType<Metrics["toPrimitives"]>[];
};
export class AthleteGetService {
  constructor(
    private readonly athleteRepository: AthleteRepository,
    private readonly athleteMetricsGetter: AthleteMetricsGetter
  ) {}

  async run(athleteId: AthleteId): Promise<AthleteWithMetrics> {
    const athlete = await this.athleteRepository.findById(athleteId.toString());
    const metrics = await this.athleteMetricsGetter.run(athleteId);

    const { password, ...athleteData } = athlete.toPrimitives();

    return {
      athlete: athleteData,
      metrics: metrics.map(metric => metric.toPrimitives()),
    };
  }
}
