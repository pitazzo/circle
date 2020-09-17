import { CommandResult } from "./command-result";
import { Handler } from "../handler";

export abstract class CommandHandler implements Handler {
  private queueName: string;
  private eventName: string;

  constructor(queueName: string, eventName: string) {
    this.queueName = queueName;
    this.eventName = eventName;
  }

  getQueueName(): string {
    return this.queueName;
  }

  getEventName(): string {
    return this.eventName;
  }

  abstract async handle(dto: string): Promise<CommandResult>;
}
