export type Stroke = 'Freestyle' | 'Backstroke' | 'Breaststroke' | 'Butterfly' | 'IM' | 'General'

export type DrillCategory =
  | 'Breathing'
  | 'BodyPosition'
  | 'Catch'
  | 'Pull'
  | 'Kick'
  | 'Recovery'
  | 'Rotation'
  | 'Technique'
  | 'Coordination'

export type SwimmingLevel = 'L1' | 'L2' | 'L3' | 'L4' | 'L5'

export type EventGroup = 'Sprint' | 'Middle Distance' | 'Distance'

export type GoalType = '成绩提升' | '技术优化' | '耐力发展' | '速度提升' | '比赛备战' | '铁人三项专项'

export type Injury = '无' | '肩部' | '腰部' | '膝关节' | '踝关节'

export type Drill = {
  id: string

  nameEn: string
  nameZh: string

  stroke: Stroke

  category: DrillCategory

  description: string

  purpose: string[]

  keyPoints: string[]

  commonErrors: string[]

  suitableLevels: SwimmingLevel[]

  eventGroups: EventGroup[]

  goalTypes: GoalType[]

  recommendedEquipment: string[]

  avoidForInjuries?: Injury[]

  source?: string

  difficulty: 1 | 2 | 3 | 4 | 5
}

