import { PublishersService } from 'src/publishers.service';
import { EventHandler, ID, Email, Result } from 'circle-core';

export class UserSignedUpHandler extends EventHandler {
  constructor(private publishersService: PublishersService) {
    super(
      'notifications.publishers.register_user_on_signup',
      'circle.users.1.event.user.user_signed_up',
    );
  }

  async handle(dto: string): Promise<void> {
    const userID = ID.create(dto['userID']);
    const email = Email.create(dto['email']);

    const result = Result.combine([userID, email]);
    if (result.isSuccess) {
      this.publishersService.registerUser(userID.getValue(), email.getValue());
    }
  }
}
