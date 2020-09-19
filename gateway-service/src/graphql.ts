
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface SignUpUserInput {
    username: string;
    email: string;
}

export interface EditUserInput {
    username: string;
    email: string;
}

export interface PublishPostInput {
    authorID: string;
    title: string;
    body: string;
}

export interface LikePostInput {
    likerID: string;
    postID: string;
}

export interface SubscriptionInput {
    subscriberID: string;
    publisherID: string;
}

export interface User {
    id: string;
    username: string;
    email: string;
    enrollmentDate: string;
    posts: Post[];
}

export interface Post {
    id: string;
    title: string;
    body: string;
    publishDate: string;
    author: User;
    likes: number;
}

export interface MutationResult {
    accepted: boolean;
    failureReason?: string;
}

export interface IQuery {
    user(username: string): User | Promise<User>;
    author(postID: string): User | Promise<User>;
    users(limit: number): User[] | Promise<User[]>;
    mostPopular(limit: number): User[] | Promise<User[]>;
    mostProlific(limit: number): User[] | Promise<User[]>;
    postsByAuthor(authorID: string): Post[] | Promise<Post[]>;
    recentPosts(limit: number): Post[] | Promise<Post[]>;
    popularPosts(limit: number): Post[] | Promise<Post[]>;
}

export interface IMutation {
    signUpUser(signUpUserInput: SignUpUserInput): MutationResult | Promise<MutationResult>;
    editUser(editUserInput: EditUserInput): MutationResult | Promise<MutationResult>;
    publishPost(publishPostInput: PublishPostInput): MutationResult | Promise<MutationResult>;
    likePost(likePostInput: LikePostInput): MutationResult | Promise<MutationResult>;
    subscribe(subscriptionInput: SubscriptionInput): MutationResult | Promise<MutationResult>;
}
