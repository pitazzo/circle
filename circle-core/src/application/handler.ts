export abstract class Handler {
  abstract getQueueName(): string;
  abstract getEventName(): string;
}
