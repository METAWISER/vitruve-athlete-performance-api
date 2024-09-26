import { Request, Response } from "express";
import IController from "./IController";

export class HealthCheckController implements IController{
  public run(req: Request, res: Response): void {
    res.status(200).json({
      status: "ok",
      uptime: process.uptime(),
      timestamp: new Date(),
    });
  }
}