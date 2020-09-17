import { PublishersService } from 'src/publishers.service';
import { EventHandler, ID, Email, Result, Title, Body } from 'circle-core';

export class PostPublishedHandler extends EventHandler {
  constructor(private publishersService: PublishersService) {
    super(
      'notifications.publishers.notify_on_post_published',
      'circle.content.1.event.post.post_published',
    );
  }

  async handle(dto: string): Promise<void> {
    const authorID = ID.create(dto['authorID']);
    const title = Title.create(dto['title']);
    const body = Body.create(dto['body']);

    const result = Result.combine([authorID, title, body]);
    if (result.isSuccess) {
      this.publishersService.notifityPublish(
        authorID.getValue(),
        title.getValue(),
        body.getValue(),
      );
    }
  }
}
