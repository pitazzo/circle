import { Event } from "../../application/events/event";

export class PostPublishedEvent extends Event {
  constructor(authorID: string, postID: string, title: string, body: string) {
    super(
      "circle.content.1.event.post.post_published",
      {
        authorID: authorID,
        postID: postID,
        title: title,
        body: body,
      },
      {}
    );
  }
}
