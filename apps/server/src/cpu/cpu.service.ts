import { Injectable, Logger } from '@nestjs/common'
import * as si from 'systeminformation'

@Injectable()
export class CpuService {
  async getInfo() {
    try {
      const data = await si.cpu()
      return data
    } catch (error) {
      Logger.error(error, 'CpuService.getInfo')
      throw error
    }
  }

  async getTemperature() {
    try {
      const data = await si.cpuTemperature()
      return data
    } catch (error) {
      Logger.error(error, 'CpuService.getTemperature')
      throw error
    }
  }

  async getUsage() {
    try {
      const data = await si.currentLoad()
      return data
    } catch (error) {
      Logger.error(error, 'CpuService.getUsage')
      throw error
    }
  }

  async getProcesses() {
    try {
      const data = await si.processes()
      return data
    } catch (error) {
      Logger.error(error, 'CpuService.getProcesses')
      throw error
    }
  }
}
