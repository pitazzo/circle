import { Event } from "../../application/events/event";

export class UserSubscribedEvent extends Event {
  constructor(authorID: string, subscriberID: string) {
    super(
      'circle.notifications.1.event.subscription.user_subscribed',
      {
        authorID: authorID,
        subscriberID: subscriberID,
      },
      {},
    );
  }
}
