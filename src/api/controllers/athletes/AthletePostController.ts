import { Context } from "hono";
import { AthleteCreator } from "../../../Athletes/application/index";
import HttpResponse from "../../../shared/infrastructure/response/HttpResponse";
import IController from "../IController";
import { AthleteCreatorDto } from "../../dtos/AthleteCreator.dto";
import logger from "../../../shared/infrastructure/logger/logger";
import { DomainError } from "../../../shared/domain/errors/DomainError";


export class AthletePostController implements IController {
  constructor(
    private readonly athleteCreator: AthleteCreator,
    private readonly httpResponse: HttpResponse,
  ) {}

  async run(c: Context): Promise<Response> {
    try {
      const { name, age, email, password, team } : AthleteCreatorDto = await c.req.json();
      await this.athleteCreator.run({ name, age, email, password, team });

      return this.httpResponse.Created(c, { message: 'Athlete created successfully' });
    } catch (error) {
      if (error instanceof DomainError) {
        logger.error('Athlete creation conflict:', error.message);
        return this.httpResponse.Conflict(c, { error: error.message });
      }
      logger.error('Error creating athlete:', error);
      return this.httpResponse.InternalServerError(c, 'Error creating athlete'); 
    }
  }
}
