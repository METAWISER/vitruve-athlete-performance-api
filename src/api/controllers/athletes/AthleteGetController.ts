import { Request, Response, NextFunction } from "express";
import { AthleteGetterAll } from "../../../Athletes/application";
import HttpResponse from "../../../shared/infrastructure/response/HttpResponse";
import IController from "../IController";
import { ErrorHandler } from "../../../shared/infrastructure/error/ErrorHandler";

export class AthleteGetController implements IController {
  constructor(
    private readonly athleteGetterAll: AthleteGetterAll,
    private readonly httpResponse: HttpResponse,
    private readonly errorHandler: ErrorHandler
  ) {}

  async run(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const athletes = await this.athleteGetterAll.run();
      this.httpResponse.Ok(res, { athletes }); 
    } catch (error) {
      await this.errorHandler.handleError(error, req, res, next);
    }
  }
}
