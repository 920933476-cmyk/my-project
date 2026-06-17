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
  hrHint: string
  restSuggestion: string
  paceSuggestion: string
  estimatedDurationHint: string
  rpeRange: string
}

export type RPE = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

export type TrainingSet = {
  /** 单次距离，单位米 */
  distanceMeters: number
  /** 重复次数，如 4×50m 中的 4 */
  repetitions: number
  /** 泳姿/练习形式，如 自由泳 / 自由腿 / 自由泳+仰泳 */
  stroke: string
  /** Drill 或动作名称 */
  drillName: string
  /** 训练 Zone（1-6） */
  zone: TrainingZoneId
  /** 配速目标 */
  paceTarget: string
  /** 心率范围 */
  heartRateRange: string
  /** 间歇时间（秒） */
  restSeconds: number
  /** 出发间隔（秒） */
  sendOffIntervalSeconds: number
  /** 预计完成该组总时长（秒） */
  estimatedDurationSeconds: number
  /** 主观疲劳度 1-10 */
  rpe: RPE
  /** 推荐 Drill ID 列表 */
  drillIds: string[]
  /** 技术要点 */
  techniqueCues: string[]
  /** 备注说明，如 自由腿/仰腿交替 */
  note?: string
}

export type TrainingBlock = {
  label: string
  zone?: TrainingZoneId
  /** 所有训练块统一输出为可执行训练明细 */
  sets: TrainingSet[]
  /** 整块说明文字（可选） */
  note?: string
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
  estimatedDurationMinutes: number
  blocks: TrainingBlock[]
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

/** 游泳 Drill（来自 drillRegistry.ts） */
export type Drill = {
  id: string
  nameEn: string
  nameZh: string
  stroke: string
  category: string
  description: string
  purpose: string[]
  keyPoints: string[]
  commonErrors: string[]
  suitableLevels: Array<Exclude<SwimmingLevel, 'L5'>>
  eventGroups: EventGroup[]
  goalTypes: GoalType[]
  recommendedEquipment: string[]
  avoidForInjuries: string[]
  source: string
  difficulty: number
}

/** 游泳错误模式（来自 errorRegistry.ts） */
export type ErrorPattern = {
  id: string
  nameZh: string
  nameEn: string
  stroke: string
  category: string
  symptom: string
  rootCauses: string[]
  performanceImpact: string[]
  correctionPrinciples: string[]
  recommendedDrills: string[]
  relatedErrors: string[]
  difficulty: number
}

/** Drill 查询过滤器 */
export type DrillQuery = {
  level?: SwimmingLevel
  eventGroup?: EventGroup
  goalType?: GoalType
  stroke?: string
  category?: string
  injury?: Injury
}
