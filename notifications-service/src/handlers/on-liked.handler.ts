import { PublishersService } from 'src/publishers.service';
import { EventHandler, ID, Result } from 'circle-core';

export class PostLikedHandler extends EventHandler {
  constructor(private publishersService: PublishersService) {
    super(
      'notifications.publishers.notify_on_post_liked',
      'circle.content.1.event.post.post_liked',
    );
  }

  async handle(dto: string): Promise<void> {
    const authorID = ID.create(dto['authorID']);
    const likerID = ID.create(dto['likerID']);
    const postID = ID.create(dto['postID']);

    const result = Result.combine([authorID, likerID, postID]);
    if (result.isSuccess) {
      this.publishersService.notifityLike(
        authorID.getValue(),
        likerID.getValue(),
        postID.getValue(),
      );
    }
  }
}
