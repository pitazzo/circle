import { Injectable } from '@nestjs/common';
import {
  ID,
  Result,
  AMQPService,
  Title,
  Body,
  PostPublishedEvent,
  PostLikedEvent,
} from 'circle-core';
import { Post } from './shared/domain/post.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
    private amqpService: AMQPService,
  ) {}

  public async getPostsByAuthor(authorID: ID): Promise<Result<Post[]>> {
    const result = await this.postsRepository.find({ authorID: authorID });
    return Result.ok<Post[]>(result);
  }
  public async publish(title: Title, body: Body, authorID: ID): Promise<void> {
    const newPost = Post.create(title, body, authorID);
    this.postsRepository.save(newPost).then(post => {
      this.amqpService.publishEvent(
        new PostPublishedEvent(
          authorID.value,
          post.id,
          post.title.value,
          post.body.value,
        ),
      );
    });
  }
  public async like(postID: ID, likerID: ID): Promise<void> {
    const post = await this.postsRepository.findOne({ id: postID.value });
    if (post) {
      let likers = post.likers;
      const likes = likers.value.length;
      likers.addIDIfAbsent(likerID);
      if (likers.value.length > likes) {
        this.postsRepository
          .update({ id: postID.value }, { likers: likers })
          .then(_ => {
            this.amqpService.publishEvent(
              new PostLikedEvent(post.authorID.value, likerID.value, post.id),
            );
          });
      }
    }
  }
  public async getRecent(limit: number): Promise<Result<Post[]>> {
    const result = await this.postsRepository
      .createQueryBuilder()
      .orderBy('"publishDate"', 'DESC')
      .limit(limit)
      .getMany();
    return Result.ok<Post[]>(result);
  }

  public async getPopular(limit: number): Promise<Result<Post[]>> {
    const result = await this.postsRepository
      .createQueryBuilder()
      .orderBy('cardinality(likers_value)', 'DESC')
      .limit(limit)
      .getMany();
    return Result.ok<Post[]>(result);
  }
}
