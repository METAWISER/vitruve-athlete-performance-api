export class ValidationError extends Error {
  isValidationError: boolean;

  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
    this.isValidationError = true;
    Error.captureStackTrace(this, ValidationError);
  }
}