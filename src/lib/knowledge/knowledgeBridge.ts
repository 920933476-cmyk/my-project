import type {
  DrillEntry,
  DrillPurpose,
  ErrorEntry,
  ErrorCategory,
  IntervalEntry,
  IntervalUseCase,
  ModifierEntry,
  ModifierType,
  StrokeType,
  TrainingPhase,
  Zone,
  ZoneEntry,
} from './REGISTRY_SCHEMA'
import { drillRegistry } from './drillRegistry'
import { errorRegistry } from './errorRegistry'
import { intervalRegistry } from './intervalRegistry'
import { modifierRegistry } from './modifierRegistry'
import { templateRegistry, type TrainingTemplate } from './templateRegistry'
import { volumeRegistry } from './volumeRegistry'
import { zoneRegistry } from './zoneRegistry'

type KnowledgeLevel = 'L1' | 'L2' | 'L3' | 'L4'

function normalize(value: string) {
  return value.trim().toLowerCase()
}

function includesNormalized(haystack: string, needle: string) {
  return normalize(haystack).includes(normalize(needle))
}

function matchesStringArray(values: string[] | undefined, keyword: string) {
  if (!values || values.length === 0) return false
  return values.some((value) => includesNormalized(value, keyword))
}

function matchesZone(entryZones: Zone[] | undefined, zone: string) {
  if (!entryZones || entryZones.length === 0) return false
  return entryZones.some((entryZone) => normalize(entryZone) === normalize(zone))
}

function isLevelSuffix(id: string, level: KnowledgeLevel) {
  return normalize(id).endsWith(`-${normalize(level)}`)
}

function matchesError(entry: ErrorEntry, errorType: string) {
  return (
    normalize(entry.category) === normalize(errorType) ||
    includesNormalized(entry.id, errorType) ||
    includesNormalized(entry.name, errorType) ||
    includesNormalized(entry.nameZh, errorType) ||
    matchesStringArray(entry.tags, errorType)
  )
}

function matchesDrillGoal(entry: DrillEntry, goal: string) {
  return (
    matchesStringArray(entry.purpose, goal) ||
    matchesStringArray(entry.tags, goal) ||
    includesNormalized(entry.name, goal) ||
    includesNormalized(entry.nameZh, goal)
  )
}

function resolveCorrectionDrills(drillRefs: string[]) {
  return drillRegistry.filter((drill) =>
    drillRefs.some(
      (ref) =>
        normalize(drill.id) === normalize(ref) ||
        normalize(drill.name) === normalize(ref) ||
        normalize(drill.nameZh) === normalize(ref),
    ),
  )
}

export const knowledgeBridge = {
  getDrillsByGoal(goal: string): DrillEntry[] {
    return drillRegistry.filter((entry) => matchesDrillGoal(entry, goal))
  },

  getDrillsByStroke(stroke: StrokeType): DrillEntry[] {
    return drillRegistry.filter(
      (entry) => entry.strokes.includes(stroke) || entry.strokes.includes('all'),
    )
  },

  getDrillsByLevel(level: KnowledgeLevel): DrillEntry[] {
    return drillRegistry.filter((entry) => entry.level === level)
  },

  getDrillsByPurpose(purpose: DrillPurpose): DrillEntry[] {
    return drillRegistry.filter((entry) => entry.purpose.includes(purpose))
  },

  getErrorCorrections(errorType: string): ErrorEntry[] {
    return errorRegistry.filter((entry) => matchesError(entry, errorType))
  },

  getErrorsByCategory(category: ErrorCategory): ErrorEntry[] {
    return errorRegistry.filter((entry) => entry.category === category)
  },

  getCorrectionDrillsForError(errorType: string): DrillEntry[] {
    const matchedErrors = this.getErrorCorrections(errorType)
    return resolveCorrectionDrills(matchedErrors.flatMap((entry) => entry.correctionDrills))
  },

  getInterval(zone: Zone, duration?: string): IntervalEntry | undefined {
    return intervalRegistry.find(
      (entry) =>
        matchesZone(entry.recommendedZones, zone) &&
        (!duration || normalize(entry.duration) === normalize(duration)),
    )
  },

  getIntervalsByUseCase(useCase: IntervalUseCase): IntervalEntry[] {
    return intervalRegistry.filter((entry) => entry.useCases.includes(useCase))
  },

  getIntervalsByZone(zone: Zone): IntervalEntry[] {
    return intervalRegistry.filter((entry) => matchesZone(entry.recommendedZones, zone))
  },

  getVolume(level: KnowledgeLevel, phase: TrainingPhase) {
    return volumeRegistry.find((entry) => entry.phase === phase && isLevelSuffix(entry.id, level))
  },

  getModifiers(type: ModifierType): ModifierEntry[] {
    return modifierRegistry.filter((entry) => entry.type === type)
  },

  getModifiersForStroke(type: ModifierType, stroke: StrokeType): ModifierEntry[] {
    return modifierRegistry.filter(
      (entry) =>
        entry.type === type &&
        (entry.applicableTo.includes(stroke) || entry.applicableTo.includes('all')),
    )
  },

  getZone(zoneId: string): ZoneEntry | undefined {
    return zoneRegistry.find(
      (entry) =>
        normalize(entry.id) === normalize(zoneId) ||
        normalize(entry.zone) === normalize(zoneId),
    )
  },

  getTemplatesByLevel(level: KnowledgeLevel): TrainingTemplate[] {
    return templateRegistry.filter((entry) => entry.level === level)
  },

  getTemplatesByGoal(goal: string): TrainingTemplate[] {
    return templateRegistry.filter(
      (entry) =>
        includesNormalized(entry.goal, goal) ||
        includesNormalized(entry.name, goal) ||
        includesNormalized(entry.nameZh, goal),
    )
  },

  getTemplatesByStroke(stroke: string): TrainingTemplate[] {
    return templateRegistry.filter((entry) =>
      entry.applicableStrokes?.some((value) => includesNormalized(value, stroke)),
    )
  },
}
