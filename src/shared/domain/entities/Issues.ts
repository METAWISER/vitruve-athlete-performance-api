import { v4 as uuidv4 } from 'uuid';

export class Issue {
  readonly id: string;
  readonly message: string;
  readonly route: string;
  readonly statusCode: number;
  readonly timestamp: Date;

  constructor(message: string, route: string, statusCode: number) {
    this.id = uuidv4(); 
    this.message = message;
    this.route = route;
    this.statusCode = statusCode;
    this.timestamp = new Date(); 
  }

  toPrimitives() {
    return {
      id: this.id,
      message: this.message,
      route: this.route,
      statusCode: this.statusCode,
      timestamp: this.timestamp.toISOString(),
    };
  }
}
