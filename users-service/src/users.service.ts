import { Injectable } from '@nestjs/common';
import { Username } from 'src/shared/domain/value-objects/username';
import { Result } from 'circle-core/dist/infraestructure/result';
import { User } from 'src/shared/domain/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  Email,
  AMQPService,
  UserSignedUpEvent,
  ID,
  UserEditedEvent,
} from 'circle-core';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private amqpService: AMQPService,
  ) {}

  public async findAll(): Promise<Result<User[]>> {
    const users = await this.usersRepository.find();
    return Result.ok<User[]>(users);
  }

  public async find(username: Username): Promise<Result<User>> {
    const result = await this.usersRepository.findOne({
      username: { _value: username.value },
    });
    if (result) {
      return Result.ok<User>(result);
    }
    return Result.fail<User>('Unknown user ' + username.value);
  }

  public async findAuthor(postID: ID): Promise<Result<User>> {
    const result = await this.usersRepository
      .createQueryBuilder()
      .where('(:id) = ANY("postsID_value")', { id: postID.value })
      .getOne();

    if (result) {
      return Result.ok<User>(result);
    }
    return Result.fail<User>('Unknown author');
  }

  public async getMostPopular(limit: number): Promise<Result<User[]>> {
    const users = await this.usersRepository
      .createQueryBuilder()
      .orderBy('"subscribersAmount"', 'DESC')
      .limit(limit)
      .getMany();
    return Result.ok<User[]>(users);
  }

  public async getMostProlific(limit: number): Promise<Result<User[]>> {
    const users = await this.usersRepository
      .createQueryBuilder()
      .orderBy('"postsAmount"', 'DESC')
      .limit(limit)
      .getMany();
    return Result.ok<User[]>(users);
  }

  public async updateOnPostPublished(authorID: ID, postID: ID): Promise<void> {
    const author = await this.usersRepository.findOne(authorID.value);
    if (author) {
      author.addPost(postID);
      this.usersRepository.save(author);
    } else {
      console.error('Unknown author ' + authorID.value);
    }
  }

  public async incrementOnSubscriberAdded(authorID: ID): Promise<void> {
    const author = await this.usersRepository.findOne(authorID.value);
    if (author) {
      author.addSubscriber();
      this.usersRepository.save(author);
    } else {
      console.error('Unknown author ' + authorID.value);
    }
  }

  public async edit(
    username: Username,
    newEmail: Email,
  ): Promise<void> {
    const user = await this.usersRepository.findOne({ username: username });
    if (user) {
      user.updateEmail(newEmail);
      this.usersRepository.save(user).then(user => {
        this.amqpService.publishEvent(
          new UserEditedEvent(
            user.getID().value,
            user.username.value,
            user.email.value,
          ),
        );
      });
    }
  }

  public async signUp(username: Username, email: Email): Promise<void> {
    const newUser = User.create(username, email);
    if (newUser.isSuccess) {
      const sameUsername = await this.usersRepository.count({
        username: username,
      });
      const sameEmail = await this.usersRepository.count({ email: email });
      if (sameEmail == 0 && sameUsername == 0) {
        this.usersRepository.save(newUser.getValue()).then(user => {
          this.amqpService.publishEvent(
            new UserSignedUpEvent(
              user.getID().value,
              user.username.value,
              user.email.value,
            ),
          );
        });
      }
    }
  }
}
