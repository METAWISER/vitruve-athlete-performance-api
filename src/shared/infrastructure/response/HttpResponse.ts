import { Response as ExpressResponse } from "express";

import { HttpStatus } from "../../domain/HttpStatus";
import { Context as HonoContext } from "hono";

type TContext = ExpressResponse | HonoContext;
class HttpResponse {
  private isHonoContext(res: TContext): res is HonoContext {
    return (res as HonoContext).json !== undefined;
  }

  private isExpressResponse(res: TContext): res is ExpressResponse {
    return (res as ExpressResponse).status !== undefined;
  }

  Ok(res: TContext, data?: unknown): any {
    if (this.isHonoContext(res)) {
      return res.json(
        {
          status: HttpStatus.OK,
          msg: "Success",
          data,
        },
        HttpStatus.OK
      );
    }

    if (this.isExpressResponse(res)) {
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        msg: "Success",
        data,
      });
    }

    throw new Error("Unknown response type");
  }

  Created(res: TContext, data?: unknown): any {
    if (this.isHonoContext(res)) {
      return res.json(
        {
          status: HttpStatus.CREATED,
          msg: "Created",
          data,
        },
        HttpStatus.CREATED
      );
    }

    if (this.isExpressResponse(res)) {
      return res.status(HttpStatus.CREATED).json({
        status: HttpStatus.CREATED,
        msg: "Created",
        data,
      });
    }

    throw new Error("Unknown response type");
  }

  BadRequest(res: TContext, data?: unknown): any {
    if (this.isHonoContext(res)) {
      return res.json(
        {
          status: HttpStatus.BAD_REQUEST,
          msg: "Bad Request",
          data,
        },
        HttpStatus.BAD_REQUEST
      );
    }

    if (this.isExpressResponse(res)) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        status: HttpStatus.BAD_REQUEST,
        msg: "Bad Request",
        data,
      });
    }

    throw new Error("Unknown response type");
  }

  Unauthorized(res: TContext, data?: unknown): any {
    if (this.isHonoContext(res)) {
      return res.json(
        {
          status: HttpStatus.UNAUTHORIZED,
          msg: "Unauthorized",
          data,
        },
        HttpStatus.UNAUTHORIZED
      );
    }

    if (this.isExpressResponse(res)) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        status: HttpStatus.UNAUTHORIZED,
        msg: "Unauthorized",
        data,
      });
    }

    throw new Error("Unknown response type");
  }

  Forbidden(res: TContext, data?: unknown): any {
    if (this.isHonoContext(res)) {
      return res.json(
        {
          status: HttpStatus.FORBIDDEN,
          msg: "Forbidden",
          data,
        },
        HttpStatus.FORBIDDEN
      );
    }

    if (this.isExpressResponse(res)) {
      return res.status(HttpStatus.FORBIDDEN).json({
        status: HttpStatus.FORBIDDEN,
        msg: "Forbidden",
        data,
      });
    }

    throw new Error("Unknown response type");
  }

  NotFound(res: TContext, data?: unknown): any {
    if (this.isHonoContext(res)) {
      return res.json(
        {
          status: HttpStatus.NOT_FOUND,
          msg: "Not Found",
          data,
        },
        HttpStatus.NOT_FOUND
      );
    }

    if (this.isExpressResponse(res)) {
      return res.status(HttpStatus.NOT_FOUND).json({
        status: HttpStatus.NOT_FOUND,
        msg: "Not Found",
        data,
      });
    }

    throw new Error("Unknown response type");
  }

  Conflict(res: TContext, data?: unknown): any {
    if (this.isHonoContext(res)) {
      return res.json(
        {
          status: HttpStatus.CONFLICT,
          msg: "Conflict",
          data,
        },
        HttpStatus.CONFLICT
      );
    }

    if (this.isExpressResponse(res)) {
      return res.status(HttpStatus.CONFLICT).json({
        status: HttpStatus.CONFLICT,
        msg: "Conflict",
        data,
      });
    }

    throw new Error("Unknown response type");
  }

  UnprocessableEntity(res: TContext, data?: unknown): any {
    if (this.isHonoContext(res)) {
      return res.json(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          msg: "Unprocessable Entity",
          data,
        },
        HttpStatus.UNPROCESSABLE_ENTITY
      );
    }

    if (this.isExpressResponse(res)) {
      return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        msg: "Unprocessable Entity",
        data,
      });
    }

    throw new Error("Unknown response type");
  }

  GatewayTimeout(res: TContext, data?: unknown): any {
    if (this.isHonoContext(res)) {
      return res.json(
        {
          status: HttpStatus.GATEWAY_TIMEOUT,
          msg: "Gateway Timeout",
          data,
        },
        HttpStatus.GATEWAY_TIMEOUT
      );
    }

    if (this.isExpressResponse(res)) {
      return res.status(HttpStatus.GATEWAY_TIMEOUT).json({
        status: HttpStatus.GATEWAY_TIMEOUT,
        msg: "Gateway Timeout",
        data,
      });
    }

    throw new Error("Unknown response type");
  }

  TooManyRequests(res: TContext, data?: unknown): any {
    if (this.isHonoContext(res)) {
      return res.json(
        {
          status: HttpStatus.TOO_MANY_REQUESTS,
          msg: "Too Many Requests",
          data,
        },
        HttpStatus.TOO_MANY_REQUESTS
      );
    }

    if (this.isExpressResponse(res)) {
      return res.status(HttpStatus.TOO_MANY_REQUESTS).json({
        status: HttpStatus.TOO_MANY_REQUESTS,
        msg: "Too Many Requests",
        data,
      });
    }

    throw new Error("Unknown response type");
  }

  ServiceUnavailable(res: TContext, data?: unknown): any {
    if (this.isHonoContext(res)) {
      return res.json(
        {
          status: HttpStatus.SERVICE_UNAVAILABLE,
          msg: "Service Unavailable",
          data,
        },
        HttpStatus.SERVICE_UNAVAILABLE
      );
    }

    if (this.isExpressResponse(res)) {
      return res.status(HttpStatus.SERVICE_UNAVAILABLE).json({
        status: HttpStatus.SERVICE_UNAVAILABLE,
        msg: "Service Unavailable",
        data,
      });
    }

    throw new Error("Unknown response type");
  }

  InternalServerError(res: TContext, data?: unknown): any {
    if (this.isHonoContext(res)) {
      return res.json(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          msg: "Internal Server Error",
          data,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

    if (this.isExpressResponse(res)) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: "Internal Server Error",
        data,
      });
    }
    throw new Error("Unknown response type");
  }
}

export default HttpResponse;
