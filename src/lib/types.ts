export type Gender = '男' | '女' | '其他'
export type PoolLength = '25m' | '50m' | '25y'
export type Injury = '无' | '肩部' | '腰部' | '膝关节' | '踝关节' | '其他'

export type SwimmingLevel = 'L1' | 'L2' | 'L3' | 'L4' | 'L5'

export type SwimmingEvent =
  | '50 Free'
  | '100 Free'
  | '200 Free'
  | '400 Free'
  | '800 Free'
  | '1500 Free'
  | '100 Back'
  | '200 Back'
  | '100 Breast'
  | '200 Breast'
  | '100 Fly'
  | '200 Fly'
  | '200 IM'
  | '400 IM'

export type GoalType =
  | '成绩提升'
  | '技术优化'
  | '耐力发展'
  | '速度提升'
  | '比赛备战'
  | '铁人三项专项'

export type TrainingPhase = 'Base' | 'Build' | 'Specific' | 'Taper'

export type EventGroup = 'Sprint' | 'Middle Distance' | 'Distance'

export type IntensityTier = 'Small' | 'Medium' | 'Large'

export type Equipment =
  | '浮板'
  | '划手掌'
  | '浮腿夹'
  | '脚蹼'
  | '呼吸管'
  | 'Tempo Trainer'

export type TrainingZoneId = 1 | 2 | 3 | 4 | 5 | 6

export type TrainingZone = {
  zoneId: TrainingZoneId
  nameZh: string
  nameEn: string
  purpose: string
  intensityHint: string
}

export type PlanFormState = {
  age: number | ''
  gender: Gender
  trainingExperienceMonths: number | ''
  level: Exclude<SwimmingLevel, 'L5'>
  event: SwimmingEvent
  goalType: GoalType
  currentTimeInput: string
  goalTimeInput: string
  targetDate: string
  poolLength: PoolLength
  weeklyDistanceMeters: number | ''
  trainingDaysPerWeek: number | ''
  trainingDurationPerSessionMinutes: number | ''
  availableEquipment: Equipment[]
  injury: Injury
}

export type WeeklySession = {
  dayIndex: number
  title: string
  focus: string
  totalMeters: number
  blocks: Array<{
    label: string
    zone?: TrainingZoneId
    sets: string[]
  }>
}

export type TrainingPlanResult = {
  templateId: string
  trainingSummary: string[]
  recommendedWeeklyVolumeMeters: number
  trainingZones: TrainingZone[]
  weeklyTrainingPlan: WeeklySession[]
  technicalFocus: string[]
  drylandTrainingAdvice: string[]
  recoveryAdvice: string[]
  whyThisPlan: string[]
  meta: {
    mode: 'rule_based'
    derived: {
      eventGroup: EventGroup
      phase: TrainingPhase
      weeksToTarget: number | null
      improvementRatio: number | null
      intensityTier: IntensityTier | null
    }
    notes: string[]
  }
}

export const LEVEL_LABEL: Record<Exclude<SwimmingLevel, 'L5'>, string> = {
  L1: 'Level 1 - Learn to Swim',
  L2: 'Level 2 - Fitness Swimmer',
  L3: 'Level 3 - Competitive Swimmer',
  L4: 'Level 4 - Performance Swimmer',
}
