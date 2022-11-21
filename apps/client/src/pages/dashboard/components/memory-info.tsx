import { useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import { useMemo, useRef } from 'react'
import { FaMemory } from 'react-icons/fa'
import ProgressBar from 'components/progress-bar'
import { bytesToHumanReadable } from 'utils/size'
import { Result } from 'antd'
import TimelineChart, { TimelineChartHandle } from 'components/timeline-chart'
import { getMemoryInfo } from '../queries'

type MemoryInfoProps = {
  className?: string
  style?: React.CSSProperties
}

export default function MemoryInfo({ className, style }: MemoryInfoProps) {
  const timelineChart = useRef<TimelineChartHandle>(null)

  const { isLoading, isError, data } = useQuery(['memory', 'info'], getMemoryInfo, {
    refetchInterval: 2000,
    onSuccess: (dataFetched) => {
      timelineChart.current?.pushData(dataFetched.used)
    },
  })

  const content = useMemo(() => {
    if (isLoading) {
      return (
        <div className="skeleton-container grid grid-cols-6 items-center gap-4">
          <div className="skeleton-item h-4" />
          <div className="skeleton-item col-span-3 h-4" />
          <div className="col-span-2 flex justify-end">
            <div className="skeleton-item  h-4 w-1/2" />
          </div>
          <div className="skeleton-item h-4" />
          <div className="skeleton-item col-span-3 h-4" />
          <div className="col-span-2 flex justify-end">
            <div className="skeleton-item  h-4 w-1/2" />
          </div>
        </div>
      )
    }

    if (isError) {
      return <Result status="warning" className="p-0" title="Something went wrong" subTitle="Please try again" />
    }

    if (data) {
      return (
        <div className="grid grid-cols-6 items-center gap-4">
          <TimelineChart className="col-span-6" numPoints={30} delta={2000} ref={timelineChart} />
          <div>Memory</div>
          <div className="col-span-3 flex-1 space-y-1">
            <ProgressBar progress={(data.active / data.total) * 100} />
            <div className="text-text-secondary font-mono text-xs">
              {((data.active / data.total) * 100).toFixed(2)}%
            </div>
          </div>
          <div className="col-span-2 whitespace-nowrap text-right">
            {bytesToHumanReadable(data.active)} / {bytesToHumanReadable(data.total)}
          </div>
          <div>Swap</div>
          <div className="col-span-3 flex-1 space-y-1">
            <ProgressBar progress={(data.swapused / data.swaptotal) * 100} />
            <div className="text-text-secondary font-mono text-xs">
              {((data.swapused / data.swaptotal) * 100).toFixed(2)}%
            </div>
          </div>
          <div className="col-span-2 whitespace-nowrap text-right">
            {bytesToHumanReadable(data.swapused)} / {bytesToHumanReadable(data.swaptotal)}
          </div>
        </div>
      )
    }

    return null
  }, [data, isLoading, isError])

  return (
    <div
      className={clsx('text-text-primary flex h-full flex-col overflow-hidden rounded-md bg-gray-800', className)}
      style={style}
    >
      <div className="flex items-center space-x-2 bg-gray-700 px-4 py-2">
        <FaMemory className="h-5 w-5" />
        <span>Memory</span>
        <span className="flex-1" />
      </div>
      <div className="flex-1 overflow-auto p-4 text-sm">{content}</div>
    </div>
  )
}
