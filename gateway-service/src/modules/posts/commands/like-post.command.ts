import { Command } from 'circle-core';

class LikePostCommand extends Command {
  constructor(postID: string, likerID: string) {
    super(
      'circle.gateway.1.command.post.like',
      {
        postID: postID,
        likerID: likerID,
      },
      {},
    );
  }
}

export default LikePostCommand;
