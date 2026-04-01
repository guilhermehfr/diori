export function formatDateTime(isoString: string): string {
  const date = new Date(isoString)

  const formatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })

  const parts = formatter.formatToParts(date)

  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? ''

  const month = get('month')
  const day = get('day')
  const year = get('year')
  const hour = get('hour')
  const minute = get('minute')
  const period = get('dayPeriod')

  return `${month}/${day}/${year} at ${hour}:${minute} ${period}`
}
