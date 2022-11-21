import { Injectable, Logger } from '@nestjs/common'
import * as si from 'systeminformation'

@Injectable()
export class DiskService {
  async getInfo() {
    try {
      const data = await si.fsSize()
      return data
    } catch (error) {
      Logger.log(error, 'DiskService.getInfo')
      throw error
    }
  }
}
