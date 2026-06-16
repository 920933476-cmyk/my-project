export type ParsedTime = {
  secondsTotal: number
  displayFormat: string
}

const pad2 = (n: number) => String(n).padStart(2, '0')

export function formatSeconds(secondsTotal: number): string {
  const total = Math.max(0, secondsTotal)
  const totalHundredths = Math.round(total * 100)
  const minutes = Math.floor(totalHundredths / 6000)
  const secondsHundredths = totalHundredths % 6000
  const secondsInt = Math.floor(secondsHundredths / 100)
  const hundredths = secondsHundredths % 100

  const base = `${minutes}:${pad2(secondsInt)}`
  if (hundredths === 0) return base
  return `${base}.${pad2(hundredths)}`
}

export function parseTimeInput(input: string): ParsedTime | null {
  const raw = input.trim()
  if (!raw) return null

  const chinese = raw
    .replace(/\s+/g, '')
    .replace(/分钟/g, '分')
    .replace(/秒钟/g, '秒')

  const m = chinese.match(/^(\d+)\s*分\s*(\d+(?:\.\d+)?)\s*秒$/)
  if (m) {
    const minutes = Number(m[1])
    const seconds = Number(m[2])
    if (!Number.isFinite(minutes) || !Number.isFinite(seconds)) return null
    if (seconds >= 60) return null
    const secondsTotal = minutes * 60 + seconds
    return { secondsTotal, displayFormat: formatSeconds(secondsTotal) }
  }

  const secOnly = chinese.match(/^(\d+(?:\.\d+)?)\s*秒$/)
  if (secOnly) {
    const secondsTotal = Number(secOnly[1])
    if (!Number.isFinite(secondsTotal)) return null
    return { secondsTotal, displayFormat: formatSeconds(secondsTotal) }
  }

  const colon = chinese.match(/^(\d+)\s*:\s*(\d+(?:\.\d+)?)$/)
  if (colon) {
    const minutes = Number(colon[1])
    const seconds = Number(colon[2])
    if (!Number.isFinite(minutes) || !Number.isFinite(seconds)) return null
    if (seconds >= 60) return null
    const secondsTotal = minutes * 60 + seconds
    return { secondsTotal, displayFormat: formatSeconds(secondsTotal) }
  }

  return null
}
