import axios from 'axios';
import App from '../../../src/api/App';

describe('GET /api/v1/athletes', () => {
  let appInstance: App;
  let baseURL: string;

  beforeAll(async () => {
    appInstance = new App();
    await appInstance.start();
    baseURL = `http://localhost:3001/api/v1`;
  });

  afterAll(async () => {
    await appInstance.close();
  });

  it('should return a list of athletes', async () => {
    const response = await axios.get(`${baseURL}/athletes`);
    expect(response.status).toBe(200);
    expect(response.data).toMatchObject({
      status: 200,
      msg: "Success",
      data: {
        athletes: expect.any(Array),
      },
    });
  }, 10000);
});
