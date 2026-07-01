/**
 * Zone Registry - 游泳训练强度分区注册表
 * 
 * 基于训练计划设计.md的颜色系统定义完整的训练强度分区
 * 适用于Rule Engine直接调用，无需解析文章
 */

import { ZoneEntry, Zone } from './REGISTRY_SCHEMA';

export const zoneRegistry: ZoneEntry[] = [
  {
    id: 'zone-z1',
    zone: 'Z1',
    name: 'Easy / Recovery',
    nameZh: '轻松区/恢复区',
    hrRange: '< 60% max HR',
    lactateLevel: '< 2 mmol/L',
    feel: '可以持续对话，完全不喘，轻松游泳',
    purpose: '主动恢复、激活血液循环、热身冷身',
    typicalContent: [
      '轻松游 200-400m',
      '浮板打腿',
      '水感练习',
      '技术Drill（低强度）'
    ],
    recoveryTime: '即刻恢复',
  },
  {
    id: 'zone-z2',
    zone: 'Z2',
    name: 'Aerobic Endurance',
    nameZh: '有氧耐力区',
    hrRange: '60-70% max HR',
    lactateLevel: '2-3 mmol/L',
    feel: '呼吸加深但可控，一句话可以说完整',
    purpose: '建立有氧基础、脂肪代谢能力、耐力底仓',
    typicalContent: [
      '长距离持续游 800-1500m',
      'Zone2节奏训练',
      '基础耐力组',
      'CSS配速训练（+10-20秒/100m）'
    ],
    recoveryTime: '24-48小时完全恢复',
  },
  {
    id: 'zone-z3',
    zone: 'Z3',
    name: 'Tempo / Threshold',
    nameZh: '节奏区/阈值区',
    hrRange: '70-80% max HR',
    lactateLevel: '3-5 mmol/L',
    feel: '开始费力，呼吸较深，但仍可持续',
    purpose: '提升乳酸阈、节奏控制、中长距离专项耐力',
    typicalContent: [
      'CSS配速游',
      'Threshold组 4-8×400m',
      '节奏训练',
      '乳酸阈值附近训练'
    ],
    recoveryTime: '48-72小时',
  },
  {
    id: 'zone-z4',
    zone: 'Z4',
    name: 'Threshold / VO2max',
    nameZh: '阈值区/无氧阈值',
    hrRange: '80-90% max HR',
    lactateLevel: '5-8 mmol/L',
    feel: '明显费力，呼吸急促，只能说几个词',
    purpose: '提升VO2max、耐受乳酸、短距离专项能力',
    typicalContent: [
      '阈值训练 10-20分钟',
      '4×200m @ CSS+5%',
      '短冲间隔',
      '比赛配速模拟'
    ],
    recoveryTime: '72小时以上',
  },
  {
    id: 'zone-z5',
    zone: 'Z5',
    name: 'Sprint / Anaerobic',
    nameZh: '冲刺区/无氧区',
    hrRange: '90-100% max HR',
    lactateLevel: '> 8 mmol/L',
    feel: '极度费力，完全无法说话，10-30秒极限',
    purpose: '速度能力、爆发力、启动速度',
    typicalContent: [
      '全力冲刺 15-30秒',
      '短冲 4-8×25m',
      '出发/速度练习',
      '磷酸原系统训练'
    ],
    recoveryTime: '96小时以上，需要充足恢复',
  },
  {
    id: 'zone-z1-z2',
    zone: 'Z1-Z2',
    name: 'Warm Up / Cool Down',
    nameZh: '热身/冷身区',
    hrRange: '< 70% max HR',
    lactateLevel: '< 3 mmol/L',
    feel: '轻松，逐渐激活或放松',
    purpose: '训练前后过渡，激活身体或促进恢复',
    typicalContent: [
      '热身 200-600m 逐渐加速',
      '冷身 200-400m 轻松游',
      '技术Drill嵌入'
    ],
    recoveryTime: '即刻恢复',
  },
  {
    id: 'zone-z2-z3',
    zone: 'Z2-Z3',
    name: 'Aerobic Development',
    nameZh: '有氧发展区',
    hrRange: '60-80% max HR',
    lactateLevel: '2-5 mmol/L',
    feel: '中等强度，有氧与阈值交界',
    purpose: '有氧能力发展、脂肪代谢、耐力巩固',
    typicalContent: [
      '中等距离持续游',
      '递增强度训练',
      '有氧间歇'
    ],
    recoveryTime: '24-48小时',
  },
  {
    id: 'zone-z3-z4',
    zone: 'Z3-Z4',
    name: 'Threshold Development',
    nameZh: '阈值发展区',
    hrRange: '70-90% max HR',
    lactateLevel: '3-8 mmol/L',
    feel: '较高强度，接近比赛配速',
    purpose: '提升乳酸阈值、比赛配速适应',
    typicalContent: [
      'CSS配速训练',
      '阈值间歇',
      '比赛配速组'
    ],
    recoveryTime: '48-72小时',
  },
  {
    id: 'zone-z4-z5',
    zone: 'Z4-Z5',
    name: 'Speed Endurance',
    nameZh: '速度耐力区',
    hrRange: '80-100% max HR',
    lactateLevel: '5-8+ mmol/L',
    feel: '高强度，接近极限',
    purpose: '速度耐力、乳酸耐受、短距离专项',
    typicalContent: [
      '短冲间歇',
      '速度耐力组',
      '比赛配速模拟'
    ],
    recoveryTime: '72-96小时',
  },
];

// ============================================================
// Zone 辅助函数
// ============================================================

/**
 * 根据感觉描述查找对应的Zone
 */
export function getZoneByFeel(feel: string): ZoneEntry | undefined {
  const feelLower = feel.toLowerCase();
  
  if (feelLower.includes('轻松') || feelLower.includes('恢复') || feelLower.includes('完全不喘')) {
    return zoneRegistry.find(z => z.zone === 'Z1');
  }
  if (feelLower.includes('一句话') || feelLower.includes('有氧') || feelLower.includes('呼吸加深')) {
    return zoneRegistry.find(z => z.zone === 'Z2');
  }
  if (feelLower.includes('开始费力') || feelLower.includes('节奏') || feelLower.includes('阈值')) {
    return zoneRegistry.find(z => z.zone === 'Z3');
  }
  if (feelLower.includes('明显费力') || feelLower.includes('只能说几个词') || feelLower.includes('呼吸急促')) {
    return zoneRegistry.find(z => z.zone === 'Z4');
  }
  if (feelLower.includes('极度费力') || feelLower.includes('冲刺') || feelLower.includes('极限')) {
    return zoneRegistry.find(z => z.zone === 'Z5');
  }
  
  return undefined;
}

/**
 * 根据泳姿类型获取推荐的Zone列表
 */
export function getZoneByStroke(strokeType: string): ZoneEntry[] {
  const strokeZones: Record<string, Zone[]> = {
    'freestyle': ['Z1', 'Z2', 'Z3', 'Z4', 'Z5'],
    'backstroke': ['Z1', 'Z2', 'Z3', 'Z4', 'Z5'],
    'breaststroke': ['Z1', 'Z2', 'Z3', 'Z4'],
    'butterfly': ['Z1', 'Z2', 'Z3', 'Z4', 'Z5'],
    'medley': ['Z1', 'Z2', 'Z3', 'Z4', 'Z5'],
    'all': ['Z1', 'Z2', 'Z3', 'Z4', 'Z5'],
  };
  
  const zones = strokeZones[strokeType] || strokeZones['all'];
  return zoneRegistry.filter(z => zones.includes(z.zone));
}

/**
 * 根据Zone返回对应的颜色（训练计划设计.md颜色系统）
 */
export function getZoneColor(zone: Zone): string {
  const colorMap: Record<string, string> = {
    'Z1': '#FFFFFF',      // 白色 - 非常低强度
    'Z1-Z2': '#E8E8E8',   // 浅灰 - 过渡区
    'Z2': '#4A90E2',      // 蓝色 - 低强度
    'Z2-Z3': '#5BA3F5',   // 浅蓝 - 过渡区
    'Z3': '#7ED321',      // 绿色 - 中等强度
    'Z3-Z4': '#8FE32E',   // 浅绿 - 过渡区
    'Z4': '#F5A623',      // 黄色 - 高强度
    'Z4-Z5': '#FF8C00',   // 橙色 - 过渡区
    'Z5': '#D0021B',      // 红色 - 非常高强度
  };
  
  return colorMap[zone] || '#808080';
}

/**
 * 根据心率百分比获取对应的Zone
 */
export function getZoneByHrPercentage(percentage: number): ZoneEntry | undefined {
  if (percentage < 60) {
    return zoneRegistry.find(z => z.zone === 'Z1');
  }
  if (percentage >= 60 && percentage < 70) {
    return zoneRegistry.find(z => z.zone === 'Z2');
  }
  if (percentage >= 70 && percentage < 80) {
    return zoneRegistry.find(z => z.zone === 'Z3');
  }
  if (percentage >= 80 && percentage < 90) {
    return zoneRegistry.find(z => z.zone === 'Z4');
  }
  if (percentage >= 90) {
    return zoneRegistry.find(z => z.zone === 'Z5');
  }
  
  return undefined;
}

/**
 * 根据血乳酸水平获取对应的Zone
 */
export function getZoneByLactate(lactate: number): ZoneEntry | undefined {
  if (lactate < 2) {
    return zoneRegistry.find(z => z.zone === 'Z1');
  }
  if (lactate >= 2 && lactate < 3) {
    return zoneRegistry.find(z => z.zone === 'Z2');
  }
  if (lactate >= 3 && lactate < 5) {
    return zoneRegistry.find(z => z.zone === 'Z3');
  }
  if (lactate >= 5 && lactate < 8) {
    return zoneRegistry.find(z => z.zone === 'Z4');
  }
  if (lactate >= 8) {
    return zoneRegistry.find(z => z.zone === 'Z5');
  }
  
  return undefined;
}

/**
 * 根据训练阶段获取推荐的Zone分布
 */
export function getZoneDistributionByPhase(phase: string): { zone: Zone; percentage: number }[] {
  const distributions: Record<string, { zone: Zone; percentage: number }[]> = {
    'general-prep': [
      { zone: 'Z2', percentage: 60 },
      { zone: 'Z3', percentage: 20 },
      { zone: 'Z4', percentage: 15 },
      { zone: 'Z5', percentage: 5 },
    ],
    'specific-prep': [
      { zone: 'Z2', percentage: 40 },
      { zone: 'Z3', percentage: 30 },
      { zone: 'Z4', percentage: 20 },
      { zone: 'Z5', percentage: 10 },
    ],
    'pre-competition': [
      { zone: 'Z2', percentage: 25 },
      { zone: 'Z3', percentage: 25 },
      { zone: 'Z4', percentage: 30 },
      { zone: 'Z5', percentage: 20 },
    ],
    'taper': [
      { zone: 'Z2', percentage: 15 },
      { zone: 'Z3', percentage: 20 },
      { zone: 'Z4', percentage: 35 },
      { zone: 'Z5', percentage: 30 },
    ],
    'recovery': [
      { zone: 'Z1', percentage: 80 },
      { zone: 'Z2', percentage: 20 },
    ],
  };
  
  return distributions[phase] || distributions['general-prep'];
}
