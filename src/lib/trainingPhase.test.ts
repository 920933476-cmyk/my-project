import { describe, expect, it } from 'vitest'
import { calculateTrainingPhase } from './trainingPhase'

describe('calculateTrainingPhase', () => {
  const now = new Date(Date.UTC(2026, 0, 1, 12, 0, 0))

  it('当距离目标日期大于等于 16 周时返回 Base', () => {
    expect(calculateTrainingPhase('2026-04-23', now)).toEqual({
      weeksToTarget: 16,
      phase: 'Base',
    })
  })

  it('当距离目标日期在 8 到 16 周之间时返回 Build', () => {
    expect(calculateTrainingPhase('2026-02-26', now)).toEqual({
      weeksToTarget: 8,
      phase: 'Build',
    })
    expect(calculateTrainingPhase('2026-04-16', now)).toEqual({
      weeksToTarget: 15,
      phase: 'Build',
    })
  })

  it('当距离目标日期在 4 到 8 周之间时返回 Specific', () => {
    expect(calculateTrainingPhase('2026-01-29', now)).toEqual({
      weeksToTarget: 4,
      phase: 'Specific',
    })
    expect(calculateTrainingPhase('2026-02-19', now)).toEqual({
      weeksToTarget: 7,
      phase: 'Specific',
    })
  })

  it('当距离目标日期少于 4 周时返回 Taper', () => {
    expect(calculateTrainingPhase('2026-01-22', now)).toEqual({
      weeksToTarget: 3,
      phase: 'Taper',
    })
    expect(calculateTrainingPhase('2026-01-01', now)).toEqual({
      weeksToTarget: 0,
      phase: 'Taper',
    })
  })

  it('能输出一位小数的 weeksToTarget', () => {
    expect(calculateTrainingPhase('2026-01-11', now)).toEqual({
      weeksToTarget: 1.4,
      phase: 'Taper',
    })
  })

  it('目标日期早于今天时仍返回 Taper', () => {
    expect(calculateTrainingPhase('2025-12-25', now)).toEqual({
      weeksToTarget: -1,
      phase: 'Taper',
    })
  })

  it('非法日期返回 null', () => {
    expect(calculateTrainingPhase('2026-02-30', now)).toBeNull()
    expect(calculateTrainingPhase('2026/02/01', now)).toBeNull()
    expect(calculateTrainingPhase('', now)).toBeNull()
  })
})

