import { PublishersService } from 'src/publishers.service';
import { EventHandler, ID, Result } from 'circle-core';

export class UserSubscribedHandler extends EventHandler {
  constructor(private publishersService: PublishersService) {
    super(
      'notifications.publishers.notify_on_subscription',
      'circle.notifications.1.event.subscription.user_subscribed',
    );
  }

  async handle(dto: string): Promise<void> {
    const subscriberID = ID.create(dto['subscriberID']);
    const authorID = ID.create(dto['authorID']);

    const result = Result.combine([subscriberID, authorID]);
    if (result.isSuccess) {
      this.publishersService.notifitySubscription(authorID.getValue(), subscriberID.getValue())
    }
  }
}
