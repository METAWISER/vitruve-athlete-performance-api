import { IssueLevel } from "../value-objects/IssueLevel";
import { Uuid } from "../value-objects/Uuid";


export class Issue {
  readonly level: IssueLevel;
  readonly message: string;
  readonly route: string;
  readonly statusCode: number;
  readonly timestamp: Date;

  constructor(readonly id: Uuid, level:IssueLevel, message: string, route: string, statusCode: number) {
    this.level = level;
    this.message = message;
    this.route = route;
    this.statusCode = statusCode;
    this.timestamp = new Date(); 
  }

  toPrimitives() {
    return {
      id: this.id.toString(),
      level: this.level,
      message: this.message,
      route: this.route,
      statusCode: this.statusCode,
      timestamp: this.timestamp.toISOString(),
    };
  }

  static fromPrimitives(plainData: {
    level: IssueLevel;
    id: string;
    message: string;
    route: string;
    statusCode: number;
    timestamp: string;
  }): Issue {
    return new Issue(
      new Uuid(plainData.id),
      plainData.level,
      plainData.message,
      plainData.route,
      plainData.statusCode
    );
  }
}
