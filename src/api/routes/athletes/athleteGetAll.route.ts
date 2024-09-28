import { Request, Response, NextFunction, Router } from "express";
import { PrismaClient } from "@prisma/client";
//import { AthleteInstance } from "../../../Athletes/infrastructure/AthleteInstance";
import { AthleteGetController } from "../../controllers/athletes/AthleteGetController";
import { AthleteRepository } from "../../../Athletes/infrastructure/AthleteRepository";
import HttpResponse from "../../../shared/infrastructure/response/HttpResponse";
import { ErrorHandler } from "../../../shared/infrastructure/error/ErrorHandler";
import { AthleteGetterAll } from "../../../Athletes/application";
import { validateJWT } from "../../middlewares/JwtMiddleware";

export const register = (router: Router): void => {
  //Uncomment this line to use the sequelize AthleteRepository
  //const athleteRepository = new AthleteRepository(AthleteInstance);
  const athleteRepository = new AthleteRepository(new PrismaClient());
  const athleteFinder = new AthleteGetterAll(athleteRepository);
  const httpResponse = new HttpResponse();
  const errorHandler = new ErrorHandler();
  const athleteGetController = new AthleteGetController(
    athleteFinder,
    httpResponse,
    errorHandler
  );

  router.get(
    "/athletes",
    validateJWT,
    async (req: Request, res: Response, next: NextFunction) =>
      await athleteGetController.run(req, res, next)
  );
};
