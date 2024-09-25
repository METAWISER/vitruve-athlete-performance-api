export class ValidationError extends Error {
  public readonly isValidationError: boolean = true;
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}