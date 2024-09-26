import { Response } from 'express';
import HttpResponse from '../../../../src/shared/infrastructure/response/HttpResponse';

describe('HttpResponse', () => {
  let res: Partial<Response>;

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  it('should return a 200 OK response', () => {
    const httpResponse = new HttpResponse();
    httpResponse.Ok(res as Response, { message: 'Success' });

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: 200,
      msg: 'Success',
      data: { message: 'Success' },
    });
  });
});
