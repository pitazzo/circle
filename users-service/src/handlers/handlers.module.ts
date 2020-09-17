import { Module } from '@nestjs/common';
import { EditUserCommandHandler } from './edit.handler';
import { GetAuthorQueryHandler } from './get-author.handler';
import { GetUserQueryHandler } from './get-user.handler';
import { PostPublishedEventHandler } from './post-published.handler';
import { SignUpCommandHandler } from './signup.handler';
import { GetAllUsersQueryHandler } from './get-all.handler';
import { GetProlificUsersQueryHandler } from './get-prolific.handler';
import { GetPopularUsersQueryHandler } from './get-popular.handler';

@Module({
  providers: [
    EditUserCommandHandler,
    GetAuthorQueryHandler,
    GetAllUsersQueryHandler,
    GetUserQueryHandler,
    PostPublishedEventHandler,
    SignUpCommandHandler,
    GetProlificUsersQueryHandler,
    GetPopularUsersQueryHandler,
  ],
  exports: [
    EditUserCommandHandler,
    GetAuthorQueryHandler,
    GetAllUsersQueryHandler,
    GetUserQueryHandler,
    PostPublishedEventHandler,
    SignUpCommandHandler,
    GetProlificUsersQueryHandler,
    GetPopularUsersQueryHandler,
  ],
})
export class HandlersModule {}
