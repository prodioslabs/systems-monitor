import { useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import ProgressBar from 'components/progress-bar'
import { useQueue } from 'hooks/use-queue'
import { useMemo } from 'react'
import { BsCpu } from 'react-icons/bs'
import { Area, AreaChart, ResponsiveContainer, YAxis } from 'recharts'
import { colors } from 'utils/colors'
import { getCpuUsage } from '../queries'

type CpuUsageProps = {
  className?: string
  style?: React.CSSProperties
}

export default function CpuUsage({ className, style }: CpuUsageProps) {
  const { data: queueData, push } = useQueue(20, 0)

  const { data } = useQuery(['cpu', 'usage'], getCpuUsage, {
    refetchInterval: 2000,
    onSuccess: (dataFetched) => {
      push(dataFetched.avgLoad)
    },
  })

  const content = useMemo(() => {
    if (data) {
      return (
        <div className="space-y-4">
          <div className="h-[24px]">
            <ResponsiveContainer>
              <AreaChart
                data={queueData.map((item, index) => ({ value: item, index }))}
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={colors.primary} stopOpacity={0.4} />
                    <stop offset="95%" stopColor={colors.primary} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  dataKey="value"
                  isAnimationActive={false}
                  dot={false}
                  fill="url(#chartGradient)"
                  stroke={colors.primary}
                />
                <YAxis hide dataKey="value" domain={['dataMin', 'dataMax']} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
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
  }, [data, queueData])

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
