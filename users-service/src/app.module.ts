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
      host: 'ec2-54-246-85-151.eu-west-1.compute.amazonaws.com',
      port: parseInt('5432'),
      username: 'kavchasunvmsce',
      password: '63a96f93244f3ad5dadb8f714a1cdf2eb8cbe877a5efad596e2aa3ce93bc7d2d',
      database: 'dau99oubdpj6ra',
      entities: ['dist/**/*.entity{.ts,.js}'],
      ssl: {
        rejectUnauthorized: false,
      },
      synchronize: true
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [UsersService],
})
export class AppModule {}
