import Server from "./Server";

export default class App {
  private server?: Server;
  private readonly port = process.env.PORT ?? "3001";

  public async start(): Promise<void> {
    this.server = new Server(this.port);
    await this.server.start();
  }

  get httpServer(): Server["httpServer"] | undefined {
    return this.server?.getHTTPServer();
  }

  public async close(): Promise<void> {
    return await this.server?.close();
  }
}