import { Module } from '@nestjs/common'
import { MemoryController } from './memory.controller'
import { MemoryService } from './memory.service'

@Module({
  controllers: [MemoryController],
  providers: [MemoryService],
})
export class MemoryModule {}
