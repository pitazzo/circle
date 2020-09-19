import {
  Resolver,
  Query,
  Args,
  ResolveField,
  Parent,
  Mutation,
} from "@nestjs/graphql";
import { SignUpUserInput, EditUserInput, MutationResult } from "src/graphql";
import { handleQueryResult } from "src/common/query-result-handler";
import OperationBus from "src/core/infraestructure/operation-bus/operation-bus";
import { GetUserQuery } from "./queries/get-user.query";
import SignUpUserCommand from "./commands/create-user.command";
import EditUserCommand from "./commands/edit-user.command";
import { GetPostsByAuthorQuery } from "../posts/queries/get-posts-by-author.query";
import { GetAuthorQuery } from "./queries/get-author.query";
import { GetPopularUsersQuery } from "./queries/get-popular-users.query";
import { GetProlificUsersQuery } from "./queries/get-prolific-users.query";
import { GetAllUsersQuery } from "./queries/get-all.query";

@Resolver("User")
export class UsersResolver {
  constructor(private operationBus: OperationBus) {}

  @Query()
  async user(@Args("username") username: string) {
    const response = await this.operationBus.ask(new GetUserQuery(username));
    return handleQueryResult(response);
  }

  @Query()
  async users(@Args("limit") limit: number) {
    const response = await this.operationBus.ask(new GetAllUsersQuery(limit));
    return handleQueryResult(response);
  }

  @Query()
  async author(@Args("postID") postID: string) {
    const response = await this.operationBus.ask(new GetAuthorQuery(postID));
    return handleQueryResult(response);
  }

  @Query()
  async mostPopular(@Args("limit") limit: number) {
    const response = await this.operationBus.ask(
      new GetPopularUsersQuery(limit)
    );
    return handleQueryResult(response);
  }

  @Query()
  async mostProlific(@Args("limit") limit: number) {
    const response = await this.operationBus.ask(
      new GetProlificUsersQuery(limit)
    );
    return handleQueryResult(response);
  }

  @ResolveField()
  async posts(@Parent() user) {
    const response = await this.operationBus.ask(
      new GetPostsByAuthorQuery(user.id)
    );
    return handleQueryResult(response);
  }

  @Mutation()
  async signUpUser(
    @Args("signUpUserInput") signUpUserInput: SignUpUserInput
  ): Promise<MutationResult> {
    const response = await this.operationBus.dispatch(
      new SignUpUserCommand(signUpUserInput.username, signUpUserInput.email)
    );
    return response;
  }

  @Mutation()
  async editUser(
    @Args("editUserInput") editUserInput: EditUserInput
  ): Promise<MutationResult> {
    const response = await this.operationBus.dispatch(
      new EditUserCommand(editUserInput.username, editUserInput.email)
    );
    return response;
  }
}
