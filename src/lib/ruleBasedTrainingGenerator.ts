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
  RPE,
  TrainingPlanResult,
  TrainingSet,
  TrainingZoneId,
  WeeklySession,
} from './types'
import { ZONE_FRAMEWORK, estimateIntervalSeconds, estimateRestSeconds } from './zoneFramework'
import { getRecommendedDrills } from './drills/query'

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

/** 根据距离和泳姿推断主泳姿 */
function inferStroke(event: PlanFormState['event']): string {
  if (event.includes('Free') || event.includes('自由')) return '自由泳'
  if (event.includes('Back')) return '仰泳'
  if (event.includes('Breast')) return '蛙泳'
  if (event.includes('Fly')) return '蝶泳'
  if (event.includes('IM')) return '混合泳'
  return '自由泳'
}

function getEventDistance(event: PlanFormState['event']) {
  const match = event.match(/\d+/)
  return match ? Number(match[0]) : 100
}

function formatDuration(seconds: number) {
  const total = Math.max(1, Math.round(seconds))
  const minutes = Math.floor(total / 60)
  const secs = total % 60
  if (minutes === 0) return `${secs}秒`
  return `${minutes}:${secs.toString().padStart(2, '0')}`
}

function getBasePacePer50(form: PlanFormState) {
  const current = parseTimeInput(form.currentTimeInput)
  const eventDistance = getEventDistance(form.event)
  if (current && eventDistance >= 50) {
    return current.secondsTotal / (eventDistance / 50)
  }

  const fallbackByLevel: Record<PlanFormState['level'], number> = {
    L1: 80,
    L2: 68,
    L3: 58,
    L4: 52,
  }
  return fallbackByLevel[form.level]
}

function getPaceTarget(form: PlanFormState, zone: TrainingZoneId, distanceMeters: number) {
  const basePer50 = getBasePacePer50(form)
  const factorMap: Record<TrainingZoneId, [number, number]> = {
    1: [1.18, 1.28],
    2: [1.08, 1.16],
    3: [0.98, 1.05],
    4: [0.9, 0.97],
    5: [0.84, 0.91],
    6: [0.78, 0.86],
  }
  const [fastFactor, slowFactor] = factorMap[zone]
  const unit = distanceMeters >= 100 ? 100 : 50
  const unitSecondsFast = basePer50 * (unit / 50) * fastFactor
  const unitSecondsSlow = basePer50 * (unit / 50) * slowFactor
  return `${formatDuration(unitSecondsFast)}–${formatDuration(unitSecondsSlow)}/${unit}m`
}

function getHeartRateRange(form: PlanFormState, zone: TrainingZoneId) {
  const maxHr = typeof form.age === 'number' ? Math.round(208 - 0.7 * form.age) : 190
  const rangeMap: Record<TrainingZoneId, [number, number]> = {
    1: [0.55, 0.65],
    2: [0.65, 0.75],
    3: [0.75, 0.82],
    4: [0.82, 0.89],
    5: [0.89, 0.94],
    6: [0.94, 1],
  }
  const [minRatio, maxRatio] = rangeMap[zone]
  return `${Math.round(maxHr * minRatio)}–${Math.round(maxHr * maxRatio)} bpm`
}

/** 获取 Zone 对应的RPE中值 */
function zoneRPE(zone: TrainingZoneId): RPE {
  const map: Record<TrainingZoneId, RPE> = { 1: 2, 2: 4, 3: 6, 4: 7, 5: 8, 6: 9 }
  return map[zone]
}

function getSetTotalMeters(set: string | TrainingSet) {
  if (typeof set === "string") return 0
  return set.repetitions * set.distanceMeters
}

function getBlockTotalMeters(sets: (string | TrainingSet)[]) {
  return sets.reduce((sum, set) => sum + getSetTotalMeters(set), 0)
}

function drillNameAt(drills: ReturnType<typeof getRecommendedDrills>, index: number, fallback: string) {
  return drills[index]?.nameZh ?? fallback
}

function makeRepetitions(targetMeters: number, distanceMeters: number, minimum: number) {
  return Math.max(minimum, Math.round(targetMeters / distanceMeters))
}

/** 构建单个可执行训练组 */
function makeSet(params: {
  distanceMeters: number
  repetitions: number
  stroke: string
  drillName: string
  zone: TrainingZoneId
  form: PlanFormState
  drills: ReturnType<typeof getRecommendedDrills>
  techniqueCues: string[]
  note?: string
}): TrainingSet {
  const { distanceMeters, repetitions, stroke, drillName, zone, form, drills, techniqueCues, note } = params
  const rpe = zoneRPE(zone)
  const swimSeconds = estimateIntervalSeconds(zone, distanceMeters)
  const restSeconds = estimateRestSeconds(zone)
  const sendOffIntervalSeconds = swimSeconds + restSeconds
  const estimatedDurationSeconds = repetitions * (swimSeconds + restSeconds)

  return {
    distanceMeters,
    repetitions,
    stroke,
    drillName,
    zone,
    paceTarget: getPaceTarget(form, zone, distanceMeters),
    heartRateRange: getHeartRateRange(form, zone),
    restSeconds,
    sendOffIntervalSeconds,
    estimatedDurationSeconds,
    rpe,
    drillIds: drills.slice(0, 2).map((d) => d.id),
    techniqueCues,
    note,
  }
}

function buildWarmupSets(
  form: PlanFormState,
  poolLength: PoolLength,
  targetMeters: number,
  drills: ReturnType<typeof getRecommendedDrills>,
): TrainingSet[] {
  const step = getPoolStep(poolLength)
  const mainStroke = inferStroke(form.event)
  const primaryDrill = drillNameAt(drills, 0, '动作唤醒')
  const targetUnits = Math.max(6, Math.round(targetMeters / step))

  return [
    makeSet({
      distanceMeters: step,
      repetitions: Math.max(2, Math.round(targetUnits * 0.35)),
      stroke: mainStroke,
      drillName: '轻松游启动',
      zone: 1,
      form,
      drills,
      techniqueCues: ['拉长划水', '轻松换气', '逐步提高体温'],
    }),
    makeSet({
      distanceMeters: step,
      repetitions: Math.max(2, Math.round(targetUnits * 0.3)),
      stroke: '自由腿/仰腿',
      drillName: '交替打腿',
      zone: 2,
      form,
      drills,
      techniqueCues: ['核心保持稳定', '脚踝放松', '自由腿/仰腿交替'],
      note: '自由腿/仰腿交替',
    }),
    makeSet({
      distanceMeters: step,
      repetitions: Math.max(2, targetUnits - Math.max(2, Math.round(targetUnits * 0.35)) - Math.max(2, Math.round(targetUnits * 0.3))),
      stroke: mainStroke,
      drillName: primaryDrill,
      zone: 2,
      form,
      drills,
      techniqueCues: ['用 Drill 建立水感', '保持动作放松', '为主集做神经准备'],
    }),
  ]
}

function buildTechniqueSets(
  form: PlanFormState,
  poolLength: PoolLength,
  targetMeters: number,
  drills: ReturnType<typeof getRecommendedDrills>,
): TrainingSet[] {
  const step = getPoolStep(poolLength)
  const mainStroke = inferStroke(form.event)
  const primaryDrill = drillNameAt(drills, 0, '单臂划水')
  const secondaryDrill = drillNameAt(drills, 1, '配合划水')
  const targetUnits = Math.max(4, Math.round(targetMeters / step))
  const firstReps = Math.max(2, Math.round(targetUnits * 0.6))
  const secondReps = Math.max(2, targetUnits - firstReps)

  return [
    makeSet({
      distanceMeters: step,
      repetitions: firstReps,
      stroke: mainStroke,
      drillName: primaryDrill,
      zone: 1,
      form,
      drills,
      techniqueCues: drills[0]?.keyPoints.slice(0, 3) ?? ['控制头位', '保持体线', '专注抓水路径'],
    }),
    makeSet({
      distanceMeters: step,
      repetitions: secondReps,
      stroke: mainStroke,
      drillName: secondaryDrill,
      zone: 1,
      form,
      drills,
      techniqueCues: drills[1]?.keyPoints.slice(0, 3) ?? ['动作完整', '低阻力前移', '建立节奏感'],
    }),
  ]
}

function buildMainSets(
  sessionType: SessionType,
  zone: TrainingZoneId,
  poolLength: PoolLength,
  targetMeters: number,
  form: PlanFormState,
  eventGroup: EventGroup,
): TrainingSet[] {
  const step = getPoolStep(poolLength)
  const mainStroke = inferStroke(form.event)
  const longerDistance = poolLength === '50m' ? 100 : step * 2
  const sprintDistance = step
  const thresholdDistance = longerDistance
  const drills = getRecommendedDrills({
    level: form.level,
    eventGroup,
    goalType: form.goalType,
    injury: form.injury,
    limit: 4,
  })
  const hasFins = form.availableEquipment.includes('脚蹼')
  const hasTempo = form.availableEquipment.includes('Tempo Trainer')
  const hasSnorkel = form.availableEquipment.includes('呼吸管')

  switch (sessionType) {
    case 'Recovery':
      return [
        makeSet({
          distanceMeters: step,
          repetitions: makeRepetitions(targetMeters * 0.55, step, 6),
          stroke: `${mainStroke}/仰泳`,
          drillName: '恢复滑行',
          zone: 1,
          form,
          drills,
          techniqueCues: ['长划放松', '保持节奏均匀', '心率快速回落'],
        }),
        makeSet({
          distanceMeters: step,
          repetitions: makeRepetitions(targetMeters * 0.25, step, 4),
          stroke: '自由腿/仰腿',
          drillName: '轻松打腿',
          zone: 1,
          form,
          drills,
          techniqueCues: ['小幅高频', '放松踝关节', '不过度用力'],
          note: '自由腿/仰腿交替',
        }),
      ]
    case 'Technique':
      return [
        makeSet({
          distanceMeters: step,
          repetitions: makeRepetitions(targetMeters * 0.5, step, 6),
          stroke: mainStroke,
          drillName: drillNameAt(drills, 0, '技术巩固'),
          zone: 1,
          form,
          drills,
          techniqueCues: drills[0]?.keyPoints.slice(0, 3) ?? ['专注动作路径', '降低无效阻力', '动作慢而准'],
        }),
        makeSet({
          distanceMeters: step,
          repetitions: makeRepetitions(targetMeters * 0.35, step, 4),
          stroke: mainStroke,
          drillName: hasSnorkel ? '呼吸管体线控制' : drillNameAt(drills, 1, '身体姿态控制'),
          zone: 2,
          form,
          drills,
          techniqueCues: ['保持头位稳定', '前伸长度一致', '转身后立即进入动作节奏'],
        }),
      ]
    case 'Aerobic':
      return [
        makeSet({
          distanceMeters: longerDistance,
          repetitions: makeRepetitions(targetMeters * 0.58, longerDistance, 4),
          stroke: mainStroke,
          drillName: '稳定有氧持续',
          zone: 2,
          form,
          drills,
          techniqueCues: ['前后程配速一致', '每次划水保持长度', '全程主动吐气'],
        }),
        makeSet({
          distanceMeters: step,
          repetitions: makeRepetitions(targetMeters * 0.22, step, 4),
          stroke: '自由腿/仰腿',
          drillName: '有氧打腿',
          zone: 2,
          form,
          drills,
          techniqueCues: ['腿部持续输出', '保持流线', '不抬头换气'],
          note: '自由腿/仰腿交替',
        }),
        makeSet({
          distanceMeters: longerDistance,
          repetitions: makeRepetitions(targetMeters * 0.2, longerDistance, 2),
          stroke: mainStroke,
          drillName: drillNameAt(drills, 0, '动作效率保持'),
          zone: 2,
          form,
          drills,
          techniqueCues: ['疲劳下保持动作完整', '转身后保持推进', '每趟结束复盘节奏'],
        }),
      ]
    case 'Threshold':
      return [
        makeSet({
          distanceMeters: thresholdDistance,
          repetitions: makeRepetitions(targetMeters * 0.56, thresholdDistance, 5),
          stroke: mainStroke,
          drillName: '阈值持续',
          zone: 3,
          form,
          drills,
          techniqueCues: ['保持可持续高质量输出', '呼吸节奏不乱', '中后程不掉肘'],
        }),
        makeSet({
          distanceMeters: step,
          repetitions: makeRepetitions(targetMeters * 0.2, step, 4),
          stroke: mainStroke,
          drillName: drillNameAt(drills, 0, '负分段控制'),
          zone: 3,
          form,
          drills,
          techniqueCues: ['后25快于前25', '节奏渐进提速', '最后一趟保持技术完整'],
        }),
        makeSet({
          distanceMeters: step,
          repetitions: makeRepetitions(targetMeters * 0.18, step, 4),
          stroke: '自由腿/仰腿',
          drillName: '阈值打腿',
          zone: 2,
          form,
          drills,
          techniqueCues: ['腿部维持阈值节奏', '动作不散', '换气时保持体线'],
        }),
      ]
    case 'VO2':
      return [
        makeSet({
          distanceMeters: step,
          repetitions: makeRepetitions(targetMeters * 0.44, step, 6),
          stroke: mainStroke,
          drillName: 'VO2 高质量输出',
          zone: 4,
          form,
          drills,
          techniqueCues: ['每趟接近上限输出', '组间主动恢复', '保持高肘抓水'],
        }),
        makeSet({
          distanceMeters: step,
          repetitions: makeRepetitions(targetMeters * 0.28, step, 4),
          stroke: mainStroke,
          drillName: hasTempo ? 'Tempo 配速锁定' : '高速节奏控制',
          zone: 4,
          form,
          drills,
          techniqueCues: ['控制出发节奏', '快而不乱', '加速段保持水感'],
        }),
        makeSet({
          distanceMeters: sprintDistance,
          repetitions: makeRepetitions(targetMeters * 0.18, sprintDistance, 4),
          stroke: mainStroke,
          drillName: hasFins ? '脚蹼高速水感' : drillNameAt(drills, 1, '短冲提速'),
          zone: 5,
          form,
          drills,
          techniqueCues: ['前15米快速建立速度', '组间恢复充分', '速度下动作不散'],
        }),
      ]
    case 'RacePace':
      return [
        makeSet({
          distanceMeters: sprintDistance,
          repetitions: makeRepetitions(targetMeters * 0.42, sprintDistance, 8),
          stroke: mainStroke,
          drillName: hasTempo ? 'Tempo 比赛配速' : '比赛配速保持',
          zone: 5,
          form,
          drills,
          techniqueCues: ['严格对齐目标配速', '转身后立即提频', '后段保持推进'],
        }),
        makeSet({
          distanceMeters: thresholdDistance,
          repetitions: makeRepetitions(targetMeters * 0.3, thresholdDistance, 3),
          stroke: mainStroke,
          drillName: '比赛节奏整合',
          zone: 5,
          form,
          drills,
          techniqueCues: ['每组前半控制节奏', '后半模拟比赛冲刺', '呼吸策略固定'],
        }),
        makeSet({
          distanceMeters: sprintDistance,
          repetitions: makeRepetitions(targetMeters * 0.16, sprintDistance, 4),
          stroke: mainStroke,
          drillName: drillNameAt(drills, 0, '专项动作复现'),
          zone: 4,
          form,
          drills,
          techniqueCues: ['在高强度下保持动作模板', '不过度抬头', '保持体线稳定'],
        }),
      ]
    case 'Sprint':
      return [
        makeSet({
          distanceMeters: sprintDistance,
          repetitions: makeRepetitions(targetMeters * 0.4, sprintDistance, 10),
          stroke: mainStroke,
          drillName: '全力短冲',
          zone: 6,
          form,
          drills,
          techniqueCues: ['全力或接近全力', '前15米速度优先', '组间完全恢复'],
        }),
        makeSet({
          distanceMeters: sprintDistance,
          repetitions: makeRepetitions(targetMeters * 0.26, sprintDistance, 6),
          stroke: mainStroke,
          drillName: hasFins ? '脚蹼加速' : '爆发提速',
          zone: 6,
          form,
          drills,
          techniqueCues: ['爆发启动', '快频配合强打腿', '高速下保持入水点稳定'],
        }),
        makeSet({
          distanceMeters: sprintDistance,
          repetitions: makeRepetitions(targetMeters * 0.16, sprintDistance, 4),
          stroke: mainStroke,
          drillName: drillNameAt(drills, 0, '速度动作修正'),
          zone: 5,
          form,
          drills,
          techniqueCues: ['速度中修正动作', '避免靠蛮力推进', '高速度保持抓水完整'],
        }),
      ]
    case 'Mixed':
    default:
      return [
        makeSet({
          distanceMeters: longerDistance,
          repetitions: makeRepetitions(targetMeters * 0.4, longerDistance, 4),
          stroke: mainStroke,
          drillName: '综合有氧',
          zone: 2,
          form,
          drills,
          techniqueCues: ['前半稳定', '后半渐进提速', '保持高效换气'],
        }),
        makeSet({
          distanceMeters: step,
          repetitions: makeRepetitions(targetMeters * 0.28, step, 6),
          stroke: mainStroke,
          drillName: '阈值整合',
          zone: 3,
          form,
          drills,
          techniqueCues: ['建立阈值节奏', '控制划频', '保持动作完整'],
        }),
        makeSet({
          distanceMeters: sprintDistance,
          repetitions: makeRepetitions(targetMeters * 0.16, sprintDistance, 4),
          stroke: mainStroke,
          drillName: '专项提速',
          zone: 5,
          form,
          drills,
          techniqueCues: ['短距离快节奏', '转身后立刻提速', '重视动作效率'],
        }),
      ]
  }
}

function buildCoolDownSets(
  form: PlanFormState,
  poolLength: PoolLength,
  targetMeters: number,
  drills: ReturnType<typeof getRecommendedDrills>,
): TrainingSet[] {
  const step = getPoolStep(poolLength)
  const mainStroke = inferStroke(form.event)
  const targetUnits = Math.max(4, Math.round(targetMeters / step))
  const firstReps = Math.max(2, Math.round(targetUnits * 0.65))
  const secondReps = Math.max(2, targetUnits - firstReps)

  return [
    makeSet({
      distanceMeters: step,
      repetitions: firstReps,
      stroke: `${mainStroke}/仰泳`,
      drillName: '放松游',
      zone: 1,
      form,
      drills,
      techniqueCues: ['长滑放松', '降低心率', '专注恢复呼吸'],
    }),
    makeSet({
      distanceMeters: step,
      repetitions: secondReps,
      stroke: '自由泳/仰泳',
      drillName: '恢复呼吸',
      zone: 1,
      form,
      drills,
      techniqueCues: ['每趟结束主动放松肩颈', '恢复到可轻松对话状态'],
      note: form.injury !== '无' ? `注意保护${form.injury}` : undefined,
    }),
  ]
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
    // 获取适合的Drill（用于技术块）
    const drills = getRecommendedDrills({
      level: form.level,
      eventGroup,
      goalType: form.goalType,
      injury: form.injury,
      limit: 3,
    })
    const warmupSets = buildWarmupSets(form, form.poolLength, warmMeters, drills)
    const techniqueSets = buildTechniqueSets(form, form.poolLength, skillMeters, drills)
    const mainSets = buildMainSets(sessionType, blueprint.zone, form.poolLength, sessionMeters - warmMeters - skillMeters - coolDownMeters, form, eventGroup)
    const coolDownSets = buildCoolDownSets(form, form.poolLength, coolDownMeters, drills)
    const blocks = [
      {
        label: '热身',
        zone: 2 as TrainingZoneId,
        sets: warmupSets,
      },
      {
        label: '技术',
        zone: 1 as TrainingZoneId,
        sets: techniqueSets,
      },
      {
        label: '主集',
        zone: blueprint.zone,
        sets: mainSets,
        note: `本节主集重心：${blueprint.focus}`,
      },
      {
        label: '放松',
        zone: 1 as TrainingZoneId,
        sets: coolDownSets,
      },
    ]
    const actualSessionMeters = blocks.reduce((sum, block) => sum + getBlockTotalMeters(block.sets), 0)
    const actualSessionDurationSeconds = blocks.reduce(
      (sum, block) => sum + block.sets.reduce((setSum, set) => setSum + set.estimatedDurationSeconds, 0),
      0,
    )

    return {
      dayIndex: index + 1,
      title: `Day ${index + 1}｜${blueprint.label}`,
      focus: blueprint.focus,
      totalMeters: actualSessionMeters,
      estimatedDurationMinutes: Math.max(1, Math.round(actualSessionDurationSeconds / 60)),
      blocks,
    }
  })
}

function deriveTechnicalFocus(form: PlanFormState, eventGroup: EventGroup, baseFocus: string[]): string[] {
  const focus = [...baseFocus]
  if (form.injury === '肩部') focus.unshift('肩部限制下优先降低拉力负荷，关注肩胛控制与划水路径')
  if (form.goalType === '技术优化') focus.unshift('本周期以"动作效率优先于速度结果"为首要原则')
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
