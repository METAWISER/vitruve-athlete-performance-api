import { Request, Response, Router, NextFunction } from "express";
import { plainToClass } from 'class-transformer';
import * as glob from "glob";
import * as path from "path";

import HttpResponse from "../../shared/infrastructure/response/HttpResponse";
import { AthleteCreatorDto } from "../dtos/AthleteCreator.dto";
import { validate } from "class-validator";
import { Hono } from "hono";

type TRouter = Router | Hono;

export function registerRoutes(router: TRouter): void {
  const normalizedDirname = path.normalize(__dirname).replace(/\\/g, "/");
  const routes = glob.sync(`${normalizedDirname}/**/*.route.*`);

  routes.forEach((route) => register(route, router));
}

function register(routePath: string, router: TRouter): void {
  const routeModule = require(routePath);

  if (typeof routeModule === "function") {
    routeModule(router);
  } else if (routeModule && typeof routeModule.register === "function") {
    if (isExpressRouter(router)) {
      routeModule.register(router);
    } else if (isHonoRouter(router)) {
      routeModule.register(router);
    }
  } else {
    console.error(`No register function found in module ${routePath}`);
  }
}

function isExpressRouter(router: TRouter): router is Router {
  return typeof (router as Router).use === 'function';
}

function isHonoRouter(router: TRouter): router is Hono {
  return typeof (router as Hono).route === 'function';
}

// eslint-disable-next-line @typescript-eslint/ban-types
export async function validateReqSchema(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  const dto = plainToClass(AthleteCreatorDto, req.body);

  if (!dto) {
    return new HttpResponse().UnprocessableEntity(res, {
      status: 422,
      msg: "Invalid request body",
    });
  }

  const errors = await validate(dto);

  if (errors.length > 0) {
    const validationErrors = errors.map(err => ({
      property: err.property,
      constraints: err.constraints,
    }));

    return new HttpResponse().UnprocessableEntity(res, {
      status: 422,
      msg: "Validation failed",
      errors: validationErrors
    });
  }

  next();
}