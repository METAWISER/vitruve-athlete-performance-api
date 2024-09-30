import { Context } from "hono";
import HttpResponse from "../../../shared/infrastructure/response/HttpResponse";
import { AthleteGetService } from "../../../Athletes/application/AthleteGetter";
import IController from "../IController";
import logger from "../../../shared/infrastructure/logger/logger";
import { AthleteId } from "../../../Athletes/domain/interfaces/AthleteId";

export class AthleteGetController implements IController {
  constructor(
    private readonly athleteGetService: AthleteGetService,
    private readonly httpResponse: HttpResponse,
  ) {}

  async run(c: Context): Promise<Response> {
    try {
      const athleteId = c.req.param("id");
      const athleteWithMetrics = await this.athleteGetService.run(athleteId as unknown as AthleteId);

      return this.httpResponse.Ok(c, athleteWithMetrics);
    } catch (error) {
      logger.error("Error fetching athlete details:", error);
      return this.httpResponse.InternalServerError(c, "Error fetching athlete details");
    }
  }
}
