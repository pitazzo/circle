import { Event } from "../../application/events/event";

export class UserEditedEvent extends Event {
  constructor(userID: string, username: string, email: string) {
    super(
      "circle.users.1.event.user.user_edited",
      {
        userID: userID,
        username: username,
        email: email,
      },
      {}
    );
  }
}
