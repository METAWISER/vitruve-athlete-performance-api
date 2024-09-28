import { Context } from 'hono';

export class HealthCheckController {
  async run(c: Context): Promise<Response> {
    return c.json({
      status: 'healthy',
      message: 'The server is running smoothly',
    });
  }
}
