import { CommandHandler } from "../../application/commands/command-handler";
import { QueryHandler } from "../../application/queries/query-handler";
import { EventHandler } from "../../application/events/event-handler";
import { Event } from "../../application/events/event";
import { Channel, connect } from "amqplib";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AMQPService {
  private isInitialized = false;
  private channel: Channel;

  public async init(): Promise<void> {
    const connection = await connect("RABBITMQ_URL");
    this.channel = await connection.createChannel();
    await this.channel.assertExchange("gateway", "topic");
    if (!!process.env.SERVICE_NAME) {
      await this.channel.assertExchange(process.env.SERVICE_NAME, "topic");
    }
    await this.channel.prefetch(1);
    this.isInitialized = true;
  }

  public async publishEvent(event: Event): Promise<void> {
    if (!this.isInitialized) {
      await this.init();
    }
    this.channel.publish(
      process.env.SERVICE_NAME,
      event.getId(),
      Buffer.from(JSON.stringify(event))
    );
  }

  public async registerHandler(
    handler: CommandHandler | QueryHandler | EventHandler,
    exchangeName: string = process.env.EXCHANGE_GATEWAY_NAME || "gateway"
  ): Promise<void> {
    if (!this.isInitialized) {
      await this.init();
    }
    await this.channel.assertExchange(exchangeName, "topic");
    await this.channel.assertQueue(handler.getQueueName());
    await this.channel.bindQueue(
      handler.getQueueName(),
      exchangeName,
      handler.getEventName()
    );
    await this.channel.consume(handler.getQueueName(), async (msg) => {
      const result = await handler.handle(
        JSON.parse(msg.content.toString())["attributes"]
      );
      // Answer with operation result if request is not and event
      if (result) {
        this.channel.sendToQueue(
          msg.properties.replyTo,
          Buffer.from(JSON.stringify(result)),
          {
            correlationId: msg.properties.correlationId,
          }
        );
      }
      this.channel.ack(msg);
    });
  }
}
