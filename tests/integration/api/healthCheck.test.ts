import axios from 'axios';
import Server from '../../../src/api/ServerHono';

describe('Health Check API', () => {
  let appInstance: Server;

  beforeAll(async () => {
    appInstance = new Server('3001');
    await appInstance.start();
  });

  afterAll(async () => {
    await appInstance.close();
  });

  it('should return the health status', async () => {
    const response = await axios.get('http://localhost:3001/api/v1/health');
    expect(response.status).toBe(200);
    expect(response.data).toMatchObject({
      status: 'healthy',
    });
  }, 10000);
});
