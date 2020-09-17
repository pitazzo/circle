import { Resolver, Args, Mutation } from '@nestjs/graphql';
import OperationBus from 'src/core/infraestructure/operation-bus/operation-bus';
import { MutationResult, SubscriptionInput } from 'src/graphql';
import SubscribeCommand from './commands/subscribe.command';

@Resolver('Post')
export class SubscriptionsResolver {
  constructor(private operationBus: OperationBus) {}

  @Mutation()
  async subscribe(
    @Args('subscriptionInput') subscriptionInput: SubscriptionInput,
  ): Promise<MutationResult> {
    const response = await this.operationBus.dispatch(
      new SubscribeCommand(
        subscriptionInput.subscriberID,
        subscriptionInput.publisherID,
      ),
    );

    return response;
  }
}
