import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AMQPServiceModule } from 'circle-core';
import { UsersService } from './users.service';
import { HandlersModule } from './handlers/handlers.module';
import { User } from './shared/domain/user.entity';

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
    TypeOrmModule.forFeature([User]),
  ],
  providers: [UsersService],
})
export class AppModule {}
