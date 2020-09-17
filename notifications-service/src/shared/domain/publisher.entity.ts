import { IDList, Email, ID } from 'circle-core';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'publishers' })
export class Publisher {
  @PrimaryGeneratedColumn('uuid')
  private id: string;

  @Column(type => Email)
  email: Email;

  @Column(type => ID)
  publisherID: ID;

  @Column(type => IDList)
  subscribersID: IDList;

  private constructor(authorID: ID, email: Email) {
    this.publisherID = authorID;
    this.subscribersID = IDList.create([]).getValue();
    this.email = email;
  }

  public static create(publisherID: ID, email: Email): Publisher {
    return new Publisher(publisherID, email);
  }

  // public serialize(): Record<string, any> {
  //   return {
  //     id: this.id,
  //     title: this.title.value,
  //     body: this.body.value,
  //     publishDate: this.publishDate,
  //     authorID: this.authorID.value,
  //     likes: this.likers.value.length,
  //   };
  // }
}
