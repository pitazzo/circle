import { ID, IDList, Title, Body } from 'circle-core';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'posts' })
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column(type => Title)
  title: Title;

  @Column(type => Body)
  body: Body;

  @Column()
  publishDate: Date;

  @Column(type => ID)
  authorID: ID;

  @Column(type => IDList)
  likers: IDList;

  private constructor(title: Title, body: Body, authorID: ID) {
    this.title = title;
    this.body = body;
    this.publishDate = new Date();
    this.authorID = authorID;
    this.likers = IDList.create([]).getValue();
  }

  public static create(title: Title, body: Body, authorID: ID): Post {
    return new Post(title, body, authorID);
  }

  public serialize(): Record<string, any> {
    return {
      id: this.id,
      title: this.title.value,
      body: this.body.value,
      publishDate: this.publishDate,
      authorID: this.authorID.value,
      likes: this.likers.value.length,
    };
  }
}
