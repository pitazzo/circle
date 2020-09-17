import { Module } from "@nestjs/common";
import { AMQPService } from "./amqp-service";

@Module({
  providers: [AMQPService],
  exports: [AMQPService],
})
export class AMQPServiceModule {}
