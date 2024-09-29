import "dotenv/config";
import { Hono } from "hono";
import { PrismaClient } from "@prisma/client";
import { AuthenticateController } from "../../controllers/athletes/AuthenticateController";
import HttpResponse from "../../../shared/infrastructure/response/HttpResponse";
import { AuthService } from "../../../Athletes/application/AuthService";
import { AthleteGetterByEmail } from "../../../Athletes/application/AthleteGetterByEmail";
import { AthleteRepository } from "../../../Athletes/infrastructure/AthleteRepository";

export const register = (router: Hono): void => {
  const jwtSecret = process.env.JWT_SECRET ?? "";
  const authService = new AuthService(jwtSecret);
  const athleteRepository = new AthleteRepository(new PrismaClient());
  const athleteGetterByEmail = new AthleteGetterByEmail(athleteRepository);
  const httpResponse = new HttpResponse();
  const authController = new AuthenticateController(
    authService,
    athleteGetterByEmail,
    httpResponse
  );

  router.post("/login", async (c) => {
    return await authController.login(c);
  });
};
