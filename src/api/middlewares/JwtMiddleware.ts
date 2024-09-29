import "dotenv/config";
import { Context } from 'hono';
import jwt from 'jsonwebtoken';
import HttpResponse from '../../shared/infrastructure/response/HttpResponse';

export async function validateJWT(c: Context, next: () => Promise<void>): Promise<Response | undefined> {
  const httpResponse = new HttpResponse();
  const authHeader = c.req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return httpResponse.Unauthorized(c, { error: "Token is missing or invalid" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET ?? "",
    ) as jwt.JwtPayload;

    c.set("user", { id: decoded.id });

    await next();
  } catch (error) {
    return httpResponse.Unauthorized(c, { error: "Invalid or expired token" });
  }
}
