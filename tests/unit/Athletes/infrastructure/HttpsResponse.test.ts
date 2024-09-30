import { Context } from "hono";
import HttpResponse from "../../../../src/shared/infrastructure/response/HttpResponse";
import { HttpStatus } from "../../../../src/shared/domain/HttpStatus";

describe("HttpResponse", () => {
  let c: Partial<Context>;

  beforeEach(() => {
    c = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  it("should return a 200 OK response with Hono context", () => {
    const httpResponse = new HttpResponse();
    httpResponse.Ok(c as Context, { message: "Success" });

    expect(c.json).toHaveBeenCalledWith(
      {
        status: HttpStatus.OK,
        msg: "Success",
        data: { message: "Success" },
      },
      HttpStatus.OK
    );
  });
});
