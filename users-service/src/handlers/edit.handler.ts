import { CommandHandler, CommandResult, Result, Email } from 'circle-core';
import { Username } from 'src/shared/domain/value-objects/username';
import { UsersService } from 'src/users.service';

export class EditUserCommandHandler extends CommandHandler {
  constructor(private userService: UsersService) {
    super(
      'users.user.update_user_on_edit',
      'circle.gateway.1.command.user.edited',
    );
  }

  async handle(attributes: any): Promise<CommandResult> {
    const username = Username.create(attributes['username']);
    const email = Email.create(attributes['email']);
    const props = Result.combine([username, email]);

    if (!props.isSuccess) {
      return new CommandResult(false, props.error);
    }
    this.userService.edit(
      username.getValue(),
      email.getValue(),
    );
    return new CommandResult(true, null);
  }
}
