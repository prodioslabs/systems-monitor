import { Controller, Get } from '@nestjs/common'
import { CpuService } from './cpu.service'

@Controller('cpu')
export class CpuController {
  constructor(private readonly cpuService: CpuService) {}

  @Get('info')
  getInfo() {
    return this.cpuService.getInfo()
  }

  @Get('temperature')
  getTemperature() {
    return this.cpuService.getTemperature()
  }

  @Get('usage')
  getUsage() {
    return this.cpuService.getUsage()
  }

  @Get('processes')
  getProcesses() {
    return this.cpuService.getProcesses()
  }
}
