import { Hono } from "hono";
import { AthleteGetController } from "../../controllers/athletes/AthleteGetController";
import { PrismaClient } from "@prisma/client";
import { AthleteRepository } from "../../../Athletes/infrastructure/AthleteRepository";
import { MetricsRepository } from "../../../Metrics/infrastructure/MetricsRepository";
import { AthleteMetricsGetter } from "../../../Metrics/application/MetricsGetter";
import { AthleteGetService } from "../../../Athletes/application/AthleteGetter";
import HttpResponse from "../../../shared/infrastructure/response/HttpResponse";
import { validateJWT } from "../../middlewares/JwtMiddleware";

export const register = (router: Hono): void => {
  const prisma = new PrismaClient();
  const athleteRepository = new AthleteRepository(prisma);
  const metricsRepository = new MetricsRepository(prisma);
  const athleteMetricsGetter = new AthleteMetricsGetter(metricsRepository);
  const athleteGetService = new AthleteGetService(
    athleteRepository,
    athleteMetricsGetter
  );
  const httpResponse = new HttpResponse();

  const athleteGetController = new AthleteGetController(
    athleteGetService,
    httpResponse
  );

  router.get("/athletes/:id", validateJWT, async (c) => {
    return await athleteGetController.run(c);
  });
};
