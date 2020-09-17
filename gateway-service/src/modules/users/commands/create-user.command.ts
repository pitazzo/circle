import { Command } from "circle-core";

class SignUpUserCommand extends Command {
  constructor(username: string, email: string) {
    super(
      "circle.gateway.1.command.user.signedup",
      {
        username: username,
        email: email,
      },
      {}
    );
  }
}

export default SignUpUserCommand;
