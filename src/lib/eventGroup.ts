import type { EventGroup, SwimmingEvent } from './types'

const SPRINT_EVENTS = new Set<SwimmingEvent>([
  '50 Free',
  '100 Free',
  '100 Fly',
  '100 Back',
  '100 Breast',
])

const MIDDLE_DISTANCE_EVENTS = new Set<SwimmingEvent>([
  '200 Free',
  '400 Free',
  '200 Fly',
  '200 Back',
  '200 Breast',
  '200 IM',
])

export function classifyEventGroup(event: SwimmingEvent): EventGroup {
  if (SPRINT_EVENTS.has(event)) return 'Sprint'
  if (MIDDLE_DISTANCE_EVENTS.has(event)) return 'Middle Distance'
  return 'Distance'
}

