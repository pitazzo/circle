import { CommandHandler, CommandResult, ID, Result } from 'circle-core';
import { PublishersService } from 'src/publishers.service';

export class SubscribeCommandHandler extends CommandHandler {
  constructor(private PublishersService: PublishersService) {
    super(
      'notifications.publishers.register_subscription_on_add',
      'circle.gateway.1.command.subscription.add',
    );
  }

  async handle(dto: string): Promise<CommandResult> {
    const publisherID = ID.create(dto['publisherID']);
    const subscriberID = ID.create(dto['subscriberID']);

    const result = Result.combine([publisherID, subscriberID]);
    if (!result.isSuccess) {
      return new CommandResult(false, result.error);
    }

    this.PublishersService.susbcribe(
      subscriberID.getValue(),
      publisherID.getValue(),
    );

    return new CommandResult(true, null);
  }
}
