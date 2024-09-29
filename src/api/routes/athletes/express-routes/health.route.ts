/* // src/api/routes/health.route.ts
import { Request, Response, Router } from "express";
import { HealthCheckController } from "../controllers/HealthController";

export const register = (router: Router): void => {
  const healthCheckController = new HealthCheckController();

  router.get("/health", async (req: Request, res: Response) => await healthCheckController.run(req, res));
};
 */