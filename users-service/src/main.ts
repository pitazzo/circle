import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AMQPService } from 'circle-core';
import { PostPublishedEventHandler } from './handlers/post-published.handler';
import { SignUpCommandHandler } from './handlers/signup.handler';
import { UsersService } from './users.service';
import { EditUserCommandHandler } from './handlers/edit.handler';
import { GetAuthorQueryHandler } from './handlers/get-author.handler';
import { GetUserQueryHandler } from './handlers/get-user.handler';
import { GetAllUsersQueryHandler } from './handlers/get-all.handler';
import { GetProlificUsersQueryHandler } from './handlers/get-prolific.handler';
import { GetPopularUsersQueryHandler } from './handlers/get-popular.handler';
import { UserSubscribedHandler } from './handlers/on-subscribed.handler';

async function bootstrap() {
  require('dotenv').config();
  const app = await NestFactory.createApplicationContext(AppModule);
  const amqpService = app.get(AMQPService);
  const userService = app.get(UsersService);

  await amqpService.init();

  // Queries
  amqpService.registerHandler(new GetAuthorQueryHandler(userService));
  amqpService.registerHandler(new GetUserQueryHandler(userService));
  amqpService.registerHandler(new GetAllUsersQueryHandler(userService));
  amqpService.registerHandler(new GetProlificUsersQueryHandler(userService));
  amqpService.registerHandler(new GetPopularUsersQueryHandler(userService));

  // Commands
  amqpService.registerHandler(new EditUserCommandHandler(userService));
  amqpService.registerHandler(new SignUpCommandHandler(userService));

  // Events
  amqpService.registerHandler(
    new PostPublishedEventHandler(userService),
    'content-service',
  );
  amqpService.registerHandler(
    new UserSubscribedHandler(userService),
    'notifications-service',
  );  
}
bootstrap();
