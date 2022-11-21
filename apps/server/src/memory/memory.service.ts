import { Injectable, Logger } from '@nestjs/common'
import * as si from 'systeminformation'

@Injectable()
export class MemoryService {
  async getInfo() {
    try {
      const data = await si.mem()
      return data
    } catch (error) {
      Logger.log(error, 'MemoryService.getInfo')
      throw error
    }
  }
}
