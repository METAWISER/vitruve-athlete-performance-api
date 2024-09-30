import { Context } from 'hono';
import { AthletePostController } from '../../../../src/api/controllers/athletes/AthletePostController';
import { AthleteCreator } from '../../../../src/Athletes/application/index';
import HttpResponse from '../../../../src/shared/infrastructure/response/HttpResponse';

describe('AthletePostController with Hono', () => {
  let athleteCreatorMock: jest.Mocked<AthleteCreator>;
  let httpResponseMock: jest.Mocked<HttpResponse>;
  let controller: AthletePostController;
  let c: Partial<Context>;

  beforeEach(() => {
    athleteCreatorMock = {
      run: jest.fn(),
    } as unknown as jest.Mocked<AthleteCreator>;

    httpResponseMock = {
      Created: jest.fn(),
      Conflict: jest.fn(),
      InternalServerError: jest.fn(),
    } as unknown as jest.Mocked<HttpResponse>;

    controller = new AthletePostController(
      athleteCreatorMock,
      httpResponseMock
    );

    c = {
      req: {
        json: jest.fn().mockResolvedValue({
          name: 'John Doe',
          age: 30,
          email: 'john@vitruve.com',
          team: 'Team A',
          password: 'securepassword',
        }),
      },
      json: jest.fn(),
    } as unknown as Partial<Context>;
  });

  it('should create an athlete successfully', async () => {
    await controller.run(c as Context);

    expect(athleteCreatorMock.run).toHaveBeenCalledWith({
      name: 'John Doe',
      age: 30,
      email: 'john@vitruve.com',
      team: 'Team A',
      password: 'securepassword',
    });
    expect(httpResponseMock.Created).toHaveBeenCalledWith(c, {
      message: 'Athlete created successfully',
    });
  });
});