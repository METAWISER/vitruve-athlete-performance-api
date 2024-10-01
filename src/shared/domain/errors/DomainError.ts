export class DomainError extends Error {
  isDomainError: boolean;

  constructor(message: string) {
    super(message);
    this.name = "DomainError";
    this.isDomainError = true;
    Error.captureStackTrace(this, DomainError);
  }
}