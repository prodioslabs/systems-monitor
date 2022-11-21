import clsx from 'clsx'
import { useQuery } from '@tanstack/react-query'
import { BsCpu, BsThermometer } from 'react-icons/bs'
import { useMemo } from 'react'
import { Result, Typography } from 'antd'
import { range } from 'lodash'
import { getCpuInfo, getCpuTemperature } from '../queries'

type CpuInfoProps = {
  className?: string
  style?: React.CSSProperties
}

export default function CpuInfo({ className, style }: CpuInfoProps) {
  const { data: cpuInfoData, isLoading, isError } = useQuery(['cpu', 'info'], getCpuInfo)
  const { data: cpuTemperaturData } = useQuery(['cpu', 'temperature'], getCpuTemperature, {
    refetchInterval: 2000,
  })

  const content = useMemo(() => {
    if (isLoading) {
      return (
        <div className="skeleton-container grid grid-cols-2 gap-2">
          {range(8).map((key) => (
            <div key={key} className="skeleton-item h-4 w-full" />
          ))}
        </div>
      )
    }

    if (isError) {
      return <Result status="warning" className="p-0" title="Something went wrong" subTitle="Please try again" />
    }

    if (cpuInfoData) {
      return (
        <div className="grid grid-cols-2 gap-2">
          <div>Model</div>
          <Typography.Text ellipsis>{`${cpuInfoData.manufacturer} - ${cpuInfoData.brand}`}</Typography.Text>
          <div>Cores</div>
          <div>{cpuInfoData.cores}</div>
          <div>Physical Cores</div>
          <div>{cpuInfoData.physicalCores}</div>
          <div>Thread(s) per core</div>
          <div>{Math.floor(cpuInfoData.cores / cpuInfoData.physicalCores)}</div>
        </div>
      )
    }

    return null
  }, [cpuInfoData, isLoading, isError])

  return (
    <div
      className={clsx('text-text-primary flex h-full flex-col overflow-hidden rounded-md bg-gray-800', className)}
      style={style}
    >
      <div className="flex items-center space-x-2 bg-gray-700 px-4 py-2">
        <BsCpu className="h-5 w-5" />
        <span>CPU</span>
        <span className="flex-1" />
        {cpuTemperaturData ? (
          <div className="flex items-center space-x-1 rounded bg-gray-800 py-1 px-2">
            <BsThermometer className="text-accent" />
            <span className="text-accent text-sm">{cpuTemperaturData.main} °C</span>
          </div>
        ) : null}
      </div>
      <div className="flex-1 overflow-auto p-4 text-sm">{content}</div>
    </div>
  )
}
