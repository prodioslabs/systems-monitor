import clsx from 'clsx'
import { useQueue } from 'hooks/use-queue'
import { forwardRef, useImperativeHandle } from 'react'
import { Area, AreaChart, ResponsiveContainer, YAxis } from 'recharts'
import { colors } from 'utils/colors'

type TimelineChartProps = {
  /** Number of points to be plotted in the chart. It would be same as the size of the queue used */
  numPoints: number
  /** Time difference between the points. So the total time of the chart would numPoints * delta */
  delta: number
  height?: number
  className?: string
  style?: React.CSSProperties
}

export type TimelineChartHandle = {
  pushData: (data: number) => void
}

function TimelineChart(
  { numPoints, delta, height = 24, className, style = {} }: TimelineChartProps,
  ref: React.Ref<TimelineChartHandle>,
) {
  const { data: queueData, push } = useQueue(numPoints, 0)

  useImperativeHandle(ref, () => ({
    pushData: push,
  }))

  return (
    <div className={clsx('space-y-1', className)} style={style}>
      <div style={{ height }}>
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
            <YAxis hide dataKey="value" domain={[0, 'dataMax']} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="text-text-secondary flex justify-between text-xs font-medium">
        <div>{(numPoints * delta) / 1000} seconds</div>
        <div>0</div>
      </div>
    </div>
  )
}

export default forwardRef<TimelineChartHandle, TimelineChartProps>(TimelineChart)
