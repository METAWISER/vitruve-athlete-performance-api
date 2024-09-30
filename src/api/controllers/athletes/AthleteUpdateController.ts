import { Context } from "hono";
import { AthleteUpdateService } from "../../../Athletes/application/AthleteUpdater";
import { AthleteUpdateDto } from "../../dtos/AthleteUpdate.dto";
import HttpResponse from "../../../shared/infrastructure/response/HttpResponse";
import logger from "../../../shared/infrastructure/logger/logger";
import { AthleteId } from "../../../Athletes/domain/interfaces/AthleteId";

export class AthleteUpdateController {
  constructor(
    private readonly athleteUpdateService: AthleteUpdateService,
    private readonly httpResponse: HttpResponse
  ) {}

  async run(c: Context): Promise<Response> {
    try {
      const { id } = c.req.param();
      const updateData: AthleteUpdateDto = await c.req.json(); 

      const updatedAthlete = await this.athleteUpdateService.run(new AthleteId(id), updateData);

      return this.httpResponse.Ok(c, { message: "Athlete updated successfully", athlete: updatedAthlete.toPrimitives() });
    } catch (error) {
      logger.error('Error updating athlete:', error);
      return this.httpResponse.InternalServerError(c, 'Error updating athlete');
    }
  }
}
