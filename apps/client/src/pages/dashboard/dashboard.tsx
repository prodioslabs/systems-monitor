import CpuInfo from './components/cpu-info'
import CpuUsage from './components/cpu-usage'
import DiskInfo from './components/disk-info'
import MemoryInfo from './components/memory-info'
import ProcessesTable from './components/processes-table'

export default function Dashboard() {
  return (
    <div className="flex h-screen flex-col space-y-4 overflow-hidden p-4">
      <div className="text-xl font-semibold text-gray-50">Systems Monitor</div>
      <div className="grid grid-cols-3 gap-4">
        <CpuInfo />
        <MemoryInfo />
        <DiskInfo />
      </div>
      <div className="grid flex-1 grid-cols-3 items-start gap-4 overflow-hidden">
        <CpuUsage />
        <ProcessesTable className="col-span-2" />
      </div>
    </div>
  )
}
