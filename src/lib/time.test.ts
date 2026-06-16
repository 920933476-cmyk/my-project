import { describe, expect, it } from 'vitest'
import { formatSeconds, parseTimeInput } from './time'

describe('formatSeconds', () => {
  it('能正确格式化整数秒', () => {
    expect(formatSeconds(75)).toBe('1:15')
  })

  it('能正确格式化百分秒', () => {
    expect(formatSeconds(75.2)).toBe('1:15.20')
  })

  it('能正确处理进位', () => {
    expect(formatSeconds(119.999)).toBe('2:00')
  })
})

describe('parseTimeInput', () => {
  it('支持 1分15秒', () => {
    expect(parseTimeInput('1分15秒')).toEqual({
      secondsTotal: 75,
      displayFormat: '1:15',
    })
  })

  it('支持 1:15', () => {
    expect(parseTimeInput('1:15')).toEqual({
      secondsTotal: 75,
      displayFormat: '1:15',
    })
  })

  it('支持 75秒', () => {
    expect(parseTimeInput('75秒')).toEqual({
      secondsTotal: 75,
      displayFormat: '1:15',
    })
  })

  it('支持 1:15.20', () => {
    expect(parseTimeInput('1:15.20')).toEqual({
      secondsTotal: 75.2,
      displayFormat: '1:15.20',
    })
  })

  it('支持含空格和中文分钟写法', () => {
    expect(parseTimeInput(' 1 分 15 秒 ')).toEqual({
      secondsTotal: 75,
      displayFormat: '1:15',
    })
    expect(parseTimeInput('1分钟15秒')).toEqual({
      secondsTotal: 75,
      displayFormat: '1:15',
    })
  })

  it('拒绝非法秒数', () => {
    expect(parseTimeInput('1:75')).toBeNull()
    expect(parseTimeInput('1分75秒')).toBeNull()
  })

  it('拒绝空值和非法文本', () => {
    expect(parseTimeInput('')).toBeNull()
    expect(parseTimeInput('abc')).toBeNull()
    expect(parseTimeInput('15')).toBeNull()
  })
})

