
import { Context } from "hono";
import IController from "./IController";

export class HealthCheckController implements IController{
  public run(c: Context): void {
    c.json({
      status: "ok",
      uptime: process.uptime(),
      timestamp: new Date(),
    });
  }
}
