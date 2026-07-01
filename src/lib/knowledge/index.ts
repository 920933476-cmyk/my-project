// Registry Schema
export * from './REGISTRY_SCHEMA'

// Core Registries
export { drillRegistry } from './drillRegistry'
export { errorRegistry } from './errorRegistry'
export { strokeRegistry, strokeModifiers } from './strokeRegistry'

// Training Configuration
export { intervalRegistry } from './intervalRegistry'
export { volumeRegistry } from './volumeRegistry'
export { zoneRegistry } from './zoneRegistry'

// Personalization
export { modifierRegistry } from './modifierRegistry'
export { recoveryRegistry } from './recoveryRegistry'

// Templates
export { templateRegistry } from './templateRegistry'
export { knowledgeBridge } from './knowledgeBridge'

// Zone Helper Functions
export {
  getZoneByFeel,
  getZoneByStroke,
  getZoneColor,
  getZoneByHrPercentage,
  getZoneByLactate,
  getZoneDistributionByPhase
} from './zoneRegistry'

// Template Helper Functions
export {
  getTemplatesByType,
  getTemplatesByLevel,
  getTemplatesByStroke,
  getTemplatesByPhase,
  getTemplatesByGoal,
  getTemplateZoneSummary,
  calculateTemplateVolume
} from './templateRegistry'
