import { Request, Response } from "express";

import { AthleteCreator } from "../../../Athletes/application/AthleteCreator";
import  HttpResponse  from "../../../shared/infrastructure/response/HttpResponse";
import  IController from "./IController";
import { AthleteCreatorDto } from "../../dtos/AthleteCreator.dto";


export class AthletePostController implements IController {
	constructor(
		private readonly athleteCreator: AthleteCreator,
		private readonly httpResponse: HttpResponse
	) {}

  async run(req: Request, res: Response): Promise<void> {
		try {
			const athleteData: AthleteCreatorDto = req.body;

			await this.athleteCreator.run(athleteData);

			this.httpResponse.Created(res, { message: "Athlete created successfully" });
		} catch (error) {
			this.httpResponse.UnprocessableEntity(res, error);
		}
	}
}