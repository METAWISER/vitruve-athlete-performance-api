import { Context } from "hono";
import { AthleteDeleteService } from "../../../Athletes/application/AthleteDeleter";
import HttpResponse from "../../../shared/infrastructure/response/HttpResponse";
import IController from "../IController";
import { AthleteId } from "../../../Athletes/domain/interfaces/AthleteId";

export class AthleteDeleteController implements IController {
  constructor(
    private readonly athleteDeleteService: AthleteDeleteService,
    private readonly httpResponse: HttpResponse
  ) {}

  async run(c: Context): Promise<Response> {
    const athleteId = c.req.param("id");

    try {
      await this.athleteDeleteService.run(new AthleteId(athleteId));
      return this.httpResponse.Ok(c, { message: 'Athlete and related metrics deleted successfully' });
    } catch (error) {
      return this.httpResponse.InternalServerError(c, 'Error deleting athlete');
    }
  }
}
