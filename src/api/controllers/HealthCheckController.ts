import { Context } from 'hono';
import IController from './IController';

export class HealthCheckController implements IController{
  async run(c: Context): Promise<Response> {
    return c.json({
      status: 'healthy',
      message: 'The server is running smoothly',
    });
  }
}
