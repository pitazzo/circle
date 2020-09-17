import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

import { Username } from './value-objects/username';
import { Result, IDList, ID, Email } from 'circle-core';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  private id: string;

  @Column(type => Username)
  username: Username;

  @Column(type => Email)
  email: Email;

  @Column(type => Date)
  enrollmentDate: Date;

  @Column(type => IDList)
  postsID: IDList;

  @Column()
  postsAmount: number;

  @Column()
  subscribersAmount: number;

  private constructor(username: Username, email: Email) {
    this.postsID = IDList.create([]).getValue();
    this.username = username;
    this.email = email;
    this.enrollmentDate = new Date();
    this.postsAmount = 0;
    this.subscribersAmount = 0;
  }

  public static create(username: Username, email: Email): Result<User> {
    return Result.ok<User>(new User(username, email));
  }

  public getID(): ID {
    return ID.create(this.id).getValue();
  }

  public updateEmail(email: Email): void {
    this.email = email;
  }

  public addPost(postID: ID) {
    this.postsAmount++;
    this.postsID.value.push(postID.value);
  }

  public addSubscriber() {
    this.subscribersAmount++;
  }

  public serialize(): Record<string, any> {
    return {
      id: this.id,
      username: this.username.value,
      email: this.email.value,
      enrollmentDate: this.enrollmentDate,
      subscribersAmount: this.subscribersAmount,
    };
  }
}
