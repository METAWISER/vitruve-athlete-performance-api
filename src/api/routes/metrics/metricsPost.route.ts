import { Hono } from "hono";
import { PrismaClient } from "@prisma/client";
import { MetricsPostController } from "../../controllers/metrics/MetricsCreatorController";
import { MetricsRepository } from "../../../Metrics/infrastructure/MetricsRepository";
import { AthleteRepository } from "../../../Athletes/infrastructure/AthleteRepository";
import { MetricsCreator } from "../../../Metrics/application/MetricsCreator";
import HttpResponse from "../../../shared/infrastructure/response/HttpResponse";

export const register = (router: Hono): void => {
  const prisma = new PrismaClient();
  const metricsRepository = new MetricsRepository(prisma);
  const athleteRepository = new AthleteRepository(prisma);
  const metricsCreator = new MetricsCreator(
    metricsRepository,
    athleteRepository
  );
  const httpResponse = new HttpResponse();

  const metricsPostController = new MetricsPostController(
    metricsCreator,
    httpResponse
  );

  router.post("/athletes/:id/metrics", async (c) => {
    return await metricsPostController.run(c);
  });
};
