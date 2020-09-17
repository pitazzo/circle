export class QueryResult {
  accepted!: boolean;
  failureReason?: string;
  dto?: Record<string, any>;

  constructor(
    accepted: boolean,
    failureReason: string | undefined,
    dto: Record<string, any>
  ) {
    this.accepted = accepted;
    this.failureReason = failureReason;
    this.dto = dto;
  }

  isAccepted(): boolean {
    return this.accepted;
  }

  getFailureReason(): string | undefined {
    return this.failureReason;
  }

  getDTO(): Record<string, any> | undefined {
    return this.dto;
  }
}
