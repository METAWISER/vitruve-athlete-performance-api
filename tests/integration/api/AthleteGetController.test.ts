import axios from 'axios';
import App from '../../../src/api/App';

//TODO: Implement the test creating a test Athlete and then fetching it
describe.skip('GET /api/v1/athletes', () => {
  let appInstance: App;
  let baseURL: string;
  let token: string;

  beforeAll(async () => {
    appInstance = new App();
    baseURL = `http://localhost:3001/api/v1`;

    const [_, loginResponse] = await Promise.all([
      appInstance.start(),
      axios.post(`${baseURL}/login`, {
        email: 'email@email.com',
        password: 'Password',
      })
    ]);

    token = loginResponse.data.token; 
  }, 20000); 

  afterAll(async () => {
    await appInstance.close();
  });

  it('should return a list of athletes', async () => {
    const response = await axios.get(`${baseURL}/athletes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
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
