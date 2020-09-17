import { EventHandler, Result, ID } from 'circle-core';
import { UsersService } from 'src/users.service';
export class PostPublishedEventHandler extends EventHandler {
  constructor(private userService: UsersService) {
    super(
      'users.user.link_author_on_published',
      'circle.content.1.event.post.post_published',
    );
  }

  async handle(attributes: any): Promise<void> {
    const authorID = ID.create(attributes['authorID']);
    const postID = ID.create(attributes['postID']);
    const props = Result.combine([authorID, postID]);
    if (props.isSuccess) {
      this.userService.updateOnPostPublished(
        authorID.getValue(),
        postID.getValue(),
      );
    }
  }
}
