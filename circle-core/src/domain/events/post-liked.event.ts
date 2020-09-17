import { Event } from "../../application/events/event";

export class PostLikedEvent extends Event {
  constructor(authorID: string, likerID: string, postID: string) {
    super(
      'circle.content.1.event.post.post_liked',
      {
        authorID: authorID,
        likerID: likerID,
        postID: postID
      },
      {},
    );
  }
}
