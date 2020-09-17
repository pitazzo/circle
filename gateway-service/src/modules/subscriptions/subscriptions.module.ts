import { Module } from '@nestjs/common';
import { OperationBusModule } from 'src/core/infraestructure/operation-bus/operation-bus.module';
import { SubscriptionsResolver } from './subscriptions.resolver';

@Module({
    imports: [OperationBusModule],
    providers: [SubscriptionsResolver],
})
export class SubscriptionsModule {}
