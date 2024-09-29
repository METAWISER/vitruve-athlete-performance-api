import "dotenv/config";
import Server from "./ServerHono";
// import Server from "./Server";

export default class App {
  private server?: Server;
  private readonly port = process.env.PORT ?? "3001";

  public async start(): Promise<void> {
    this.server = new Server(this.port);
    await this.server.start();
  }

  /* uncomment if you want to use express server 
    get httpServer(): Server["httpServer"] | undefined {
    return this.server?.getHTTPServer();
  } */

  public async close(): Promise<void> {
    return await this.server?.close();
  }
}