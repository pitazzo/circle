import { PublishersService } from 'src/publishers.service';
import { EventHandler, ID, Email, Result } from 'circle-core';

export class UserEditedHandler extends EventHandler {
  constructor(private publishersService: PublishersService) {
    super(
      'notifications.publishers.update_user_on_edited',
      'circle.users.1.event.user.user_edited',
    );
  }

  async handle(dto: string): Promise<void> {
    const userID = ID.create(dto['userID']);
    const email = Email.create(dto['email']);

    const result = Result.combine([userID, email]);
    if (result.isSuccess) {
      this.publishersService.updateUser(userID.getValue(), email.getValue());
    }
  }
}
