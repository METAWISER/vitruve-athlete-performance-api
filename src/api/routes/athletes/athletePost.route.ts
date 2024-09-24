import { Router, Request, Response } from "express";
import { body, checkExact } from "express-validator";
import { validateReqSchema } from "..";

import { AthleteInstance } from "../../../Athletes/infrastructure/AthleteInstance";
import HttpResponse from "../../../shared/infrastructure/response/HttpResponse";
import { AthleteCreator } from "../../../Athletes/application/AthleteCreator";
import { AthleteRepository } from "../../../Athletes/infrastructure/AthleteRepository";
import { AthletePostController } from "../../controllers/athletes/AthletePostController";

export const register = (router: Router): void => {
  // field validation here
  const reqValues = [
    body("name").exists().isString(),
    body("age").exists().isNumeric(),
    body("email").isEmail().isString(),
    body("team").exists().isString(),
  ];

  const athleteRepository = new AthleteRepository(AthleteInstance);
  const athleteCreator = new AthleteCreator(athleteRepository);
  const httpResponse = new HttpResponse();
  const athletePostController = new AthletePostController(athleteCreator, httpResponse);

  router.post(
    "/athletes",
    checkExact(reqValues),
    validateReqSchema,
    async (req: Request, res: Response) => await athletePostController.run(req, res),
  );
};
