export class ConflictError extends Error {
  isConflictError: boolean;

  constructor(message: string) {
    super(message);
    this.name = "ConflictError";
    this.isConflictError = true;
    Error.captureStackTrace(this, ConflictError);
  }
}