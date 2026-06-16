import { describe, expect, it } from 'vitest'
import { DRILL_REGISTRY } from './drillRegistry'
import { getRecommendedDrills } from './query'

describe('drillRegistry', () => {
  it('能加载至少 30 个 Drill', () => {
    expect(DRILL_REGISTRY.length).toBeGreaterThanOrEqual(30)
  })

  it('推荐 Drill（基础案例）', () => {
    const result = getRecommendedDrills({
      level: 'L2',
      eventGroup: 'Sprint',
      goalType: '技术优化',
      injury: '无',
      limit: 3,
    })

    expect(result).toHaveLength(3)
    expect(result.every((d) => d.suitableLevels.includes('L2'))).toBe(true)
    expect(result.every((d) => d.difficulty <= 3)).toBe(true)
    expect(result.every((d) => !d.avoidForInjuries?.includes('无'))).toBe(true)
  })

  it('Injury 过滤（肩部）', () => {
    const result = getRecommendedDrills({
      level: 'L3',
      eventGroup: 'Sprint',
      goalType: '成绩提升',
      injury: '肩部',
      limit: 10,
    })

    const ids = result.map((d) => d.id)
    expect(ids.includes('zipper_drill')).toBe(false)
    expect(ids.includes('shark_fin_drill')).toBe(false)
    expect(ids.includes('over_the_barrel')).toBe(false)
  })

  it('Deterministic：同输入同输出', () => {
    const params = {
      level: 'L2' as const,
      eventGroup: 'Middle Distance' as const,
      goalType: '耐力发展' as const,
      injury: '无' as const,
      limit: 5,
    }

    const a = getRecommendedDrills(params)
    const b = getRecommendedDrills(params)
    expect(a).toEqual(b)
  })

  it('排序稳定：同分数时按 difficulty 再按 id', () => {
    const result = getRecommendedDrills({
      level: 'L2',
      eventGroup: 'Sprint',
      goalType: '技术优化',
      injury: '无',
      limit: 6,
    })

    const score = (id: (typeof result)[number]) =>
      (id.suitableLevels.includes('L2') ? 1 : 0) * 5 +
      (id.goalTypes.includes('技术优化') ? 1 : 0) * 4 +
      (id.eventGroups.includes('Sprint') ? 1 : 0) * 3

    const compare = (a: (typeof result)[number], b: (typeof result)[number]) => {
      const scoreA = score(a)
      const scoreB = score(b)
      if (scoreA !== scoreB) return scoreB - scoreA
      if (a.difficulty !== b.difficulty) return a.difficulty - b.difficulty
      return a.id.localeCompare(b.id)
    }

    for (let i = 0; i < result.length - 1; i++) {
      expect(compare(result[i], result[i + 1])).toBeLessThanOrEqual(0)
    }
  })

  it('空结果处理：L5 暂无可用 Drill 时返回空数组', () => {
    const result = getRecommendedDrills({
      level: 'L5',
      eventGroup: 'Sprint',
      goalType: '技术优化',
      injury: '无',
      limit: 3,
    })

    expect(result).toEqual([])
  })
})
