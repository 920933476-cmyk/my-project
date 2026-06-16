import type { TrainingZone } from './types'

export const ZONE_FRAMEWORK: TrainingZone[] = [
  {
    zoneId: 1,
    nameZh: '恢复',
    nameEn: 'Recovery',
    purpose: '促进恢复与动作放松，降低疲劳累积。',
    intensityHint: '非常轻松，可正常对话。',
  },
  {
    zoneId: 2,
    nameZh: '有氧',
    nameEn: 'Aerobic',
    purpose: '提升有氧能力与基础耐力，建立稳定配速。',
    intensityHint: '轻松到中等，可对话但略喘。',
  },
  {
    zoneId: 3,
    nameZh: '阈值',
    nameEn: 'Threshold',
    purpose: '提升乳酸耐受与持续输出能力，增强中后程能力。',
    intensityHint: '偏吃力，短句交流。',
  },
  {
    zoneId: 4,
    nameZh: 'VO2 Max',
    nameEn: 'VO2 Max',
    purpose: '提高最大摄氧与高强度维持能力。',
    intensityHint: '很吃力，间歇性高强度。',
  },
  {
    zoneId: 5,
    nameZh: '比赛配速',
    nameEn: 'Race Pace',
    purpose: '适应目标比赛速度与节奏，强化专项配速控制。',
    intensityHint: '接近比赛强度，组间休息更充分。',
  },
  {
    zoneId: 6,
    nameZh: '冲刺',
    nameEn: 'Sprint',
    purpose: '神经速度与爆发力，提升最高速度与速度耐力。',
    intensityHint: '全力或接近全力，短距离为主。',
  },
]

