import { describe, expect, it } from 'vitest'
import { DRILL_REGISTRY } from '../drills/drillRegistry'
import { ERROR_REGISTRY } from './errorRegistry'
import { searchError } from './query'

describe('errorRegistry', () => {
  it('能加载 20 个错误', () => {
    expect(ERROR_REGISTRY).toHaveLength(20)
  })

  it('搜索错误：支持中文关键词', () => {
    const result = searchError('沉腿')

    expect(result.length).toBeGreaterThan(0)
    expect(result[0]?.id).toBe('legs_sinking')
  })

  it('搜索错误：支持常见术语别名', () => {
    const result = searchError('低肘')

    expect(result.length).toBeGreaterThan(0)
    expect(result[0]?.id).toBe('dropped_elbow')
  })

  it('Drill 关联有效：推荐 Drill 都能在 Drill Registry 找到', () => {
    const drillNames = new Set(DRILL_REGISTRY.map((drill) => drill.nameEn))

    for (const error of ERROR_REGISTRY) {
      for (const drillName of error.recommendedDrills) {
        expect(drillNames.has(drillName)).toBe(true)
      }
    }
  })

  it('稳定输出：相同关键词搜索结果顺序稳定', () => {
    const a = searchError('换气').map((item) => item.id)
    const b = searchError('换气').map((item) => item.id)

    expect(a).toEqual(b)
  })

  it('Deterministic：同输入同输出', () => {
    expect(searchError('低肘')).toEqual(searchError('低肘'))
  })

  it('空结果处理：无匹配返回空数组', () => {
    expect(searchError('火星蝶泳')).toEqual([])
  })
})

