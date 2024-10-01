export class InternalServerError extends Error {
  isInternalServerError: boolean;

  constructor(message: string) {
    super(message);
    this.name = "InternalServerError";
    this.isInternalServerError = true;
    Error.captureStackTrace(this, InternalServerError);
  }
}