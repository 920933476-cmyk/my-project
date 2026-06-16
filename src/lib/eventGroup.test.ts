import { describe, expect, it } from 'vitest'
import { classifyEventGroup } from './eventGroup'

describe('classifyEventGroup', () => {
  it('将短距离项目映射为 Sprint', () => {
    expect(classifyEventGroup('50 Free')).toBe('Sprint')
    expect(classifyEventGroup('100 Free')).toBe('Sprint')
    expect(classifyEventGroup('100 Fly')).toBe('Sprint')
    expect(classifyEventGroup('100 Back')).toBe('Sprint')
    expect(classifyEventGroup('100 Breast')).toBe('Sprint')
  })

  it('将中距离项目映射为 Middle Distance', () => {
    expect(classifyEventGroup('200 Free')).toBe('Middle Distance')
    expect(classifyEventGroup('400 Free')).toBe('Middle Distance')
    expect(classifyEventGroup('200 Fly')).toBe('Middle Distance')
    expect(classifyEventGroup('200 Back')).toBe('Middle Distance')
    expect(classifyEventGroup('200 Breast')).toBe('Middle Distance')
    expect(classifyEventGroup('200 IM')).toBe('Middle Distance')
  })

  it('将长距离项目映射为 Distance', () => {
    expect(classifyEventGroup('800 Free')).toBe('Distance')
    expect(classifyEventGroup('1500 Free')).toBe('Distance')
    expect(classifyEventGroup('400 IM')).toBe('Distance')
  })
})

