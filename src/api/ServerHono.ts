import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { cors } from "hono/cors";
import pgConnect from "../shared/infrastructure/persistense/config";
import logger from "../shared/infrastructure/logger/logger";
import { registerRoutes } from "./routes";

class Server {
  private readonly honoApp: Hono;

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
  }

  public async close(): Promise<void> {
    process.on("uncaughtException", () => {
      process.exit(1);
    });
    logger.info("Server is closing...");
  }
}

export default Server;
