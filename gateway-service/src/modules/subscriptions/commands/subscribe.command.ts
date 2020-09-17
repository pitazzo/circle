import { Command } from 'circle-core';

class SubscribeCommand extends Command {
  constructor(subscriberID: string, publisherID: string) {
    super(
      'circle.gateway.1.command.subscription.add',
      {
        subscriberID: subscriberID,
        publisherID: publisherID,
      },
      {},
    );
  }
}

export default SubscribeCommand;
