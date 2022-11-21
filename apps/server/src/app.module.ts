import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import * as joi from 'joi'
import { CpuModule } from './cpu/cpu.module'
import { MemoryModule } from './memory/memory.module'
import { DiskModule } from './disk/disk.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: joi.object({
        PORT: joi.number().default(4200).required(),
      }),
      envFilePath: ['.env'],
    }),
    CpuModule,
    MemoryModule,
    DiskModule,
  ],
  controllers: [],
})
export class AppModule {}
