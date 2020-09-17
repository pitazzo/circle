import { CommandHandler, CommandResult, ID, Result } from 'circle-core';
import { ContentService } from 'src/content.service';

export class LikeCommandHandler extends CommandHandler {
  constructor(private contentService: ContentService) {
    super('content.posts.perform_like', 'circle.gateway.1.command.post.like');
  }

  async handle(dto: string): Promise<CommandResult> {
    const postID = ID.create(dto['postID']);
    const likerID = ID.create(dto['likerID']);

    const result = Result.combine([postID, likerID]);
    if (!result.isSuccess) {
      return new CommandResult(false, result.error);
    }

    this.contentService.like(postID.getValue(), likerID.getValue());

    return new CommandResult(true, null);
  }
}
