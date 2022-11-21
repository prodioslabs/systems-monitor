import { Controller, Get } from '@nestjs/common'
import { DiskService } from './disk.service'

@Controller('disk')
export class DiskController {
  constructor(private readonly diskService: DiskService) {}

  @Get('info')
  getInfo() {
    return this.diskService.getInfo()
  }
}
