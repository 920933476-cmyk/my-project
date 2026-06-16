import type {
  EventGroup,
  GoalType,
  IntensityTier,
  SwimmingLevel,
  TrainingPhase,
  TrainingZoneId,
} from './types'

export type SessionType =
  | 'Technique'
  | 'Aerobic'
  | 'Threshold'
  | 'VO2'
  | 'RacePace'
  | 'Sprint'
  | 'Recovery'
  | 'Mixed'

export type TrainingTemplate = {
  templateId: string
  tags: {
    level: Exclude<SwimmingLevel, 'L5'>
    eventGroup: EventGroup
    goalType: GoalType
    phase: TrainingPhase
    intensityTier: IntensityTier
  }
  defaults: {
    recommendedWeeklyVolumeMultiplier: number
    maxWeeklyIncreaseRatio: number
    zoneDistribution: Array<{ zoneId: TrainingZoneId; ratio: number }>
  }
  weeklyStructure: {
    minDays: number
    maxDays: number
    pattern: SessionType[]
  }
  summaryFocus: string
  technicalFocus: string[]
  recoveryAdvice: string[]
  whyThisPlan: string[]
}

const LEVELS: Array<Exclude<SwimmingLevel, 'L5'>> = ['L1', 'L2', 'L3', 'L4']
const GROUPS: EventGroup[] = ['Sprint', 'Middle Distance', 'Distance']
const GOAL_TYPES: GoalType[] = ['成绩提升', '技术优化', '耐力发展', '速度提升', '比赛备战', '铁人三项专项']
const PHASES: TrainingPhase[] = ['Base', 'Build', 'Specific', 'Taper']
const TIERS: IntensityTier[] = ['Small', 'Medium', 'Large']

const levelMultiplier: Record<Exclude<SwimmingLevel, 'L5'>, number> = {
  L1: 0.75,
  L2: 1,
  L3: 1.15,
  L4: 1.3,
}

const phaseMultiplier: Record<TrainingPhase, number> = {
  Base: 1.05,
  Build: 1.1,
  Specific: 1.0,
  Taper: 0.82,
}

const tierMultiplier: Record<IntensityTier, number> = {
  Small: 1,
  Medium: 1.04,
  Large: 1.08,
}

const groupConfig: Record<
  EventGroup,
  {
    volumeMultiplier: number
    technicalFocus: string[]
    summaryFocus: string
    defaultPattern: Record<TrainingPhase, SessionType[]>
    defaultZones: Record<TrainingPhase, Array<{ zoneId: TrainingZoneId; ratio: number }>>
  }
> = {
  Sprint: {
    volumeMultiplier: 0.95,
    technicalFocus: ['出发与入水后加速', '划频与节奏控制', '转身后 5–7 米加速', '身体姿态紧凑与阻力管理'],
    summaryFocus: '以神经速度、比赛配速与速度耐力为主轴，强调高质量而非堆量。',
    defaultPattern: {
      Base: ['Technique', 'Aerobic', 'Threshold', 'Recovery'],
      Build: ['Technique', 'Threshold', 'RacePace', 'Sprint'],
      Specific: ['RacePace', 'Sprint', 'Technique', 'Recovery'],
      Taper: ['RacePace', 'Sprint', 'Recovery'],
    },
    defaultZones: {
      Base: [
        { zoneId: 1, ratio: 0.18 },
        { zoneId: 2, ratio: 0.38 },
        { zoneId: 3, ratio: 0.2 },
        { zoneId: 4, ratio: 0.08 },
        { zoneId: 5, ratio: 0.1 },
        { zoneId: 6, ratio: 0.06 },
      ],
      Build: [
        { zoneId: 1, ratio: 0.14 },
        { zoneId: 2, ratio: 0.28 },
        { zoneId: 3, ratio: 0.2 },
        { zoneId: 4, ratio: 0.1 },
        { zoneId: 5, ratio: 0.16 },
        { zoneId: 6, ratio: 0.12 },
      ],
      Specific: [
        { zoneId: 1, ratio: 0.16 },
        { zoneId: 2, ratio: 0.24 },
        { zoneId: 3, ratio: 0.16 },
        { zoneId: 4, ratio: 0.08 },
        { zoneId: 5, ratio: 0.2 },
        { zoneId: 6, ratio: 0.16 },
      ],
      Taper: [
        { zoneId: 1, ratio: 0.28 },
        { zoneId: 2, ratio: 0.22 },
        { zoneId: 3, ratio: 0.1 },
        { zoneId: 4, ratio: 0.06 },
        { zoneId: 5, ratio: 0.18 },
        { zoneId: 6, ratio: 0.16 },
      ],
    },
  },
  'Middle Distance': {
    volumeMultiplier: 1,
    technicalFocus: ['后程划水效率', '节奏稳定与分段控制', '转身质量与滑行长度控制', '呼吸策略与身体平衡'],
    summaryFocus: '以阈值、VO2 Max 与比赛配速协同推进，强调中后程能力。',
    defaultPattern: {
      Base: ['Aerobic', 'Technique', 'Threshold', 'Recovery'],
      Build: ['Threshold', 'VO2', 'RacePace', 'Aerobic'],
      Specific: ['Threshold', 'RacePace', 'VO2', 'Recovery'],
      Taper: ['RacePace', 'Threshold', 'Recovery'],
    },
    defaultZones: {
      Base: [
        { zoneId: 1, ratio: 0.16 },
        { zoneId: 2, ratio: 0.4 },
        { zoneId: 3, ratio: 0.22 },
        { zoneId: 4, ratio: 0.1 },
        { zoneId: 5, ratio: 0.08 },
        { zoneId: 6, ratio: 0.04 },
      ],
      Build: [
        { zoneId: 1, ratio: 0.12 },
        { zoneId: 2, ratio: 0.26 },
        { zoneId: 3, ratio: 0.28 },
        { zoneId: 4, ratio: 0.14 },
        { zoneId: 5, ratio: 0.14 },
        { zoneId: 6, ratio: 0.06 },
      ],
      Specific: [
        { zoneId: 1, ratio: 0.16 },
        { zoneId: 2, ratio: 0.22 },
        { zoneId: 3, ratio: 0.24 },
        { zoneId: 4, ratio: 0.12 },
        { zoneId: 5, ratio: 0.2 },
        { zoneId: 6, ratio: 0.06 },
      ],
      Taper: [
        { zoneId: 1, ratio: 0.24 },
        { zoneId: 2, ratio: 0.22 },
        { zoneId: 3, ratio: 0.16 },
        { zoneId: 4, ratio: 0.08 },
        { zoneId: 5, ratio: 0.22 },
        { zoneId: 6, ratio: 0.08 },
      ],
    },
  },
  Distance: {
    volumeMultiplier: 1.12,
    technicalFocus: ['动作经济性与放松', '长距离节奏与配速控制', '稳定转身节奏', '低强度高质量技术巩固'],
    summaryFocus: '以有氧容量、阈值与清乳酸能力为主，强调稳定输出与动作经济性。',
    defaultPattern: {
      Base: ['Aerobic', 'Aerobic', 'Technique', 'Threshold', 'Recovery'],
      Build: ['Aerobic', 'Threshold', 'VO2', 'RacePace', 'Recovery'],
      Specific: ['Threshold', 'RacePace', 'Aerobic', 'Recovery'],
      Taper: ['RacePace', 'Aerobic', 'Recovery'],
    },
    defaultZones: {
      Base: [
        { zoneId: 1, ratio: 0.14 },
        { zoneId: 2, ratio: 0.48 },
        { zoneId: 3, ratio: 0.22 },
        { zoneId: 4, ratio: 0.06 },
        { zoneId: 5, ratio: 0.07 },
        { zoneId: 6, ratio: 0.03 },
      ],
      Build: [
        { zoneId: 1, ratio: 0.12 },
        { zoneId: 2, ratio: 0.34 },
        { zoneId: 3, ratio: 0.26 },
        { zoneId: 4, ratio: 0.1 },
        { zoneId: 5, ratio: 0.14 },
        { zoneId: 6, ratio: 0.04 },
      ],
      Specific: [
        { zoneId: 1, ratio: 0.16 },
        { zoneId: 2, ratio: 0.3 },
        { zoneId: 3, ratio: 0.22 },
        { zoneId: 4, ratio: 0.08 },
        { zoneId: 5, ratio: 0.18 },
        { zoneId: 6, ratio: 0.06 },
      ],
      Taper: [
        { zoneId: 1, ratio: 0.26 },
        { zoneId: 2, ratio: 0.28 },
        { zoneId: 3, ratio: 0.14 },
        { zoneId: 4, ratio: 0.06 },
        { zoneId: 5, ratio: 0.18 },
        { zoneId: 6, ratio: 0.08 },
      ],
    },
  },
}

const goalAdjustments: Record<
  GoalType,
  {
    volumeMultiplier: number
    patternShift?: Partial<Record<TrainingPhase, SessionType[]>>
    why: string[]
  }
> = {
  成绩提升: {
    volumeMultiplier: 1,
    why: ['围绕成绩提升，优先保证关键主课质量，并让周结构与专项能力匹配。'],
  },
  技术优化: {
    volumeMultiplier: 0.92,
    patternShift: {
      Base: ['Technique', 'Aerobic', 'Technique', 'Recovery'],
      Build: ['Technique', 'Threshold', 'Technique', 'Recovery'],
    },
    why: ['技术优化优先，因此增加技术课权重，并降低无效高强度累积。'],
  },
  耐力发展: {
    volumeMultiplier: 1.08,
    patternShift: {
      Base: ['Aerobic', 'Aerobic', 'Threshold', 'Recovery'],
      Build: ['Aerobic', 'Threshold', 'Aerobic', 'Recovery'],
    },
    why: ['耐力发展目标下，增加 Zone 2/3 比例，用于建立稳定输出能力。'],
  },
  速度提升: {
    volumeMultiplier: 0.96,
    patternShift: {
      Build: ['Sprint', 'RacePace', 'Technique', 'Recovery'],
      Specific: ['Sprint', 'RacePace', 'Recovery'],
    },
    why: ['速度提升目标下，提高 Zone 5/6 出现频率，强调神经速度与配速控制。'],
  },
  比赛备战: {
    volumeMultiplier: 0.98,
    patternShift: {
      Specific: ['RacePace', 'RacePace', 'Threshold', 'Recovery'],
      Taper: ['RacePace', 'Sprint', 'Recovery'],
    },
    why: ['比赛备战目标下，优先安排比赛配速与赛前节奏适应训练。'],
  },
  铁人三项专项: {
    volumeMultiplier: 1.02,
    patternShift: {
      Base: ['Aerobic', 'Technique', 'Aerobic', 'Recovery'],
      Build: ['Aerobic', 'Threshold', 'Technique', 'Recovery'],
    },
    why: ['铁三专项下，优先稳定有氧与动作经济性，避免过高无氧负荷。'],
  },
}

function makeTemplate(
  level: Exclude<SwimmingLevel, 'L5'>,
  eventGroup: EventGroup,
  goalType: GoalType,
  phase: TrainingPhase,
  intensityTier: IntensityTier,
): TrainingTemplate {
  const group = groupConfig[eventGroup]
  const goal = goalAdjustments[goalType]
  const pattern = goal.patternShift?.[phase] ?? group.defaultPattern[phase]
  const volumeMultiplier =
    levelMultiplier[level] *
    group.volumeMultiplier *
    phaseMultiplier[phase] *
    goal.volumeMultiplier *
    tierMultiplier[intensityTier]

  return {
    templateId: `${level}_${eventGroup.replace(/\s+/g, '')}_${goalType}_${phase}_${intensityTier}_v1`,
    tags: { level, eventGroup, goalType, phase, intensityTier },
    defaults: {
      recommendedWeeklyVolumeMultiplier: Number(volumeMultiplier.toFixed(3)),
      maxWeeklyIncreaseRatio: phase === 'Taper' ? 0 : 0.1,
      zoneDistribution: group.defaultZones[phase],
    },
    weeklyStructure: {
      minDays: 2,
      maxDays: level === 'L4' ? 8 : level === 'L3' ? 6 : 4,
      pattern,
    },
    summaryFocus: group.summaryFocus,
    technicalFocus: group.technicalFocus,
    recoveryAdvice: [
      '保证 7–9 小时睡眠，关键训练日前后优先恢复。',
      phase === 'Taper' ? '减量期优先保持节奏感与神经速度，不追求疲劳堆积。' : '关键训练后安排主动恢复与放松游，避免疲劳累积失控。',
      goalType === '技术优化' ? '训练后复盘动作感受，优先记录技术变化。' : '关注主观疲劳、晨脉与肩腰髋膝踝状态。',
    ],
    whyThisPlan: [...goal.why, `${phase} 阶段下，本周结构围绕“${pattern.join(' / ')}”展开。`, group.summaryFocus],
  }
}

export const TEMPLATE_REGISTRY: TrainingTemplate[] = LEVELS.flatMap((level) =>
  GROUPS.flatMap((eventGroup) =>
    GOAL_TYPES.flatMap((goalType) =>
      PHASES.flatMap((phase) => TIERS.map((intensityTier) => makeTemplate(level, eventGroup, goalType, phase, intensityTier))),
    ),
  ),
)

export function selectTemplateFromRegistry(input: {
  level: Exclude<SwimmingLevel, 'L5'>
  eventGroup: EventGroup
  goalType: GoalType
  phase: TrainingPhase
  intensityTier: IntensityTier
}): TrainingTemplate {
  const exact = TEMPLATE_REGISTRY.find(
    (template) =>
      template.tags.level === input.level &&
      template.tags.eventGroup === input.eventGroup &&
      template.tags.goalType === input.goalType &&
      template.tags.phase === input.phase &&
      template.tags.intensityTier === input.intensityTier,
  )

  if (!exact) {
    throw new Error(`Template not found for ${JSON.stringify(input)}`)
  }

  return exact
}

