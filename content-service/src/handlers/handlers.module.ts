import { Module } from '@nestjs/common';
import { PublishCommandHandler } from './publish.handler';
import { GetByAuthorQueryHandler } from './get-by.author.handler';

@Module({
  providers: [PublishCommandHandler, GetByAuthorQueryHandler],
  exports: [PublishCommandHandler, GetByAuthorQueryHandler],
})
export class HandlersModule {}
