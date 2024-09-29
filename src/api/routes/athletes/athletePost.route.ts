import { Hono } from "hono";
import { PrismaClient } from "@prisma/client";
import HttpResponse from "../../../shared/infrastructure/response/HttpResponse";
import { AthleteCreator } from "../../../Athletes/application/AthleteCreator";
import { AthleteRepository } from "../../../Athletes/infrastructure/AthleteRepository";
import { AthletePostController } from "../../controllers/athletes/AthletePostController";

export const register = (router: Hono): void => {
  const athleteRepository = new AthleteRepository(new PrismaClient());
  const athleteCreator = new AthleteCreator(athleteRepository);
  const httpResponse = new HttpResponse();

  const athletePostController = new AthletePostController(
    athleteCreator,
    httpResponse,
  );

  router.post(
    "/athletes", 
    async (c) => {
      return await athletePostController.run(c);
    }
  );
};
