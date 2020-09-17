import { Event } from "../../application/events/event";

export class UserSignedUpEvent extends Event {
  constructor(userID: string, username: string, email: string) {
    super(
      'circle.users.1.event.user.user_signed_up',
      {
        userID: userID,
        username: username,
        email: email,
      },
      {},
    );
  }
}
