import { Module } from '@nestjs/common';
import OperationBus from './operation-bus';

@Module({
  providers: [OperationBus],
  exports: [OperationBus],
})
export class OperationBusModule {}
