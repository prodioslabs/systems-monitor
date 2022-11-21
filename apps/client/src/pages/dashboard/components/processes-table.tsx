import { useQuery } from '@tanstack/react-query'
import { Table, Tooltip } from 'antd'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import clsx from 'clsx'
import { truncate } from 'lodash'
import { useMemo } from 'react'
import { BsGearWideConnected } from 'react-icons/bs'
import { durationToString } from 'utils/duration'
import { getProcesses } from '../queries'

dayjs.extend(duration)

type ProcessesTableProps = {
  className?: string
  style?: React.CSSProperties
}

export default function ProcessesTable({ className, style }: ProcessesTableProps) {
  const { data } = useQuery(['cpu', 'processes'], getProcesses, {
    refetchInterval: 5000,
  })

  const content = useMemo(() => {
    if (data) {
      return (
        <Table
          dataSource={data.list}
          rowKey="pid"
          pagination={false}
          onHeaderRow={() => {
            return {
              className: 'sticky top-0 z-10',
            }
          }}
          columns={[
            {
              dataIndex: 'pid',
              title: 'PID',
            },
            {
              dataIndex: 'parentPid',
              title: 'Parent PID',
            },
            {
              dataIndex: 'name',
              title: 'Name',
            },
            {
              dataIndex: 'cpu',
              title: 'CPU %',
              render: (value) => `${value.toFixed(2)}%`,
              sorter: (a, b) => a.cpu - b.cpu,
              defaultSortOrder: 'descend',
            },
            {
              dataIndex: 'mem',
              title: 'MEM %',
              render: (value) => `${value.toFixed(2)}%`,
              sorter: (a, b) => a.mem - b.mem,
            },
            {
              dataIndex: 'time',
              title: 'Time',
              render: (value, item) => {
                const startDuration = dayjs.duration(dayjs().diff(item.started))
                return durationToString(startDuration)
              },
              sorter: (a, b) => dayjs(a.started).unix() - dayjs(b.started).unix(),
            },
            {
              dataIndex: 'command',
              title: 'Command',
              width: 320,
              render: (value, item) => {
                const fullCommand = `${item.path} ${item.params}`
                return (
                  <Tooltip title={fullCommand}>
                    <div>{truncate(fullCommand)}</div>
                  </Tooltip>
                )
              },
            },
          ]}
        />
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
        <BsGearWideConnected className="h-5 w-5 animate-spin" />
        <span>Processes</span>
        <span className="flex-1" />
        {data?.list?.length ? (
          <span className="rounded bg-gray-800 px-2 py-1 text-sm">{data?.list?.length} Processes</span>
        ) : null}
      </div>
      <div className="relative flex-1 overflow-auto text-sm">{content}</div>
    </div>
  )
}
