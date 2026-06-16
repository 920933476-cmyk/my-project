import type { TrainingPhase } from './types'

export type TrainingPhaseResult = {
  weeksToTarget: number
  phase: TrainingPhase
}

function parseDateOnlyToUtc(dateString: string): Date | null {
  const match = dateString.trim().match(/^(\d{4})-(\d{2})-(\d{2})$/)
  if (!match) return null

  const year = Number(match[1])
  const month = Number(match[2])
  const day = Number(match[3])
  const date = new Date(Date.UTC(year, month - 1, day))

  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return null
  }

  return date
}

function toUtcStartOfDay(date: Date): Date {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()))
}

function resolvePhase(weeksToTarget: number): TrainingPhase {
  if (weeksToTarget >= 16) return 'Base'
  if (weeksToTarget >= 8) return 'Build'
  if (weeksToTarget >= 4) return 'Specific'
  return 'Taper'
}

export function calculateTrainingPhase(
  targetDate: string,
  now: Date = new Date(),
): TrainingPhaseResult | null {
  const target = parseDateOnlyToUtc(targetDate)
  if (!target) return null

  const today = toUtcStartOfDay(now)
  const weeksRaw = (target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24 * 7)
  const weeksToTarget = Math.round(weeksRaw * 10) / 10

  return {
    weeksToTarget,
    phase: resolvePhase(weeksToTarget),
  }
}

