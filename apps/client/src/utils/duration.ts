import { Duration } from 'dayjs/plugin/duration'

export function durationToString(duration: Duration) {
  let string = ''
  if (duration.days()) {
    string = `${duration.days()}D`
  }
  if (duration.hours()) {
    string += `${duration.hours()}:`
  }
  string += `${duration.minutes()}:${duration.seconds()}`

  return string
}
