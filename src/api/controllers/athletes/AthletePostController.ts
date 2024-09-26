import { Request, Response, NextFunction } from "express";
import { AthleteCreator } from "../../../Athletes/application/index";
import HttpResponse from "../../../shared/infrastructure/response/HttpResponse";
import IController from "../IController";
import { AthleteCreatorDto } from "../../dtos/AthleteCreator.dto";
import { ErrorHandler } from "../../../shared/infrastructure/error/ErrorHandler";

export class AthletePostController implements IController {
  constructor(
    private readonly athleteCreator: AthleteCreator,
    private readonly httpResponse: HttpResponse,
    private readonly errorHandler: ErrorHandler 
  ) {}

  async run(req: Request, res: Response, next: NextFunction): Promise<void> {
    console.log("Received request to create athlete", req.body);
    try {
      const athleteData: AthleteCreatorDto = req.body;
      await this.athleteCreator.run(athleteData);
      this.httpResponse.Created(res, { message: "Athlete created successfully" });
    } catch (error) {
      await this.errorHandler.handleError(error, req, res, next);
    }
  }
}
