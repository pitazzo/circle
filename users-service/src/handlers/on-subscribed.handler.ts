import { EventHandler, ID, Result } from 'circle-core';
import { UsersService } from 'src/users.service';

export class UserSubscribedHandler extends EventHandler {
  constructor(private usersService: UsersService) {
    super(
      'users.user.increment_on_subscription',
      'circle.notifications.1.event.subscription.user_subscribed',
    );
  }

  async handle(dto: string): Promise<void> {
    const authorID = ID.create(dto['authorID']);

    if (authorID.isSuccess) {
      this.usersService.incrementOnSubscriberAdded(authorID.getValue());
    }
  }
}
