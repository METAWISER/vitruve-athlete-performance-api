
import { IssueInstance } from "../persistense/postgres/models/IssueInstance";
import { Issue } from '../../domain/entities/Issues';

export class IssueService {
  public static async logIssue(issue: Issue): Promise<void> {
    try {
      await IssueInstance.create(issue.toPrimitives()); 
    } catch (error) {
      console.error("Error logging issue to database: ", error);
    }
  }
}
