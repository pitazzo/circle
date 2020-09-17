import { Module } from '@nestjs/common';
import { UsersResolver } from '../users/users.resolver';
import { OperationBusModule } from 'src/core/infraestructure/operation-bus/operation-bus.module';

@Module({
  imports: [OperationBusModule],
  providers: [UsersResolver],
})
export class UsersModule {}
