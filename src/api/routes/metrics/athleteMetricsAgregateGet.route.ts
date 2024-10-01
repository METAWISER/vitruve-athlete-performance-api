import { Hono } from "hono";
import { PrismaClient } from "@prisma/client";
import { MetricsRepository } from "../../../Metrics/infrastructure/MetricsRepository";
import { AthleteRepository } from "../../../Athletes/infrastructure/AthleteRepository";
import { AthleteMetricsAggregateService } from "../../../Metrics/application/AthleteMetricsAggregator";
import { AthleteMetricsAggregateController } from "../../controllers/metrics/AthleteMetricsAggregatorController";
import HttpResponse from "../../../shared/infrastructure/response/HttpResponse";

export const register = (router: Hono): void => {
  const prisma = new PrismaClient();
  const metricsRepository = new MetricsRepository(prisma);
  const athleteRepository = new AthleteRepository(prisma);
  const metricsAggregateService = new AthleteMetricsAggregateService(metricsRepository, athleteRepository);
  const httpResponse = new HttpResponse();

  const athleteMetricsAggregateController = new AthleteMetricsAggregateController(metricsAggregateService, httpResponse);

  router.get("/athletes/:id/metrics/aggregate", async (c) => await athleteMetricsAggregateController.run(c));
};
