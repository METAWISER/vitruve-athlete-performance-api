import { Hono } from "hono";
import { PrismaClient } from "@prisma/client";
import { MetricsRepository } from "../../../Metrics/infrastructure/MetricsRepository";
import { AthleteMetricsFilterService } from "../../../Metrics/application/AthleteMetricsFilter";
import { AthleteMetricsFilterController } from "../../controllers/metrics/AthleteMetricsFilterController";
import HttpResponse from "../../../shared/infrastructure/response/HttpResponse";

export const register = (router: Hono): void => {
  const prisma = new PrismaClient();
  const metricsRepository = new MetricsRepository(prisma);
  const metricsFilterService = new AthleteMetricsFilterService(
    metricsRepository
  );
  const httpResponse = new HttpResponse();

  const athleteMetricsFilterController = new AthleteMetricsFilterController(
    metricsFilterService,
    httpResponse
  );

  router.get(
    "/athletes/:id/metrics",
    async (c) => await athleteMetricsFilterController.run(c)
  );
};
