import { Context } from "hono";
import { AthleteMetricsAggregateService } from "../../../Metrics/application/AthleteMetricsAggregator";
import HttpResponse from "../../../shared/infrastructure/response/HttpResponse";
import IController from "../IController";
import { AthleteId } from "../../../Athletes/domain/interfaces/AthleteId";
import { DomainError } from "../../../shared/domain/errors";
import { validateOrReject } from "class-validator";
import { MetricsAggregateDto } from "../../dtos/MetricsAggregate.dto";

export class AthleteMetricsAggregateController implements IController {
  constructor(
    private readonly metricsAggregateService: AthleteMetricsAggregateService,
    private readonly httpResponse: HttpResponse
  ) {}

  async run(c: Context): Promise<Response> {
    const athleteId = c.req.param("id");
    const metricType = c.req.query("metricType");

    const aggregateOptions = new MetricsAggregateDto();
    aggregateOptions.metricType = metricType;

    try {
      await validateOrReject(aggregateOptions);

      const aggregateResult = await this.metricsAggregateService.run(new AthleteId(athleteId), aggregateOptions);

      return this.httpResponse.Ok(c, { aggregateResult });

    } catch (error) {
      if (error instanceof DomainError) {
        return this.httpResponse.NotFound(c, { error: error.message });
      }
      if (Array.isArray(error) && error[0].constraints) {
        return this.httpResponse.BadRequest(c, {
          error: 'Invalid query parameters',
          details: error.map(err => err.constraints)
        });
      }

      return this.httpResponse.InternalServerError(c, "Error retrieving aggregate metrics");
    }
  }
}