import { Context } from "hono";
import { MetricsCreator } from "../../../Metrics/application/MetricsCreator";
import HttpResponse from "../../../shared/infrastructure/response/HttpResponse";
import IController from "../IController";
import { MetricsCreatorDto } from "../../dtos/MetricsCreator.dto";
import logger from "../../../shared/infrastructure/logger/logger";
import { AthleteId } from "../../../Athletes/domain/interfaces/AthleteId";
import { DomainError, ValidationError, ConflictError, InternalServerError } from "../../../shared/domain/errors/index";

export class MetricsPostController implements IController {
  constructor(
    private readonly metricsCreator: MetricsCreator,
    private readonly httpResponse: HttpResponse,
  ) {}

  async run(c: Context): Promise<Response> {
    try {
      const athleteId = c.req.param("id");
      const data: MetricsCreatorDto = await c.req.json();

      await this.metricsCreator.run(new AthleteId(athleteId), data);

      return this.httpResponse.Created(c, { message: 'Metric created successfully' });
    } catch (error) {
      if (error instanceof ValidationError) {
        logger.warn('Validation error creating metric:', error.message);
        return this.httpResponse.BadRequest(c, { error: error.message });
      } else if (error instanceof ConflictError) {
        logger.warn('Conflict error creating metric:', error.message);
        return this.httpResponse.Conflict(c, { error: error.message });
      } else if (error instanceof DomainError) {
        logger.warn('Domain error creating metric:', error.message);
        return this.httpResponse.NotFound(c, { error: error.message });
      } else if (error instanceof InternalServerError) {
        logger.error('Internal server error:', error.message);
        return this.httpResponse.InternalServerError(c, { error: error.message });
      } else {
        logger.error('Unexpected error creating metric:', error);
        return this.httpResponse.InternalServerError(c, 'An unexpected error occurred');
      }
    }
  }
}
