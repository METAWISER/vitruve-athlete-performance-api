// src/shared/domain/entities/Issue.ts
import { v4 as uuidv4 } from 'uuid';

export class Issue {
  readonly id: string;
  readonly message: string;
  readonly timestamp: Date;

  constructor(message: string) {
    this.id = uuidv4();
    this.message = message;
    this.timestamp = new Date();
  }

  toPrimitives() {
    return {
      id: this.id,
      message: this.message,
      timestamp: this.timestamp.toISOString(),
    };
  }
}
