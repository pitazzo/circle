import { Replies, ConsumeMessage, Channel, connect } from 'amqplib';
import { v4 as uuidv4 } from 'uuid';
import { Stream } from 'stream';
import {
  Command,
  Query,
  Operation,
  CommandResult,
  QueryResult,
} from 'circle-core';
import { Injectable } from '@nestjs/common';

@Injectable()
class OperationBus {
  private channel: Channel;
  private responsesQueue: Replies.AssertQueue;
  private requests: Stream;
  private isInitialized = false;

  private async init(): Promise<void> {
    const connection = await connect('amqps://toyslrjw:Broom0AxWvMWcxaXlIryitiRSU0-wbYd@bonobo.rmq.cloudamqp.com/toyslrjw');
    this.channel = await connection.createChannel();
    await this.channel.assertExchange('gateway', 'topic');
    this.responsesQueue = await this.channel.assertQueue('', {
      exclusive: true,
    });
    this.requests = new Stream();
    this.channel.consume(
      this.responsesQueue.queue,
      msg => {
        this.requests.emit(
          msg?.properties.correlationId,
          msg as ConsumeMessage,
        );
      },
      {
        noAck: true,
      },
    );
    this.isInitialized = true;
  }

  private async handleOperation(operation: Operation): Promise<any> {
    if (!this.isInitialized) {
      await this.init();
    }
    const correlationId: string = uuidv4();
    let promise = new Promise<any>(resolve => {
      this.requests.once(correlationId, msg => {
        resolve(JSON.parse((msg as ConsumeMessage).content.toString()));
      });
    });
    this.channel.publish(
      process.env.EXCHANGE_GATEWAY_NAME || 'gateway',
      operation.getId(),
      Buffer.from(JSON.stringify(operation)),
      {
        correlationId: correlationId,
        replyTo: this.responsesQueue.queue,
      },
    );
    return promise;
  }

  public async dispatch(command: Command): Promise<CommandResult> {
    const promise = this.handleOperation(command);
    return Promise.race([
      promise,
      new Promise<CommandResult>((_, reject) => {
        const timeout = parseInt(process.env.OPERATION_BUS_TIMEOUT || '2000');
        setTimeout(
          () => reject('CommandBus timeout exceeded (' + timeout + ' ms)'),
          timeout,
        );
      }),
    ]);
  }

  public async ask(query: Query): Promise<QueryResult> {
    const promise = this.handleOperation(query);
    return Promise.race([
      promise,
      new Promise<QueryResult>((_, reject) => {
        const timeout = parseInt(process.env.OPERATION_BUS_TIMEOUT || '2000');
        setTimeout(
          () => reject('QueryBus timeout exceeded (' + timeout + ' ms)'),
          timeout,
        );
      }),
    ]);
  }
}

export default OperationBus;
