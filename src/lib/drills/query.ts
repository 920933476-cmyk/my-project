import type { Drill, EventGroup, GoalType, Injury, SwimmingLevel } from './types'
import { DRILL_REGISTRY } from './drillRegistry'

export type RecommendDrillParams = {
  level: SwimmingLevel
  eventGroup: EventGroup
  goalType: GoalType
  injury: Injury
  limit?: number
}

function maxDifficultyForLevel(level: SwimmingLevel): 1 | 2 | 3 | 4 | 5 {
  if (level === 'L1') return 2
  if (level === 'L2') return 3
  if (level === 'L3') return 4
  return 5 // L4 / L5
}

function safeLimit(limit: number | undefined) {
  if (typeof limit !== 'number') return 3
  if (!Number.isFinite(limit)) return 3
  return Math.max(0, Math.min(20, Math.floor(limit)))
}

function applyFilterWithFallback<T>(source: T[], filterFn: (item: T) => boolean): T[] {
  const filtered = source.filter(filterFn)
  return filtered.length > 0 ? filtered : source
}

function scoreDrill(drill: Drill, params: RecommendDrillParams) {
  const allLevels = drill.suitableLevels as readonly SwimmingLevel[]
  const allGoals = drill.goalTypes as readonly GoalType[]
  const allEvents = drill.eventGroups as readonly EventGroup[]
  const levelMatch = allLevels.includes(params.level) ? 1 : 0
  const goalMatch = allGoals.includes(params.goalType) ? 1 : 0
  const eventMatch = allEvents.includes(params.eventGroup) ? 1 : 0
  const injuryPenalty = 0

  return levelMatch * 5 + goalMatch * 4 + eventMatch * 3 - injuryPenalty
}

export function getRecommendedDrills(params: RecommendDrillParams): Drill[] {
  const limit = safeLimit(params.limit)
  if (limit === 0) return []

  const maxDifficulty = maxDifficultyForLevel(params.level)

  const allLevels = params.level as SwimmingLevel
  const allGoals = params.goalType as GoalType
  const allEvents = params.eventGroup as EventGroup

  let candidates = DRILL_REGISTRY.slice()

  candidates = candidates.filter((d) => (d.suitableLevels as readonly SwimmingLevel[]).includes(allLevels))
  candidates = applyFilterWithFallback(candidates, (d) => (d.eventGroups as readonly EventGroup[]).includes(allEvents))
  candidates = applyFilterWithFallback(candidates, (d) => (d.goalTypes as readonly GoalType[]).includes(allGoals))
  candidates = candidates.filter((d) => !(d.avoidForInjuries as readonly Injury[] | undefined)?.includes(params.injury))
  candidates = candidates.filter((d) => d.difficulty <= maxDifficulty)

  return candidates
    .slice()
    .sort((a, b) => {
      const scoreA = scoreDrill(a, params)
      const scoreB = scoreDrill(b, params)
      if (scoreA !== scoreB) return scoreB - scoreA
      if (a.difficulty !== b.difficulty) return a.difficulty - b.difficulty
      return a.id.localeCompare(b.id)
    })
    .slice(0, limit)
}
