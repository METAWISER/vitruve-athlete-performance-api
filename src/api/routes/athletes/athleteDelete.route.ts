import { Hono } from "hono";
import { PrismaClient } from "@prisma/client";
import { AthleteRepository } from "../../../Athletes/infrastructure/AthleteRepository";
import { MetricsRepository } from "../../../Metrics/infrastructure/MetricsRepository";
import { AthleteDeleteService } from "../../../Athletes/application/AthleteDeleter";
import { AthleteDeleteController } from "../../controllers/athletes/AthleteDeleteController";
import HttpResponse from "../../../shared/infrastructure/response/HttpResponse";
import { validateJWT } from "../../middlewares/JwtMiddleware";

export const register = (router: Hono): void => {
  const prisma = new PrismaClient();

  const athleteRepository = new AthleteRepository(prisma);
  const metricsRepository = new MetricsRepository(prisma);

  const athleteDeleteService = new AthleteDeleteService(
    athleteRepository,
    metricsRepository
  );
  const httpResponse = new HttpResponse();

  const athleteDeleteController = new AthleteDeleteController(
    athleteDeleteService,
    httpResponse
  );

  router.delete(
    "/athletes/:id",
    validateJWT,
    async (c) => await athleteDeleteController.run(c)
  );
};
