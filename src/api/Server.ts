import express, { Application, Request, Response, Router } from "express";
import cors from "cors";
import http from "http";
import morgan from "morgan";
import HttpResponse from "../shared/infrastructure/response/HttpResponse";
import { registerRoutes } from "./routes";
import pgConnect from "../shared/infrastructure/persistense/config";
import logger from "../shared/infrastructure/logger/logger";
class Server {
  private readonly express: Application;
  private httpServer?: http.Server;

  constructor(private readonly port: string) {
    this.express = express();
    this.dbConnect();
    this.middlewares();
    const router = Router();
    this.express.use(router);
    registerRoutes(router);
    router.use((err: Error, req: Request, res: Response) => {
      new HttpResponse().InternalServerError(res, "Contact admin");
    });
  }

  private middlewares() {
    this.express.use(cors());
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: true }));
    this.express.use(morgan("dev"));
  }

  private async dbConnect() {
    await pgConnect();
  }

  public async start(): Promise<void> {
    await new Promise<void>((resolve) => {
      this.httpServer = this.express.listen(this.port, () => {
        logger.info(`✅ Server running at http://localhost:${this.port}`);
        resolve();
      });
    });
  }

  public getHTTPServer(): Server["httpServer"] | undefined {
    return this.httpServer;
  }

  public async close(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (this.httpServer) {
        this.httpServer.close((err) => {
          if (err) reject(err);
          resolve();
        });
      }
    });
  }
}

export default Server;
