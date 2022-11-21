import { apiClient } from 'utils/client'
import type { Systeminformation } from 'systeminformation'

export async function getCpuInfo() {
  const { data } = await apiClient.get<Systeminformation.CpuData>('/cpu/info')
  return data
}

export async function getCpuTemperature() {
  const { data } = await apiClient.get<Systeminformation.CpuTemperatureData>('/cpu/temperature')
  return data
}

export async function getCpuUsage() {
  const { data } = await apiClient.get<Systeminformation.CurrentLoadData>('/cpu/usage')
  return data
}

export async function getProcesses() {
  const { data } = await apiClient.get<Systeminformation.ProcessesData>('/cpu/processes')
  return data
}

export async function getMemoryInfo() {
  const { data } = await apiClient.get<Systeminformation.MemData>('/memory/info')
  return data
}

export async function getDiskInfo() {
  const { data } = await apiClient.get<Systeminformation.FsSizeData[]>('/disk/info')
  return data
}
