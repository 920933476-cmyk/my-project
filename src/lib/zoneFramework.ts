import type { TrainingZone } from './types'

export const ZONE_FRAMEWORK: TrainingZone[] = [
  {
    zoneId: 1,
    nameZh: '恢复',
    nameEn: 'Recovery',
    purpose: '促进恢复与动作放松，降低疲劳累积。',
    intensityHint: '非常轻松，可正常对话。',
    hrHint: '心率 < 65% MaxHR',
    restSuggestion: '连续游或每 50m 休息 0–10 秒',
    paceSuggestion: '建议配速约 1:30–1:40 / 50m',
    estimatedDurationHint: '预计 50m 约 1:30，100m 约 3:00',
    rpeRange: '1–3',
  },
  {
    zoneId: 2,
    nameZh: '有氧',
    nameEn: 'Aerobic',
    purpose: '提升有氧能力与基础耐力，建立稳定配速。',
    intensityHint: '轻松到中等，可对话但略喘。',
    hrHint: '心率 65–75% MaxHR',
    restSuggestion: '每组建议休息 10–15 秒',
    paceSuggestion: '建议配速约 1:12–1:18 / 50m',
    estimatedDurationHint: '预计 50m 约 1:15，100m 约 2:30',
    rpeRange: '3–5',
  },
  {
    zoneId: 3,
    nameZh: '阈值',
    nameEn: 'Threshold',
    purpose: '提升乳酸耐受与持续输出能力，增强中后程能力。',
    intensityHint: '偏吃力，短句交流。',
    hrHint: '心率 75–82% MaxHR',
    restSuggestion: '每组建议休息 15–25 秒',
    paceSuggestion: '建议配速约 1:02–1:08 / 50m',
    estimatedDurationHint: '预计 50m 约 1:05，100m 约 2:10',
    rpeRange: '5–7',
  },
  {
    zoneId: 4,
    nameZh: 'VO2 Max',
    nameEn: 'VO2 Max',
    purpose: '提高最大摄氧与高强度维持能力。',
    intensityHint: '很吃力，间歇性高强度。',
    hrHint: '心率 82–89% MaxHR',
    restSuggestion: '每组建议休息 35–50 秒',
    paceSuggestion: '建议配速约 0:52–0:58 / 50m',
    estimatedDurationHint: '预计 50m 约 0:55，100m 约 1:50',
    rpeRange: '7–8',
  },
  {
    zoneId: 5,
    nameZh: '比赛配速',
    nameEn: 'Race Pace',
    purpose: '适应目标比赛速度与节奏，强化专项配速控制。',
    intensityHint: '接近比赛强度，组间休息更充分。',
    hrHint: '心率 89–94% MaxHR',
    restSuggestion: '每组建议休息 45–60 秒',
    paceSuggestion: '建议配速约 0:45–0:50 / 50m',
    estimatedDurationHint: '预计 50m 约 0:48，100m 约 1:36',
    rpeRange: '8–9',
  },
  {
    zoneId: 6,
    nameZh: '冲刺',
    nameEn: 'Sprint',
    purpose: '神经速度与爆发力，提升最高速度与速度耐力。',
    intensityHint: '全力或接近全力，短距离为主。',
    hrHint: '心率 94–100% MaxHR',
    restSuggestion: '每组建议休息 75–90 秒',
    paceSuggestion: '建议配速约 0:38–0:42 / 50m',
    estimatedDurationHint: '预计 50m 约 0:40，100m 约 1:20',
    rpeRange: '9–10',
  },
]

/** 根据 Zone ID 获取心率提示 */
export function getZoneHint(zoneId: TrainingZone['zoneId']): { hrHint: string; rpeRange: string } {
  const z = ZONE_FRAMEWORK.find((z) => z.zoneId === zoneId)
  return {
    hrHint: z?.hrHint ?? '',
    rpeRange: z?.rpeRange ?? '',
  }
}

/** 根据 Zone 和距离估算单组时长（秒） */
export function estimateIntervalSeconds(zoneId: TrainingZone['zoneId'], distanceMeters: number): number {
  // 估算游速：Zone 越高压泊越快
  const pacePer50Map: Record<TrainingZone['zoneId'], number> = {
    1: 90, // 恢复：90s/50m = 1:30/50m
    2: 75, // 有氧：75s/50m = 1:15/50m
    3: 65, // 阈值：65s/50m = 1:05/50m
    4: 55, // VO2Max：55s/50m = 55s/50m
    5: 48, // 比赛配速：48s/50m
    6: 40, // 冲刺：40s/50m
  }
  const pacePer50 = pacePer50Map[zoneId]
  return Math.round((distanceMeters / 50) * pacePer50)
}

/** 根据 Zone 估算组间休息时长 */
export function estimateRestSeconds(zoneId: TrainingZone['zoneId']): number {
  const restMap: Record<TrainingZone['zoneId'], number> = {
    1: 0,   // 恢复：连续游
    2: 10,  // 有氧：短休
    3: 20,  // 阈值：20s
    4: 45,  // VO2Max：45s
    5: 60,  // 比赛配速：60s
    6: 90,  // 冲刺：充分恢复
  }
  return restMap[zoneId]
}
