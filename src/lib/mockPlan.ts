import type { PlanFormState, TrainingPlanResult } from './types'
import { generateRuleBasedTrainingPlan } from './ruleBasedTrainingGenerator'
import { parseTimeInput } from './time'

export function generateMockPlan(form: PlanFormState): TrainingPlanResult {
  return generateRuleBasedTrainingPlan(form, { now: new Date() })
}

export function toPlainText(form: PlanFormState, result: TrainingPlanResult): string {
  const current = parseTimeInput(form.currentTimeInput)
  const goal = parseTimeInput(form.goalTimeInput)
  const head = [
    '口袋游泳教练（Pocket Swimming Coach）',
    '',
    `专项：${form.event}`,
    `目标类型：${form.goalType}`,
    current && goal ? `当前：${current.displayFormat}  目标：${goal.displayFormat}` : `当前：${form.currentTimeInput}  目标：${form.goalTimeInput}`,
    `目标日期：${form.targetDate || '—'}`,
    `泳池长度：${form.poolLength}`,
    `训练频次：${form.trainingDaysPerWeek || '—'} 天/周  单次：${form.trainingDurationPerSessionMinutes || '—'} 分钟`,
    `模板：${result.templateId}`,
    '',
  ]

  const zonesText = result.trainingZones
    .map((z) => `Zone ${z.zoneId}｜${z.nameZh}：${z.purpose}（${z.intensityHint}）`)
    .join('\n')

  const planText = result.weeklyTrainingPlan
    .map((s) => {
      const blocks = s.blocks
        .map((b) => {
          const prefix = b.zone ? `Zone ${b.zone}｜` : ''
          return [`- ${b.label} ${prefix}`.trim(), ...b.sets.map((x) => `  - ${x}`)].join('\n')
        })
        .join('\n')
      return [`${s.title}（${s.totalMeters}m）`, `重点：${s.focus}`, blocks].join('\n')
    })
    .join('\n\n')

  return [
    ...head,
    '训练概览',
    ...result.trainingSummary.map((x) => `- ${x}`),
    '',
    `推荐周训练量：${result.recommendedWeeklyVolumeMeters}m`,
    '',
    '训练分区（Zone 1–6）',
    zonesText,
    '',
    '周训练计划',
    planText,
    '',
    '技术重点',
    result.technicalFocus.map((x) => `- ${x}`).join('\n'),
    '',
    '恢复建议',
    result.recoveryAdvice.map((x) => `- ${x}`).join('\n'),
    '',
    '为什么这样安排',
    result.whyThisPlan.map((x) => `- ${x}`).join('\n'),
    '',
    'Meta',
    `- mode: ${result.meta.mode}`,
    `- eventGroup: ${result.meta.derived.eventGroup}`,
    `- phase: ${result.meta.derived.phase}`,
    `- weeksToTarget: ${result.meta.derived.weeksToTarget ?? 'null'}`,
    `- intensityTier: ${result.meta.derived.intensityTier ?? 'null'}`,
    ...result.meta.notes.map((x) => `- note: ${x}`),
  ].join('\n')
}

