export class DatabaseError extends Error {
  public readonly isDatabaseError: boolean = true;
  constructor(message: string) {
    super(message);
    this.name = "DatabaseError";
  }
}