import { CommandHandler, CommandResult, ID, Result, Title, Body } from 'circle-core';
import { ContentService } from 'src/content.service';

export class PublishCommandHandler extends CommandHandler {
  constructor(private contentService: ContentService) {
    super(
      'content.posts.store_post_on_publish',
      'circle.gateway.1.command.post.published',
    );
  }

  async handle(dto: string): Promise<CommandResult> {
    const title = Title.create(dto['title']);
    const body = Body.create(dto['body']);
    const authorID = ID.create(dto['authorID']);

    const result = Result.combine([title, body, authorID]);
    if (!result.isSuccess) {
      return new CommandResult(false, result.error);
    }

    this.contentService.publish(
      title.getValue(),
      body.getValue(),
      authorID.getValue(),
    );

    return new CommandResult(true, null);
  }
}
