import { Request, Response, Router, NextFunction } from "express";
import { plainToClass } from 'class-transformer';
import * as glob from "glob";
import * as path from "path";

import HttpResponse from "../../shared/infrastructure/response/HttpResponse";
import { AthleteCreatorDto } from "../dtos/AthleteCreator.dto";
import { validate } from "class-validator";

export function registerRoutes(router: Router): void {
  const normalizedDirname = path.normalize(__dirname).replace(/\\/g, "/");
  const routes = glob.sync(`${normalizedDirname}/**/*.route.*`);
  routes.map((route) => register(route, router));
}

function register(routePath: string, router: Router) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
  const routeModule = require(routePath);
  if (typeof routeModule === "function") {
    routeModule(router);
  } else if (routeModule && typeof routeModule.register === "function") {
    routeModule.register(router);
  } else {
    // eslint-disable-next-line no-console
    console.error(`No register function found in module ${routePath}`);
  }
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