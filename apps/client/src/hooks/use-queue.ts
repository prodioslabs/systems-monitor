import { useCallback, useState } from 'react'
import { mod } from 'utils/math'

export function useQueue<T extends any>(queueSize: number, defaultValue: T) {
  const [{ data }, setData] = useState<{ data: T[]; index: number }>({
    data: Array.from<T>({ length: queueSize }).fill(defaultValue),
    index: queueSize - 1,
  })

  const push = useCallback(
    (value: T) => {
      setData((prevState) => {
        const next = [...prevState.data]
        next[prevState.index] = value
        return { data: next, index: mod(prevState.index - 1, queueSize) }
      })
    },
    [queueSize],
  )

  return { data, push }
}
