import { Command } from 'circle-core';
class PublishPostCommand extends Command {
  constructor(title: string, body: string, authorID: string) {
    super(
      'circle.gateway.1.command.post.published',
      {
        title: title,
        body: body,
        authorID: authorID,
      },
      {},
    );
  }
}

export default PublishPostCommand;
