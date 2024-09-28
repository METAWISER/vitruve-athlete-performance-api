import { Router, Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
//import { AthleteInstance } from "../../../Athletes/infrastructure/AthleteInstance";
import HttpResponse from "../../../shared/infrastructure/response/HttpResponse";
import { AthleteCreator } from "../../../Athletes/application/AthleteCreator";
import { AthleteRepository } from "../../../Athletes/infrastructure/AthleteRepository";
import { AthletePostController } from "../../controllers/athletes/AthletePostController";
import { ErrorHandler } from "../../../shared/infrastructure/error/ErrorHandler"; 

export const register = (router: Router): void => {
  //Uncomment this line to use the sequelize AthleteRepository
  //const athleteRepository = new AthleteRepository(AthleteInstance);
  const athleteRepository = new AthleteRepository(new PrismaClient());
  const athleteCreator = new AthleteCreator(athleteRepository);
  const httpResponse = new HttpResponse();
  const errorHandler = new ErrorHandler();

  const athletePostController = new AthletePostController(
    athleteCreator,
    httpResponse,
    errorHandler
  );

  router.post(
    "/athletes", 
    async (req: Request, res: Response, next: NextFunction) => {
      await athletePostController.run(req, res, next);
    }
  );
};
