import { Context } from "hono";
import { AthleteMetricsFilterService } from "../../../Metrics/application/AthleteMetricsFilter";
import HttpResponse from "../../../shared/infrastructure/response/HttpResponse";
import IController from "../IController";
import { AthleteId } from "../../../Athletes/domain/interfaces/AthleteId";

export class AthleteMetricsFilterController implements IController {
  constructor(
    private readonly metricsFilterService: AthleteMetricsFilterService,
    private readonly httpResponse: HttpResponse
  ) {}

  async run(c: Context): Promise<Response> {
    const athleteId = c.req.param("id"); 
    const metricType = c.req.query("metricType");
    const startDate = c.req.query("startDate");
    const endDate = c.req.query("endDate");

    const filterOptions = {
      metricType: metricType || undefined,
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
    };

    try {
      const metrics = await this.metricsFilterService.run(new AthleteId(athleteId), filterOptions);
      return this.httpResponse.Ok(c, { metrics });
    } catch (error) {
      return this.httpResponse.InternalServerError(c, 'Error retrieving athlete metrics');
    }
  }
}
