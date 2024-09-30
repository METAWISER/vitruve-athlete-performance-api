import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client';
import { AthleteUpdateService } from '../../../Athletes/application/AthleteUpdater';
import { AthleteRepository } from "../../../Athletes/infrastructure/AthleteRepository";
import { AthleteUpdateController } from "../../controllers/athletes/AthleteUpdateController";
import HttpResponse from "../../../shared/infrastructure/response/HttpResponse";

export const register = (router: Hono): void => {
  const athleteRepository = new AthleteRepository(new PrismaClient());
  const athleteUpdateService = new AthleteUpdateService(athleteRepository);
  const httpResponse = new HttpResponse();

  const athleteUpdateController = new AthleteUpdateController(
    athleteUpdateService,
    httpResponse
  );

  router.patch('/athletes/:id', async (c) => await athleteUpdateController.run(c));
};
