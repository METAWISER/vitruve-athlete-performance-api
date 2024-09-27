import { Router, Request, Response } from "express";
import { AuthController } from "../../controllers/athletes/AuthController";
import HttpResponse from "../../../shared/infrastructure/response/HttpResponse";
import { AuthService } from "../../../Athletes/application/AuthService";
import { AthleteGetterByEmail } from "../../../Athletes/application/AthleteGetterByEmail";
import { AthleteRepository } from "../../../Athletes/infrastructure/AthleteRepository";
import { AthleteInstance } from "../../../Athletes/infrastructure/AthleteInstance";

export const register = (router: Router): void => {
  const jwtSecret = process.env.JWT_SECRET ?? "";
  const authService = new AuthService(jwtSecret);
  const athleteRepository = new AthleteRepository(AthleteInstance); 
  const athleteGetterByEmail = new AthleteGetterByEmail(athleteRepository);
  const httpResponse = new HttpResponse();
  const authController = new AuthController(authService, athleteGetterByEmail, httpResponse);

  router.post("/login", async (req: Request, res: Response) => {
    await authController.login(req, res);
  });
};
