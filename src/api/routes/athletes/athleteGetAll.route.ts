import { Context, Hono } from "hono";
import { PrismaClient } from "@prisma/client";
//import { AthleteInstance } from "../../../Athletes/infrastructure/AthleteInstance";
import { AthleteGetController } from "../../controllers/athletes/AthleteGetAllController";
import { AthleteRepository } from "../../../Athletes/infrastructure/AthleteRepository";
import HttpResponse from "../../../shared/infrastructure/response/HttpResponse";
import { ErrorHandler } from "../../../shared/infrastructure/error/ErrorHandler";
import { AthleteGetterAll } from "../../../Athletes/application";
import { validateJWT } from "../../middlewares/JwtMiddleware";

export const register = (router: Hono): void => {
  //Uncomment this line to use the sequelize AthleteRepository
  //const athleteRepository = new AthleteRepository(AthleteInstance);
  const athleteRepository = new AthleteRepository(new PrismaClient());
  const athleteFinder = new AthleteGetterAll(athleteRepository);
  const httpResponse = new HttpResponse();
  const errorHandler = new ErrorHandler();
  const athleteGetController = new AthleteGetController(
    athleteFinder,
    httpResponse,
  );

  router.get(
    "/athletes",
    validateJWT,
    async (c: Context) =>
      await athleteGetController.run(c)
  );
};
