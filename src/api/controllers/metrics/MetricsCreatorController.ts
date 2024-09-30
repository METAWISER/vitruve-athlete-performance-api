import { Context } from "hono";
import { MetricsCreator } from "../../../Metrics/application/MetricsCreator";
import HttpResponse from "../../../shared/infrastructure/response/HttpResponse";
import IController from "../IController";
import { MetricsCreatorDto as MetricsDto } from "../../dtos/MetricsCreator.dto";
import logger from "../../../shared/infrastructure/logger/logger";
import { AthleteId } from "../../../Athletes/domain/interfaces/AthleteId";

export class MetricsPostController implements IController {
  constructor(
    private readonly metricsCreator: MetricsCreator,
    private readonly httpResponse: HttpResponse,
  ) {}

  async run(c: Context): Promise<Response> {
    try {
      const athleteId = c.req.param("id");
      const data: MetricsDto = await c.req.json();

      await this.metricsCreator.run(new AthleteId(athleteId), data);

      return this.httpResponse.Created(c, { message: 'Metric created successfully' });
    } catch (error) {
      logger.error('Error creating metric:', error);
      return this.httpResponse.InternalServerError(c, 'Error creating metric');
    }
  }
}
