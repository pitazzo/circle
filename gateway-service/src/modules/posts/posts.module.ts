import { Module } from '@nestjs/common';
import { PostsResolver } from './posts.resolver';
import { OperationBusModule } from 'src/core/infraestructure/operation-bus/operation-bus.module';

@Module({
  imports: [OperationBusModule],
  providers: [PostsResolver],
})
export class PostsModule {}
