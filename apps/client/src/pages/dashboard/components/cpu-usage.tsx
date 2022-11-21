import { useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import ProgressBar from 'components/progress-bar'
import TimelineChart, { TimelineChartHandle } from 'components/timeline-chart'
import { useMemo, useRef } from 'react'
import { BsCpu } from 'react-icons/bs'
import { getCpuUsage } from '../queries'

type CpuUsageProps = {
  className?: string
  style?: React.CSSProperties
}

export default function CpuUsage({ className, style }: CpuUsageProps) {
  const timelineChart = useRef<TimelineChartHandle>(null)

  const { data } = useQuery(['cpu', 'usage'], getCpuUsage, {
    refetchInterval: 2000,
    onSuccess: (dataFetched) => {
      timelineChart.current?.pushData(dataFetched.avgLoad)
    },
  })

  const content = useMemo(() => {
    if (data) {
      return (
        <div className="space-y-4">
          <TimelineChart numPoints={30} delta={2000} ref={timelineChart} />
          <div className="flex items-center justify-between rounded bg-gray-700 p-2">
            <span>Average CPU Load</span>
            <span className="font-mono">{data.currentLoad.toFixed(2)}%</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {data.cpus.map((cpu, index) => (
              <div key={index} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono">{index}</span>
                  <span className="font-mono">{cpu.load.toFixed(2)}%</span>
                </div>
                <ProgressBar progress={cpu.load} />
              </div>
            ))}
          </div>
        </div>
      )
    }

    return null
  }, [data])

  return (
    <div
      className={clsx('text-text-primary flex h-full flex-col overflow-hidden rounded-md bg-gray-800', className)}
      style={style}
    >
      <div className="flex items-center space-x-2 bg-gray-700 px-4 py-2">
        <BsCpu className="h-5 w-5" />
        <span>CPU Usage</span>
        <span className="flex-1" />
      </div>
      <div className="flex-1 overflow-auto p-4 text-sm">{content}</div>
    </div>
  )
}
