export class CommandResult {
  accepted!: boolean;
  failureReason?: string;

  constructor(accepted: boolean, failureReason: string | undefined) {
    this.accepted = accepted;
    this.failureReason = failureReason;
  }

  isAccepted(): boolean {
    return this.accepted;
  }

  getFailureReason(): string | undefined {
    return this.failureReason;
  }
}
