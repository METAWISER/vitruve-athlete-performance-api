import { Request, Response, NextFunction } from "express";
import { AthleteCreator } from "../../../Athletes/application/AthleteCreator";
import HttpResponse from "../../../shared/infrastructure/response/HttpResponse";
import IController from "./IController";
import { AthleteCreatorDto } from "../../dtos/AthleteCreator.dto";
import { ErrorHandler } from "../../../shared/infrastructure/error/ErrorHandler"; // Importamos el ErrorHandler

export class AthletePostController implements IController {
  constructor(
    private readonly athleteCreator: AthleteCreator,
    private readonly httpResponse: HttpResponse,
    private readonly errorHandler: ErrorHandler // Inyectamos el ErrorHandler
  ) {}

  async run(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const athleteData: AthleteCreatorDto = req.body;
      await this.athleteCreator.run(athleteData);
      this.httpResponse.Created(res, { message: "Athlete created successfully" });
    } catch (error) {
      await this.errorHandler.handleError(error, req, res, next);
    }
  }
}
