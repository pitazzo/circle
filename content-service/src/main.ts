import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AMQPService } from 'circle-core/dist/infraestructure/amqp-service/amqp-service';
import { ContentService } from './content.service';
import { PublishCommandHandler } from './handlers/publish.handler';
import { GetByAuthorQueryHandler } from './handlers/get-by.author.handler';
import { LikeCommandHandler } from './handlers/like-post.handler';
import { GetPopularPostsQueryHandler } from './handlers/popular-posts.handler';
import { GetRecentPostsQueryHandler } from './handlers/recent-posts.handler';

async function bootstrap() {
  require('dotenv').config();
  const app = await NestFactory.createApplicationContext(AppModule);
  const amqpService = app.get(AMQPService);
  const contentService = app.get(ContentService);

  await amqpService.init();

  // Commands
  amqpService.registerHandler(new PublishCommandHandler(contentService));
  amqpService.registerHandler(new LikeCommandHandler(contentService));

  // Queries
  amqpService.registerHandler(new GetByAuthorQueryHandler(contentService));
  amqpService.registerHandler(new GetRecentPostsQueryHandler(contentService));
  amqpService.registerHandler(new GetPopularPostsQueryHandler(contentService));
}
bootstrap();
