import { Context } from "hono";
import { AthleteGetterAll } from "../../../Athletes/application";
import HttpResponse from "../../../shared/infrastructure/response/HttpResponse";
import IController from "../IController";


export class AthleteGetController implements IController {
  constructor(
    private readonly athleteGetterAll: AthleteGetterAll,
    private readonly httpResponse: HttpResponse,
  ) {}

  async run(c: Context): Promise<Response> {
    try {
      const athletes = await this.athleteGetterAll.run();
      return this.httpResponse.Ok(c, { athletes }); 
    } catch (error) {
      return await this.httpResponse.InternalServerError(c, 'Error getting athletes');
    }
  }
}
