export class DomainError extends Error {
  public readonly isDomainError: boolean = true;
  constructor(message: string) {
    super(message);
    this.name = "DomainError";
  }
}