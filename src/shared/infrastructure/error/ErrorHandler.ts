import { Request, Response, NextFunction } from "express";
import logger from "../logger/logger";
import HttpResponse from "../response/HttpResponse";
import { IssueService } from "../services/IssueService";
import { DomainError } from "../../domain/errors/DomainError";
import { ValidationError } from "../../domain/errors/ValidationError";
import { DatabaseError } from "../../domain/errors/DatabaseError";
import { Issue } from "../../domain/entities/Issues";
import { Uuid } from "../../domain/value-objects/Uuid";
import { IssueLevel } from "../../domain/value-objects/IssueLevel";

export class ErrorHandler {
  private readonly httpResponse: HttpResponse;

  constructor() {
    this.httpResponse = new HttpResponse();
  }

  public async handleError(error: any, req: Request, res: Response, next: NextFunction): Promise<void> {
    if (error instanceof DomainError) {
      await this.handleAthleteAlreadyExistsError(error, req, res);
    } else if (error instanceof ValidationError) {
      await this.handleValidationError(error, req, res);
    } else {
      await this.handleUnexpectedError(error, req, res);
    }
  }

  private async handleAthleteAlreadyExistsError(error: DomainError, req: Request, res: Response) {
    const message = error.message || "Athlete already exists";
    const issue = this.createIssue(IssueLevel.WARN, message, req.url, 409);
    logger.warn(`Athlete already exists: ${message} - Route: ${req.url}`);
    await IssueService.logIssue(issue);
    this.httpResponse.Conflict(res, { error: message });
  }

  private async handleValidationError(error: ValidationError, req: Request, res: Response) {
    const message = error.message || "Validation failed";
    const issue = this.createIssue(IssueLevel.WARN, message, req.url, 422);
    logger.warn(`Validation error: ${message} - Route: ${req.url}`);
    await IssueService.logIssue(issue);
    this.httpResponse.UnprocessableEntity(res, { error: message });
  }

  private async handleUnexpectedError(error: any, req: Request, res: Response) {
    const message = error.message || "Internal Server Error";
    const issue = this.createIssue(IssueLevel.ERROR, message, req.url, 500); // Usar código 500 para errores inesperados
    logger.error(`Unexpected error: ${message} - Route: ${req.url} - Stack: ${error.stack}`);
    await IssueService.logIssue(issue);
    this.httpResponse.InternalServerError(res, { error: "An unexpected error occurred" });
  }

  private createIssue(level: IssueLevel, message: string, route: string, statusCode: number): Issue {
    const id = new Uuid();
    return new Issue(id, level, message, route, statusCode);
  }
}

