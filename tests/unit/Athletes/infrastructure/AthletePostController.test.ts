import { Request, Response, NextFunction } from 'express';
import { AthletePostController } from '../../../../src/api/controllers/athletes/AthletePostController';
import { AthleteCreator } from '../../../../src/Athletes/application/index';
import HttpResponse from '../../../../src/shared/infrastructure/response/HttpResponse';
import { ErrorHandler } from '../../../../src/shared/infrastructure/error/ErrorHandler';
import { AthleteCreatorDto } from '../../../../src/api/dtos/AthleteCreator.dto';

describe('AthletePostController', () => {
  let athleteCreatorMock: jest.Mocked<AthleteCreator>;
  let httpResponseMock: jest.Mocked<HttpResponse>;
  let errorHandlerMock: jest.Mocked<ErrorHandler>;
  let controller: AthletePostController;
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    athleteCreatorMock = {
      run: jest.fn(),
    } as unknown as jest.Mocked<AthleteCreator>;

    httpResponseMock = {
      Created: jest.fn(),
    } as unknown as jest.Mocked<HttpResponse>;

    errorHandlerMock = {
      handleError: jest.fn(),
    } as unknown as jest.Mocked<ErrorHandler>;

    controller = new AthletePostController(
      athleteCreatorMock,
      httpResponseMock,
      errorHandlerMock
    );

    req = {
      body: {
        name: 'John Doe',
        age: 30,
        email: 'john@example.com',
        team: 'Team A',
      } as AthleteCreatorDto,
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    next = jest.fn();
  });

  it('should create an athlete successfully', async () => {
    await controller.run(req as Request, res as Response, next);


    expect(athleteCreatorMock.run).toHaveBeenCalledWith(req.body);
    expect(httpResponseMock.Created).toHaveBeenCalledWith(res, {
      message: 'Athlete created successfully',
    });
    expect(errorHandlerMock.handleError).not.toHaveBeenCalled();
  });

  it('should handle errors when athlete creation fails', async () => {
    const error = new Error('Some error');
    athleteCreatorMock.run.mockRejectedValueOnce(error);

    await controller.run(req as Request, res as Response, next);
    expect(errorHandlerMock.handleError).toHaveBeenCalledWith(
      error,
      req,
      res,
      next
    );
    expect(httpResponseMock.Created).not.toHaveBeenCalled();
  });
});
