import { Hono } from 'hono';
import { HealthCheckController } from "../controllers/HealthCheckController";

export const register = (app: Hono): void => {
  const healthCheckController = new HealthCheckController();

  app.get('/health', async (c) => {
    return await healthCheckController.run(c);
  });
};
