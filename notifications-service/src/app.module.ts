import { Module } from '@nestjs/common';
import { PublishersService } from './publishers.service';
import { AMQPServiceModule } from 'circle-core';
import { HandlersModule } from './handlers/handlers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Publisher } from './shared/domain/publisher.entity';
import { MailService } from './mail.service';

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
    TypeOrmModule.forFeature([Publisher]),
  ],
  providers: [PublishersService, MailService],
})
export class AppModule {}
