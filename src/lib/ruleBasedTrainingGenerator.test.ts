import { describe, expect, it } from 'vitest'
import { generateRuleBasedTrainingPlan } from './ruleBasedTrainingGenerator'
import type { PlanFormState, TrainingSet } from './types'

const baseForm: PlanFormState = {
  age: 16,
  gender: '男',
  trainingExperienceMonths: 24,
  level: 'L2',
  event: '100 Free',
  goalType: '成绩提升',
  currentTimeInput: '1:15',
  goalTimeInput: '1:12',
  targetDate: '2026-02-26',
  poolLength: '25m',
  weeklyDistanceMeters: 8000,
  trainingDaysPerWeek: 4,
  trainingDurationPerSessionMinutes: 75,
  availableEquipment: ['浮板', '划手掌', '浮腿夹', '脚蹼'],
  injury: '无',
}

describe('generateRuleBasedTrainingPlan', () => {
  const now = new Date(Date.UTC(2026, 0, 1, 12, 0, 0))

  it('同输入同输出，不使用随机生成', () => {
    const result1 = generateRuleBasedTrainingPlan(baseForm, { now })
    const result2 = generateRuleBasedTrainingPlan(baseForm, { now })

    expect(result1).toEqual(result2)
  })

  it('返回 templateId、meta 与完整结果结构', () => {
    const result = generateRuleBasedTrainingPlan(baseForm, { now })

    expect(result.templateId).toBe('L2_Sprint_成绩提升_Build_Medium_v1')
    expect(result.meta).toEqual({
      mode: 'rule_based',
      derived: {
        eventGroup: 'Sprint',
        phase: 'Build',
        weeksToTarget: 8,
        improvementRatio: 0.04,
        intensityTier: 'Medium',
      },
      notes: [],
    })
    expect(result.trainingSummary.length).toBeGreaterThan(0)
    expect(result.recommendedWeeklyVolumeMeters).toBeGreaterThan(0)
    expect(result.trainingZones).toHaveLength(6)
    expect(result.trainingZones[0].restSuggestion.length).toBeGreaterThan(0)
    expect(result.trainingZones[0].paceSuggestion.length).toBeGreaterThan(0)
    expect(result.trainingZones[0].estimatedDurationHint.length).toBeGreaterThan(0)
    expect(result.weeklyTrainingPlan).toHaveLength(4)
    const firstSet: TrainingSet = result.weeklyTrainingPlan[0].blocks[0].sets[0]
    expect(firstSet.distanceMeters).toBeGreaterThan(0)
    expect(firstSet.repetitions).toBeGreaterThan(0)
    expect(firstSet.stroke.length).toBeGreaterThan(0)
    expect(firstSet.drillName.length).toBeGreaterThan(0)
    expect(firstSet.restSeconds).toBeGreaterThanOrEqual(0)
    expect(firstSet.sendOffIntervalSeconds).toBeGreaterThan(0)
    expect(firstSet.estimatedDurationSeconds).toBeGreaterThan(0)
    expect(firstSet.paceTarget.length).toBeGreaterThan(0)
    expect(firstSet.heartRateRange.length).toBeGreaterThan(0)
    expect(firstSet.zone).toBeGreaterThanOrEqual(1)
    expect(result.weeklyTrainingPlan[0].estimatedDurationMinutes).toBeGreaterThan(0)
    expect(result.technicalFocus.length).toBeGreaterThan(0)
    expect(result.recoveryAdvice.length).toBeGreaterThan(0)
    expect(result.whyThisPlan.length).toBeGreaterThan(0)
  })

  it('所有训练块都拆解为可执行明细，不输出概括性字符串', () => {
    const result = generateRuleBasedTrainingPlan(baseForm, { now })

    result.weeklyTrainingPlan.forEach((session) => {
      session.blocks.forEach((block) => {
        expect(block.sets.length).toBeGreaterThan(0)
        block.sets.forEach((set: TrainingSet) => {
          expect(typeof set).toBe('object')
          expect(set.repetitions).toBeGreaterThan(0)
          expect(set.distanceMeters).toBeGreaterThan(0)
          expect(set.drillName).not.toMatch(/^热身|^主集|^放松$/)
          expect(set.paceTarget).not.toBe('')
          expect(set.heartRateRange).toContain('bpm')
        })
      })
    })
  })

  it('能根据伤病和器材约束修正输出', () => {
    const result = generateRuleBasedTrainingPlan(
      {
        ...baseForm,
        injury: '肩部',
        availableEquipment: ['浮板'],
      },
      { now },
    )

    const mainSets = result.weeklyTrainingPlan.flatMap((session) =>
      session.blocks.filter((block) => block.label === '主集').flatMap((block) => block.sets),
    )

    expect(result.meta.notes).toContain('已根据肩部限制降低高风险训练内容。')
    expect(result.recoveryAdvice.some((line) => line.includes('肩部不适'))).toBe(true)
    // 主集 TrainingSet 不应含划手掌 drillId
    const hasPaddleDrill = (mainSets as unknown[])
      .filter((s): s is Record<string, unknown> => typeof s === 'object' && s !== null && 'drillIds' in s)
      .some((s) => (s.drillIds as string[]).some((id) => id.includes('paddle')))
    expect(hasPaddleDrill).toBe(false)
  })

  it('目标日期无效时回退到 Build 并写入 meta notes', () => {
    const result = generateRuleBasedTrainingPlan(
      {
        ...baseForm,
        targetDate: '2026/02/26',
      },
      { now },
    )

    expect(result.meta.derived.phase).toBe('Build')
    expect(result.meta.derived.weeksToTarget).toBeNull()
    expect(result.meta.notes).toContain('目标日期无效，已使用 Build 阶段作为默认结构。')
  })

  it('大目标差距时使用 Large 强度档位并给出说明', () => {
    const result = generateRuleBasedTrainingPlan(
      {
        ...baseForm,
        goalTimeInput: '1:05',
      },
      { now },
    )

    expect(result.templateId).toBe('L2_Sprint_成绩提升_Build_Large_v1')
    expect(result.meta.derived.intensityTier).toBe('Large')
    expect(result.meta.notes).toContain('目标差距较大，建议优先保证关键主课质量，而非盲目加量。')
  })
})
