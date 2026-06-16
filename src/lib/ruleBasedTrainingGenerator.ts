import { classifyEventGroup } from './eventGroup'
import { parseTimeInput } from './time'
import { selectTemplateFromRegistry, type SessionType } from './templateRegistry'
import { calculateTrainingPhase } from './trainingPhase'
import type {
  EventGroup,
  GoalType,
  IntensityTier,
  PlanFormState,
  PoolLength,
  TrainingPlanResult,
  TrainingZoneId,
  WeeklySession,
} from './types'
import { ZONE_FRAMEWORK } from './zoneFramework'

type GeneratorOptions = {
  now: Date
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n))
}

function getIntensityTier(improvementRatio: number | null): IntensityTier {
  if (improvementRatio === null || improvementRatio <= 0.02) return 'Small'
  if (improvementRatio <= 0.06) return 'Medium'
  return 'Large'
}

function getCurrentWeeklyVolume(form: PlanFormState) {
  return typeof form.weeklyDistanceMeters === 'number' ? form.weeklyDistanceMeters : 0
}

function calculateRecommendedWeeklyVolume(
  form: PlanFormState,
  eventGroup: EventGroup,
  phase: TrainingPlanResult['meta']['derived']['phase'],
  intensityTier: IntensityTier,
  templateMultiplier: number,
): { recommendedWeeklyVolumeMeters: number; notes: string[] } {
  const notes: string[] = []
  const currentWeeklyVolume = getCurrentWeeklyVolume(form)
  const currentDays = typeof form.trainingDaysPerWeek === 'number' ? form.trainingDaysPerWeek : 3
  const sessionMinutes = typeof form.trainingDurationPerSessionMinutes === 'number' ? form.trainingDurationPerSessionMinutes : 60
  const capacityByTime = currentDays * sessionMinutes * 55
  const minByLevel = form.level === 'L1' ? 800 : form.level === 'L2' ? 1800 : form.level === 'L3' ? 3200 : 4500
  const groupBase = eventGroup === 'Sprint' ? 2800 : eventGroup === 'Middle Distance' ? 3800 : 4500

  const baseReference = currentWeeklyVolume > 0 ? currentWeeklyVolume : Math.max(minByLevel, groupBase)
  let recommended = Math.round((baseReference * templateMultiplier) / 100) * 100

  if (currentWeeklyVolume > 0 && phase !== 'Taper') {
    const maxSafe = Math.round((currentWeeklyVolume * 1.1) / 100) * 100
    if (recommended > maxSafe) {
      recommended = maxSafe
      notes.push('推荐周量已按安全增量上限控制在当前周量的 110% 以内。')
    }
  }

  if (phase === 'Taper' && currentWeeklyVolume > 0) {
    const taperVolume = Math.round((currentWeeklyVolume * 0.82) / 100) * 100
    recommended = Math.min(recommended, taperVolume)
    notes.push('减量阶段已主动下调总量，同时保留关键强度刺激。')
  }

  if (recommended > capacityByTime) {
    recommended = Math.round(capacityByTime / 100) * 100
    notes.push('已根据训练天数与单次时长下调推荐周量，优先保证可执行性。')
  }

  if (form.injury !== '无') {
    const reduced = Math.round((recommended * 0.92) / 100) * 100
    if (reduced < recommended) {
      recommended = reduced
      notes.push('已根据伤病限制适度下调周量，减少恢复压力。')
    }
  }

  if (intensityTier === 'Large' && phase !== 'Taper') {
    notes.push('目标差距较大，建议优先保证关键主课质量，而非盲目加量。')
  }

  recommended = clamp(recommended, minByLevel, form.level === 'L4' ? 32000 : 22000)

  return {
    recommendedWeeklyVolumeMeters: recommended,
    notes,
  }
}

function adaptPattern(pattern: SessionType[], days: number): SessionType[] {
  if (days <= pattern.length) return pattern.slice(0, days)

  const result = [...pattern]
  while (result.length < days) {
    const insert = result.includes('Recovery') ? 'Technique' : 'Recovery'
    result.push(insert)
  }
  return result
}

function getPoolStep(poolLength: PoolLength) {
  if (poolLength === '50m') return 100
  if (poolLength === '25y') return 75
  return 50
}

function roundToPool(value: number, poolLength: PoolLength) {
  const step = getPoolStep(poolLength)
  return Math.max(step, Math.round(value / step) * step)
}

function getSessionBlueprint(sessionType: SessionType, group: EventGroup, goalType: GoalType) {
  const common: Record<SessionType, { focus: string; zone: TrainingZoneId; label: string }> = {
    Technique: { focus: '动作质量与水感', zone: 1, label: '技术主课' },
    Aerobic: { focus: '稳定节奏与有氧容量', zone: 2, label: '有氧主课' },
    Threshold: { focus: '阈值与持续输出', zone: 3, label: '阈值主课' },
    VO2: { focus: '高强度维持与氧利用', zone: 4, label: 'VO2 主课' },
    RacePace: { focus: '比赛配速适应', zone: 5, label: '比赛配速主课' },
    Sprint: { focus: '神经速度与爆发', zone: 6, label: '冲刺主课' },
    Recovery: { focus: '恢复与动作经济性', zone: 1, label: '恢复主课' },
    Mixed: { focus: '综合能力整合', zone: 3, label: '综合主课' },
  }

  const base = common[sessionType]
  const focusByGoal: Record<GoalType, string> = {
    成绩提升: `${base.focus}，围绕提升成绩进行结构化推进`,
    技术优化: `${base.focus}，本节优先保证动作路径与效率`,
    耐力发展: `${base.focus}，强调持续输出与容量积累`,
    速度提升: `${base.focus}，强调快节奏与短时高质量`,
    比赛备战: `${base.focus}，重点贴近比赛节奏`,
    铁人三项专项: `${base.focus}，优先稳定节奏与动作经济性`,
  }

  return {
    ...base,
    focus: `${focusByGoal[goalType]}（${group}）`,
  }
}

function buildMainSets(
  sessionType: SessionType,
  zone: TrainingZoneId,
  poolLength: PoolLength,
  sessionMeters: number,
  form: PlanFormState,
): string[] {
  const step = getPoolStep(poolLength)
  const repeatDistance = roundToPool(sessionMeters * 0.22, poolLength)
  const longDistance = roundToPool(sessionMeters * 0.36, poolLength)
  const shortDistance = roundToPool(Math.max(step, sessionMeters * 0.12), poolLength)
  const useTempoTrainer = form.availableEquipment.includes('Tempo Trainer')
  const useSnorkel = form.availableEquipment.includes('呼吸管')
  const useFins = form.availableEquipment.includes('脚蹼')
  const usePaddles = form.availableEquipment.includes('划手掌') && form.injury !== '肩部'

  const byType: Record<SessionType, string[]> = {
    Technique: [
      `8×${step} 技术练习：单臂 / 抱水路径 / 身体姿态，每组专注一个技术点`,
      useSnorkel ? `4×${step} 呼吸管配合节奏游，保持身体线条稳定` : `4×${step} 低强度节奏游，专注换气时机与头位控制`,
    ],
    Aerobic: [
      `${Math.max(4, Math.round(longDistance / step))}×${step} Zone 2 持续游，组间短休保持稳定节奏`,
      `1×${longDistance} 连续游，后半程保持技术完整与呼吸控制`,
    ],
    Threshold: [
      `${Math.max(5, Math.round(repeatDistance / step))}×${step} Zone 3 阈值组，组间控制短休`,
      `4×${shortDistance} 负分段完成，后半程维持动作质量`,
    ],
    VO2: [
      `6×${step} Zone 4 高质量输出，组间充分恢复`,
      `4×${shortDistance} 高速完成，目标是维持高强度动作质量`,
    ],
    RacePace: [
      `8×${shortDistance} Zone 5 比赛配速，严格按目标节奏出发`,
      useTempoTrainer ? `Tempo Trainer 控节奏完成 4×${step} Race Pace 练习` : `4×${step} 比赛配速分段，关注出发与转身后节奏`,
    ],
    Sprint: [
      `10×${shortDistance} Zone 6 全力短冲，组间完全恢复`,
      useFins ? `6×${step} 脚蹼加速，强化高速水感` : `6×${step} 无脚蹼高质量冲刺，重视前 15 米速度`,
    ],
    Recovery: [
      `6×${step} Zone 1 轻松游，拉长动作与呼吸节奏`,
      `4×${shortDistance} 技术放松游，控制动作松弛`,
    ],
    Mixed: [
      `4×${step} Zone 2 + 4×${step} Zone 3 组合，逐步提速`,
      usePaddles ? `4×${shortDistance} 小体量划手掌组，高质量完成` : `4×${shortDistance} 徒手节奏组，避免过度拉力刺激`,
    ],
  }

  return byType[sessionType]
}

function buildWeeklyPlan(
  form: PlanFormState,
  eventGroup: EventGroup,
  goalType: GoalType,
  pattern: SessionType[],
  recommendedWeeklyVolumeMeters: number,
): WeeklySession[] {
  const days = clamp(typeof form.trainingDaysPerWeek === 'number' ? form.trainingDaysPerWeek : 3, 1, 8)
  const finalPattern = adaptPattern(pattern, days)
  const baseSessionMeters = recommendedWeeklyVolumeMeters / days

  return finalPattern.map((sessionType, index) => {
    const blueprint = getSessionBlueprint(sessionType, eventGroup, goalType)
    const intensityWeight =
      sessionType === 'Recovery' ? 0.82 : sessionType === 'Technique' ? 0.92 : sessionType === 'Aerobic' ? 1 : 1.06
    const sessionMeters = roundToPool(baseSessionMeters * intensityWeight, form.poolLength)
    const warmMeters = roundToPool(sessionMeters * 0.25, form.poolLength)
    const skillMeters = roundToPool(sessionMeters * 0.18, form.poolLength)
    const coolDownMeters = roundToPool(Math.max(getPoolStep(form.poolLength), sessionMeters * 0.12), form.poolLength)

    return {
      dayIndex: index + 1,
      title: `Day ${index + 1}｜${blueprint.label}`,
      focus: blueprint.focus,
      totalMeters: sessionMeters,
      blocks: [
        {
          label: '热身',
          zone: 2,
          sets: [`热身 ${warmMeters}m：轻松游 + 打腿 + 配速递增`, `4×${getPoolStep(form.poolLength)} 技术准备，唤醒节奏感`],
        },
        {
          label: '技术',
          zone: 1,
          sets: [`技术 ${skillMeters}m：单臂 / 低阻力滑行 / 身体姿态`, `动作要求：以“轻、长、稳”为优先`],
        },
        {
          label: '主集',
          zone: blueprint.zone,
          sets: buildMainSets(sessionType, blueprint.zone, form.poolLength, sessionMeters, form),
        },
        {
          label: '放松',
          zone: 1,
          sets: [`放松 ${coolDownMeters}m：轻松游 + 节奏恢复`, '训练后 5–10 分钟拉伸肩背、髋与踝'],
        },
      ],
    }
  })
}

function deriveTechnicalFocus(form: PlanFormState, eventGroup: EventGroup, baseFocus: string[]): string[] {
  const focus = [...baseFocus]
  if (form.injury === '肩部') focus.unshift('肩部限制下优先降低拉力负荷，关注肩胛控制与划水路径')
  if (form.goalType === '技术优化') focus.unshift('本周期以“动作效率优先于速度结果”为首要原则')
  return focus.slice(0, 5)
}

function deriveRecoveryAdvice(form: PlanFormState, templateRecoveryAdvice: string[]): string[] {
  const injuryAdvice: Record<PlanFormState['injury'], string[]> = {
    无: [],
    肩部: ['肩部不适时训练后优先做肩胛稳定与轻度活动度恢复，避免额外拉力训练。'],
    腰部: ['腰部不适时优先做核心抗伸展与髋稳定练习，减少久坐后直接下水。'],
    膝关节: ['膝关节不适时减少高强度蛙腿与深屈角力量训练，保持恢复监测。'],
    踝关节: ['踝关节不适时控制脚蹼负荷，逐步恢复踝活动度。'],
    其他: ['存在其他限制时，建议结合教练或医生意见降低训练应激。'],
  }

  return [...templateRecoveryAdvice, ...injuryAdvice[form.injury]]
}

function deriveDrylandAdvice(form: PlanFormState): string[] {
  const base = [
    '每周 2 次基础力量：核心稳定、髋主导与肩胛控制为主。',
    '训练日前后安排 10–15 分钟动态热身与泡沫轴放松。',
  ]
  if (form.injury === '肩部') return [...base, '肩部限制下避免大重量推举，优先弹力带外旋与肩胛下压。']
  if (form.injury === '腰部') return [...base, '腰部限制下避免高负荷硬拉/深蹲，优先死虫、鸟狗与臀桥。']
  return base
}

function deriveWhyThisPlan(
  eventGroup: EventGroup,
  phase: TrainingPlanResult['meta']['derived']['phase'],
  improvementRatio: number | null,
  templateWhy: string[],
  notes: string[],
): string[] {
  const phaseExplanation: Record<TrainingPlanResult['meta']['derived']['phase'], string> = {
    Base: '当前处于 Base 阶段，优先建立有氧能力与技术稳定性，为后续专项阶段打基础。',
    Build: '当前处于 Build 阶段，重点提升关键能力并逐步提高专项强度。',
    Specific: '当前处于 Specific 阶段，训练结构开始更贴近比赛节奏与专项能力。',
    Taper: '当前处于 Taper 阶段，降低总量但保留关键速度与节奏刺激。',
  }

  const ratioLine =
    improvementRatio === null
      ? '当前未形成有效成绩差距数据，训练解释以项目组与阶段目标为主。'
      : `当前目标差距约 ${(improvementRatio * 100).toFixed(1)}%，已据此选择更匹配的训练强度档位。`

  return [
    `${eventGroup} 项目组决定了本周分区重心与关键训练类型。`,
    phaseExplanation[phase],
    ratioLine,
    ...templateWhy,
    ...notes.slice(0, 2),
  ]
}

export function generateRuleBasedTrainingPlan(
  form: PlanFormState,
  options: GeneratorOptions,
): TrainingPlanResult {
  const notes: string[] = []
  const eventGroup = classifyEventGroup(form.event)
  const phaseResult = calculateTrainingPhase(form.targetDate, options.now)
  const phase = phaseResult?.phase ?? 'Build'
  const weeksToTarget = phaseResult?.weeksToTarget ?? null
  if (!phaseResult) {
    notes.push('目标日期无效，已使用 Build 阶段作为默认结构。')
  }

  const current = parseTimeInput(form.currentTimeInput)
  const goal = parseTimeInput(form.goalTimeInput)
  const improvementRatio =
    current && goal && current.secondsTotal > 0 ? (current.secondsTotal - goal.secondsTotal) / current.secondsTotal : null
  const intensityTier = getIntensityTier(improvementRatio)

  const template = selectTemplateFromRegistry({
    level: form.level,
    eventGroup,
    goalType: form.goalType,
    phase,
    intensityTier,
  })

  const volume = calculateRecommendedWeeklyVolume(form, eventGroup, phase, intensityTier, template.defaults.recommendedWeeklyVolumeMultiplier)
  notes.push(...volume.notes)

  if (form.goalType === '铁人三项专项') {
    notes.push('铁三专项已采用稳定有氧优先的模板结构。')
  }

  if (form.availableEquipment.length === 0) {
    notes.push('未选择器材，已自动使用徒手/基础技术版本训练内容。')
  }

  if (form.injury !== '无') {
    notes.push(`已根据${form.injury}限制降低高风险训练内容。`)
  }

  const weeklyTrainingPlan = buildWeeklyPlan(
    form,
    eventGroup,
    form.goalType,
    template.weeklyStructure.pattern,
    volume.recommendedWeeklyVolumeMeters,
  )

  const delta =
    typeof form.weeklyDistanceMeters === 'number' && form.weeklyDistanceMeters > 0
      ? volume.recommendedWeeklyVolumeMeters - form.weeklyDistanceMeters
      : null

  const trainingSummary = [
    `专项：${form.event}（${eventGroup}）｜阶段：${phase}${weeksToTarget === null ? '' : `｜距目标约 ${weeksToTarget} 周`}`,
    `模板：${template.templateId}`,
    current && goal
      ? `当前：${current.displayFormat} → 目标：${goal.displayFormat}`
      : '成绩输入不足，当前以项目组、等级和目标类型驱动训练结构。',
    `本周训练重点：${template.summaryFocus}`,
    delta === null
      ? `推荐周量：${volume.recommendedWeeklyVolumeMeters}m`
      : `推荐周量：${volume.recommendedWeeklyVolumeMeters}m（较当前${delta >= 0 ? ` +${delta}` : ` ${delta}`}m）`,
    `训练频次：${form.trainingDaysPerWeek || '—'} 天/周，单次 ${form.trainingDurationPerSessionMinutes || '—'} 分钟`,
  ]

  return {
    templateId: template.templateId,
    trainingSummary,
    recommendedWeeklyVolumeMeters: volume.recommendedWeeklyVolumeMeters,
    trainingZones: ZONE_FRAMEWORK,
    weeklyTrainingPlan,
    technicalFocus: deriveTechnicalFocus(form, eventGroup, template.technicalFocus),
    drylandTrainingAdvice: deriveDrylandAdvice(form),
    recoveryAdvice: deriveRecoveryAdvice(form, template.recoveryAdvice),
    whyThisPlan: deriveWhyThisPlan(eventGroup, phase, improvementRatio, template.whyThisPlan, notes),
    meta: {
      mode: 'rule_based',
      derived: {
        eventGroup,
        phase,
        weeksToTarget,
        improvementRatio,
        intensityTier,
      },
      notes,
    },
  }
}

