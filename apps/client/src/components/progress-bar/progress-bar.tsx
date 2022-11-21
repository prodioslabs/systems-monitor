import clsx from 'clsx'
import { useRef } from 'react'
import { colors } from 'utils/colors'

type ProgressBarProps = {
  progress: number
  className?: string
  style?: React.CSSProperties
}

let count = 0

export default function ProgressBar({ progress, className, style }: ProgressBarProps) {
  const id = useRef(count++).current

  return (
    <div className={clsx('h-2 overflow-hidden rounded-full border border-gray-600', className)} style={style}>
      <svg className="h-full w-full" viewBox="0 0 100 10" preserveAspectRatio="none">
        <defs>
          <linearGradient id={`${id}-progressGradient`}>
            <stop offset="0%" stopColor={colors.primary} />
            <stop offset="80%" stopColor={colors.warning} />
            <stop offset="100%" stopColor={colors.error} />
          </linearGradient>
          <clipPath id={`${id}-progressMask`}>
            <rect x="0" y="0" width={progress} height="10" />
          </clipPath>
        </defs>
        <rect
          x="0"
          y="0"
          width="100"
          height="10"
          fill={`url(#${id}-progressGradient)`}
          clipPath={`url(#${id}-progressMask)`}
        />
      </svg>
    </div>
  )
}
