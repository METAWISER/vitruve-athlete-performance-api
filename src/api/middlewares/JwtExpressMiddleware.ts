import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import HttpResponse from "../../shared/infrastructure/response/HttpResponse";

interface AuthenticatedRequest extends Request {
  user?: { id: string };
}

export function validateJWT(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): void {
  const httpResponse = new HttpResponse();
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    httpResponse.Unauthorized(res, { error: "Token is missing or invalid" });
    return;
  }

  const token = authHeader.split(" ")[1];
  
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET ?? "",
    ) as jwt.JwtPayload;

    req.user = { id: decoded.id }; // Añadir el ID del usuario al request
    next();
  } catch (error) {
    httpResponse.Unauthorized(res, { error: "Invalid or expired token" });
    return;
  }
}