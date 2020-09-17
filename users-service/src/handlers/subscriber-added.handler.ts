import { EventHandler, Result, ID } from 'circle-core';
import { UsersService } from 'src/users.service';
export class SubscriberAddedEventHandler extends EventHandler {
  constructor(private userService: UsersService) {
    super(
      'users.user.increment_subs_on_subscriber_added',
      'circle.content.1.event.subscribers.subscriber_added',
    );
  }

  async handle(attributes: any): Promise<void> {
    const authorID = ID.create(attributes['authorID']);

    if (authorID.isSuccess) {
      this.userService
    }
  }
}
