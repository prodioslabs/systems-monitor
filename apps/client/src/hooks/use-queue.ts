import { useCallback, useRef, useState } from 'react'
import { mod } from 'utils/math'

export function useQueue<T extends any>(queueSize: number, defaultValue: T) {
  const [data, setData] = useState<T[]>(Array.from<T>({ length: queueSize }).fill(defaultValue))
  const currentIndex = useRef(queueSize - 1)

  const push = useCallback(
    (value: T) => {
      setData((prevState) => {
        const next = [...prevState]
        next[currentIndex.current] = value
        currentIndex.current = mod(currentIndex.current - 1, queueSize)
        return next
      })
    },
    [queueSize],
  )

  return { data, push }
}
