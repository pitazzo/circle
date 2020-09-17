import { Module } from '@nestjs/common';
import { ContentService } from './content.service';
import { AMQPServiceModule } from 'circle-core';
import { HandlersModule } from './handlers/handlers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './shared/domain/post.entity';

@Module({
  imports: [
    AMQPServiceModule,
    HandlersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'DB_HOST',
      port: parseInt('DB_PORT'),
      username: 'DB_USER',
      password: 'DB_PASSWORD',
      database: 'DB_DATABASE',
      entities: ['dist/**/*.entity{.ts,.js}'],
      ssl: {
        rejectUnauthorized: false,
      },
    }),
    TypeOrmModule.forFeature([Post]),
  ],
  providers: [ContentService],
})
export class AppModule {}
