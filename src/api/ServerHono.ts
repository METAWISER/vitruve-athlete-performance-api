import "dotenv/config";
import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { cors } from "hono/cors";
import http from 'http';
import pgConnect from "../shared/infrastructure/persistense/config";
import logger from "../shared/infrastructure/logger/logger";
import { registerRoutes } from "./routes";

class Server {
  private readonly honoApp: Hono;
  private server?: http.Server;

  constructor(private readonly port: string) {
    this.honoApp = new Hono();
    this.dbConnect();
    this.middlewares();
    this.routes();
  }

  private routes() {
    const apiV1 = new Hono();
    registerRoutes(apiV1);
    this.honoApp.route('/api/v1', apiV1);
  }

  private middlewares() {
    this.honoApp.use("*", cors({ origin: "*" },));
    this.honoApp.use("*", async (c, next) => {
      c.res.headers.set("X-Powered-By", "Hono");
      await next();
    });
  }

  private async dbConnect() {
    await pgConnect();
  }

  public async start(): Promise<void> {
    serve({
      fetch: this.honoApp.fetch,
      port: Number(this.port),
    });
    logger.info(`✅ Server is running on port ${this.port}`);
    return new Promise(() => {}); 
  }

  public async close(): Promise<void> {
    if (!this.server) {
      logger.error('❌ Server is not running');
      return;
    }

    return new Promise((resolve, reject) => {
      this.server!.close((err) => {
        if (err) {
          logger.error('❌ Error while closing the server', err);
          reject(err);
          return;
        }

        logger.info('❌ Server is closed');
        resolve();
      });
    });
  }
}

export default Server;
