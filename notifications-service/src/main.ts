import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AMQPService } from 'circle-core/dist/infraestructure/amqp-service/amqp-service';
import { PublishersService } from './publishers.service';
import { UserSignedUpHandler } from './handlers/on-sign-up.handler';
import { UserEditedHandler } from './handlers/on-edited.handler';
import { PostPublishedHandler } from './handlers/on-published.handlet';
import { PostLikedHandler } from './handlers/on-liked.handler';
import { SubscribeCommandHandler } from './handlers/subscribe.handler';
import { UserSubscribedHandler } from './handlers/on-subscribed.handler';

async function bootstrap() {
  require('dotenv').config();
  const app = await NestFactory.createApplicationContext(AppModule);
  const amqpService = app.get(AMQPService);
  const usersService = app.get(PublishersService);

  await amqpService.init();

  // Events
  amqpService.registerHandler(
    new UserSubscribedHandler(usersService),
    'notifications-service',
  );
  amqpService.registerHandler(
    new PostPublishedHandler(usersService),
    'content-service',
  );
  amqpService.registerHandler(
    new PostLikedHandler(usersService),
    'content-service',
  );
  amqpService.registerHandler(
    new UserSignedUpHandler(usersService),
    'users-service',
  );
  amqpService.registerHandler(
    new UserEditedHandler(usersService),
    'users-service',
  );

  // Commands
  amqpService.registerHandler(new SubscribeCommandHandler(usersService));
}
bootstrap();
