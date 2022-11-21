import { useQuery } from '@tanstack/react-query'
import { Tooltip, Typography } from 'antd'
import clsx from 'clsx'
import ProgressBar from 'components/progress-bar'
import React, { useMemo } from 'react'
import { RiUDiskLine } from 'react-icons/ri'
import { bytesToHumanReadable } from 'utils/size'
import { getDiskInfo } from '../queries'

type DiskInfoProps = {
  className?: string
  style?: React.CSSProperties
}

export default function DiskInfo({ className, style }: DiskInfoProps) {
  const { data } = useQuery(['disk', 'info'], getDiskInfo, {
    refetchInterval: 2 * 60 * 1000,
  })

  const content = useMemo(() => {
    if (data) {
      return (
        <div className="grid grid-cols-5 gap-4">
          {data.map((disk) => (
            <React.Fragment key={disk.fs}>
              <div className="space-y-1">
                <Tooltip title={disk.fs}>
                  <Typography.Text ellipsis>{disk.fs}</Typography.Text>
                </Tooltip>
                <div className="text-text-secondary text-xs">Mounted On - {disk.mount}</div>
              </div>
              <div className="col-span-2 space-y-1">
                <ProgressBar progress={(disk.used / disk.size) * 100} />
                <div className="text-text-secondary font-mono text-xs">{disk.use}%</div>
              </div>
              <div className="col-span-2 text-right">
                {bytesToHumanReadable(disk.used)} / {bytesToHumanReadable(disk.size)}
              </div>
            </React.Fragment>
          ))}
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
        <RiUDiskLine className="h-5 w-5" />
        <span>Disk</span>
        <span className="flex-1" />
      </div>
      <div className="flex-1 overflow-auto p-4 text-sm">{content}</div>
    </div>
  )
}
