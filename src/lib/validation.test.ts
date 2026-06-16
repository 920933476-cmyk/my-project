import { describe, expect, it } from 'vitest'
import type { PlanFormState } from './types'
import { validatePlanForm } from './validation'

function buildForm(overrides: Partial<PlanFormState> = {}): PlanFormState {
  return {
    age: 16,
    gender: '男',
    trainingExperienceMonths: 12,
    level: 'L2',
    event: '100 Free',
    goalType: '成绩提升',
    currentTimeInput: '1:15',
    goalTimeInput: '1:12.50',
    targetDate: '2026-12-01',
    poolLength: '25m',
    weeklyDistanceMeters: 8000,
    trainingDaysPerWeek: 3,
    trainingDurationPerSessionMinutes: 60,
    availableEquipment: ['浮板'],
    injury: '无',
    ...overrides,
  }
}

describe('validatePlanForm', () => {
  const now = new Date('2026-06-11T10:00:00')

  it('合法表单应通过且无错误', () => {
    const result = validatePlanForm(buildForm(), now)

    expect(result.hasErrors).toBe(false)
    expect(result.fields.goalTimeInput.error).toBeNull()
    expect(result.parsedTimes.current?.displayFormat).toBe('1:15')
  })

  it('年龄需在 5~80', () => {
    expect(validatePlanForm(buildForm({ age: 4 }), now).fields.age.error).toBe('年龄需在 5 到 80 岁之间。')
    expect(validatePlanForm(buildForm({ age: 81 }), now).fields.age.error).toBe('年龄需在 5 到 80 岁之间。')
  })

  it('目标成绩必须优于当前成绩', () => {
    const result = validatePlanForm(buildForm({ goalTimeInput: '1:16' }), now)
    expect(result.fields.goalTimeInput.error).toBe('目标成绩必须优于当前成绩。')
  })

  it('目标日期必须晚于今天', () => {
    expect(validatePlanForm(buildForm({ targetDate: '2026-06-11' }), now).fields.targetDate.error).toBe('目标日期必须晚于今天。')
    expect(validatePlanForm(buildForm({ targetDate: '2026-06-10' }), now).fields.targetDate.error).toBe('目标日期必须晚于今天。')
  })

  it('训练天数需在 1~7', () => {
    expect(validatePlanForm(buildForm({ trainingDaysPerWeek: 0 }), now).fields.trainingDaysPerWeek.error).toBe(
      '每周训练天数需在 1 到 7 天之间。'
    )
    expect(validatePlanForm(buildForm({ trainingDaysPerWeek: 8 }), now).fields.trainingDaysPerWeek.error).toBe(
      '每周训练天数需在 1 到 7 天之间。'
    )
  })

  it('单次训练时间需在 15~300 分钟', () => {
    expect(validatePlanForm(buildForm({ trainingDurationPerSessionMinutes: 14 }), now).fields.trainingDurationPerSessionMinutes.error).toBe(
      '单次训练时间需在 15 到 300 分钟之间。'
    )
    expect(validatePlanForm(buildForm({ trainingDurationPerSessionMinutes: 301 }), now).fields.trainingDurationPerSessionMinutes.error).toBe(
      '单次训练时间需在 15 到 300 分钟之间。'
    )
  })

  it('周训练量需在 0~100000m', () => {
    expect(validatePlanForm(buildForm({ weeklyDistanceMeters: 100001 }), now).fields.weeklyDistanceMeters.error).toBe(
      '每周训练量需在 0 到 100000 米之间。'
    )
  })

  it('时间格式无法解析时显示错误', () => {
    const result = validatePlanForm(buildForm({ currentTimeInput: 'abc', goalTimeInput: '1:15.20' }), now)
    expect(result.fields.currentTimeInput.error).toBe('成绩格式无法识别，请使用：1分15秒 / 1:15 / 75秒 / 1:15.20。')
  })

  it('时间预算明显不符时给出 warning，但不阻止生成', () => {
    const highVolume = validatePlanForm(
      buildForm({
        weeklyDistanceMeters: 25000,
        trainingDaysPerWeek: 2,
        trainingDurationPerSessionMinutes: 45,
      }),
      now
    )

    expect(highVolume.fields.weeklyDistanceMeters.warning).toBeTruthy()
    expect(highVolume.hasErrors).toBe(false)
  })

  it('周量为 0 时不报时间预算 warning', () => {
    const result = validatePlanForm(buildForm({ weeklyDistanceMeters: 0 }), now)
    expect(result.fields.weeklyDistanceMeters.warning).toBeNull()
  })
})

