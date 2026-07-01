/**
 * Pocket Swimming Coach - Interval Registry
 * 间歇训练配置知识库
 *
 * 覆盖：短冲间歇、阈值间歇、耐力间歇、递减/分段间歇、技术间歇
 * 来源：训练计划设计.md（Section 3-4）、耐力训练.md（Section 3）
 */

import { IntervalEntry } from './REGISTRY_SCHEMA';

export const intervalRegistry: IntervalEntry[] = [
  // ============================================================
  // 1. Sprint Intervals — 短冲间歇（高强度，速度/冲刺训练）
  //    恢复类型：passive（充分恢复，保证每次冲刺质量）
  //    Zone: Z4-Z5，部分可达紫区
  // ============================================================
  {
    id: 'interval-sprint-15s',
    name: 'Sprint Interval 15s',
    nameZh: '短冲间歇 15秒',
    duration: '15s',
    useCases: ['速度训练', '冲刺训练'],
    recommendedZones: ['Z5'],
    typicalSets: '8-12x',
    recoveryType: 'passive',
    note: '全力冲刺约15-20米，恢复到心率降至Z2以下再重复。适合发展磷酸原系统和启动速度。',
  },
  {
    id: 'interval-sprint-25s',
    name: 'Sprint Interval 25s',
    nameZh: '短冲间歇 25秒',
    duration: '25s',
    useCases: ['速度训练', '冲刺训练'],
    recommendedZones: ['Z4', 'Z5'],
    typicalSets: '6-10x',
    recoveryType: 'passive',
    note: '约25-30米全力冲刺，充分恢复（1:3以上休息比）。发展无氧功率和高速力量。',
  },
  {
    id: 'interval-sprint-30s',
    name: 'Sprint Interval 30s',
    nameZh: '短冲间歇 30秒',
    duration: '30s',
    useCases: ['速度训练', '冲刺训练'],
    recommendedZones: ['Z4', 'Z5'],
    typicalSets: '6-8x',
    recoveryType: 'passive',
    note: '30秒全力冲刺约50米距离，恢复至心率充分下降。适用于100米专项运动员的速度耐力基础。',
  },

  // ============================================================
  // 2. Medium / Threshold Intervals — 阈值间歇
  //    恢复类型：active（积极恢复，保持心率）或 timed（固定时间）
  //    Zone: Z3-Z4，重点在绿色区+黄色区交界
  // ============================================================
  {
    id: 'interval-threshold-45s',
    name: 'Threshold Interval 45s',
    nameZh: '阈值间歇 45秒',
    duration: '45s',
    useCases: ['阈值训练', '速度训练'],
    recommendedZones: ['Z3', 'Z4'],
    typicalSets: '6-10x',
    recoveryType: 'timed',
    note: '45秒高强度持续游，20-30秒休息（1:1.5工作休息比）。提升乳酸阈值和有氧能力。',
  },
  {
    id: 'interval-threshold-1min',
    name: 'Threshold Interval 1:00',
    nameZh: '阈值间歇 1分钟',
    duration: '1:00',
    useCases: ['阈值训练', '耐力训练'],
    recommendedZones: ['Z3', 'Z4'],
    typicalSets: '4-8x',
    recoveryType: 'timed',
    note: '1分钟阈值配速（约75-100米），20-30秒休息。发展有氧功率和肌肉耐力。',
  },
  {
    id: 'interval-threshold-90s',
    name: 'Threshold Interval 1:30',
    nameZh: '阈值间歇 1分30秒',
    duration: '1:30',
    useCases: ['阈值训练', '耐力训练'],
    recommendedZones: ['Z3', 'Z4'],
    typicalSets: '4-6x',
    recoveryType: 'timed',
    note: '1分30秒阈值配速（约100-125米），20-40秒休息。适用于200-400米专项运动员的阈值训练。',
  },

  // ============================================================
  // 3. Long / Endurance Intervals — 耐力间歇
  //    恢复类型：timed（固定休息时间）
  //    Zone: Z2-Z3，部分绿色区
  // ============================================================
  {
    id: 'interval-endurance-2min',
    name: 'Endurance Interval 2:00',
    nameZh: '耐力间歇 2分钟',
    duration: '2:00',
    useCases: ['阈值训练', '耐力训练'],
    recommendedZones: ['Z2', 'Z3'],
    typicalSets: '3-5x',
    recoveryType: 'timed',
    note: '2分钟持续游（约100-150米），30-45秒休息。发展中短距离耐力。',
  },
  {
    id: 'interval-endurance-3min',
    name: 'Endurance Interval 3:00',
    nameZh: '耐力间歇 3分钟',
    duration: '3:00',
    useCases: ['耐力训练'],
    recommendedZones: ['Z2', 'Z3'],
    typicalSets: '3-4x',
    recoveryType: 'timed',
    note: '3分钟持续游（约150-200米），45-60秒休息。建设有氧基础、提高耐力水平。',
  },
  {
    id: 'interval-endurance-4min',
    name: 'Endurance Interval 4:00',
    nameZh: '耐力间歇 4分钟',
    duration: '4:00',
    useCases: ['耐力训练'],
    recommendedZones: ['Z2', 'Z3'],
    typicalSets: '2-4x',
    recoveryType: 'timed',
    note: '4分钟持续游（约200-300米），60秒左右休息。适用于长距离（800米/1500米）耐力建设。',
  },

  // ============================================================
  // 4. Pyramid (Descending/Ascending) — 金字塔递进间歇
  //    从短到长再到短，每个距离之间几乎没有额外休息
  // ============================================================
  {
    id: 'interval-pyramid-25-100',
    name: 'Pyramid 25-50-75-100-75-50-25',
    nameZh: '金字塔间歇 25-50-75-100-75-50-25',
    duration: '25-100m按金字塔',
    useCases: ['阈值训练', '耐力训练', '速度训练'],
    recommendedZones: ['Z3', 'Z4'],
    typicalSets: '1-2轮',
    recoveryType: 'timed',
    note: '25m→50m→75m→100m→75m→50m→25m递进再递减，组间20-30秒休息。综合发展速度耐力和配速感知。',
  },

  // ============================================================
  // 5. Broken — 分段间歇（在同一距离内插入休息）
  //    提高比赛配速下的持续能力
  // ============================================================
  {
    id: 'interval-broken-100',
    name: 'Broken 100 (4×25)',
    nameZh: '分段100米（4×25节奏）',
    duration: '4×25m (Broken 100)',
    useCases: ['阈值训练', '速度训练'],
    recommendedZones: ['Z3', 'Z4'],
    typicalSets: '3-6组',
    recoveryType: 'timed',
    note: '每组4×25米，每25米后休息10-15秒。维持比赛配速下模拟分段疲劳管理。目标每个25米接近目标配速。',
  },
  {
    id: 'interval-broken-100-v2',
    name: 'Broken 100 (2×50)',
    nameZh: '分段100米（2×50节奏）',
    duration: '2×50m (Broken 100)',
    useCases: ['阈值训练', '速度训练'],
    recommendedZones: ['Z3', 'Z4'],
    typicalSets: '4-8组',
    recoveryType: 'timed',
    note: '每组2×50米，50米间休息20-30秒。适合训练后程配速保持能力。',
  },

  // ============================================================
  // 6. Relay / IM — 接力/混合泳间歇
  // ============================================================
  {
    id: 'interval-im-200-broken',
    name: '200 Broken IM',
    nameZh: '200米混合泳分段',
    duration: '4×50m (IM order)',
    useCases: ['阈值训练', '耐力训练'],
    recommendedZones: ['Z3', 'Z4'],
    typicalSets: '2-4组',
    recoveryType: 'timed',
    note: '按蝶-仰-蛙-自顺序各50米，每个泳姿50米后休息15-20秒。训练泳姿转换能力、全面耐力及配速策略。',
  },
  {
    id: 'interval-im-100-kick',
    name: '100 IM Kick',
    nameZh: '100米混合泳打腿',
    duration: '4×25m (IM kick order)',
    useCases: ['技术训练', '耐力训练'],
    recommendedZones: ['Z3', 'Z4'],
    typicalSets: '2-4组',
    recoveryType: 'timed',
    note: '蝶腿→仰腿→蛙腿→自腿组合打腿，每个25米间休息15秒。发展四个泳姿的打腿力量。',
  },

  // ============================================================
  // 7. Technical — 技术间歇
  //    恢复时间短，专注技术质量
  // ============================================================
  {
    id: 'interval-technique-25',
    name: 'Technique 8×25 (20s rest)',
    nameZh: '技术间歇 8×25米（20秒间隔）',
    duration: '25m',
    useCases: ['技术训练', '热身', '恢复训练'],
    recommendedZones: ['Z1', 'Z2'],
    typicalSets: '8-16x',
    recoveryType: 'timed',
    note: '每次25米专注单项技术（高肘、呼吸时机、身体滚动等），20秒休息保持高质量。适合嵌入热身后或主项前。',
  },
  {
    id: 'interval-technique-50',
    name: 'Technique 6×50 (Drill/Swim)',
    nameZh: '技术间歇 6×50米（Drill/游交替）',
    duration: '50m',
    useCases: ['技术训练', '热身'],
    recommendedZones: ['Z1', 'Z2'],
    typicalSets: '6-12x',
    recoveryType: 'timed',
    note: '每50米前半段Drill后半段正常游，20-30秒休息。强调技术迁移——从Drill到完整划水的衔接。',
  },

  // ============================================================
  // 8. Race Pace — 比赛配速间歇
  //    基于 Race Pace 训练体系（来源：RPS）
  //    间歇计算公式：间歇时间 = 目标时间 + 20秒
  // ============================================================
  {
    id: 'interval-racepace-50',
    name: 'Race Pace 50m Set',
    nameZh: '比赛配速 50米组',
    duration: '50m',
    useCases: ['速度训练', '冲刺训练', '阈值训练'],
    recommendedZones: ['Z4', 'Z5'],
    typicalSets: '6-12x',
    recoveryType: 'timed',
    note: '目标时间用最快50米成绩。间歇=目标+20秒（取0或5结尾）。连续达标3-4个即主目标达成。',
  },
  {
    id: 'interval-racepace-100',
    name: 'Race Pace 100m Set',
    nameZh: '比赛配速 100米组',
    duration: '100m',
    useCases: ['阈值训练', '速度训练'],
    recommendedZones: ['Z3', 'Z4', 'Z5'],
    typicalSets: '4-8x',
    recoveryType: 'timed',
    note: '目标时间用100米第二个50米分段。间歇=目标+20秒。100米训练连续错过目标2次或累计3次即停组。',
  },
  {
    id: 'interval-racepace-200',
    name: 'Race Pace 200m Set',
    nameZh: '比赛配速 200米组',
    duration: '200m',
    useCases: ['阈值训练', '耐力训练'],
    recommendedZones: ['Z3', 'Z4'],
    typicalSets: '3-6x',
    recoveryType: 'timed',
    note: '目标时间用第3-4个50米分段平均值。间歇=目标+20秒。200米连续达标6-8个即主目标达成。',
  },

  // ============================================================
  // 9. Descending / Ascending — 递减/递进间歇
  // ============================================================
  {
    id: 'interval-descend-100',
    name: 'Descend 100m Set',
    nameZh: '递减间歇 100米',
    duration: '100m',
    useCases: ['阈值训练', '速度训练'],
    recommendedZones: ['Z3', 'Z4', 'Z5'],
    typicalSets: '4-6x',
    recoveryType: 'timed',
    note: '每个100米比上一个更快（时间递减），组间20-30秒休息。训练配速感知和加速能力。',
  },
  {
    id: 'interval-ascend-50',
    name: 'Ascend 50m Set (Negative Split)',
    nameZh: '递进间歇 50米（负分段）',
    duration: '50m',
    useCases: ['阈值训练', '耐力训练'],
    recommendedZones: ['Z2', 'Z3'],
    typicalSets: '6-10x',
    recoveryType: 'timed',
    note: '前半程轻松→后半程加速，从Z2渐升至Z3。后半程比前半程快即负分段。训练配速控制力。',
  },

  // ============================================================
  // 10. CSS Pace — 临界游泳速度间歇
  //    来源：Swim Smooth（SS Chapter 27）
  // ============================================================
  {
    id: 'interval-css-200',
    name: 'CSS Pace 200m Set',
    nameZh: 'CSS配速 200米组',
    duration: '200m',
    useCases: ['阈值训练', '耐力训练'],
    recommendedZones: ['Z3'],
    typicalSets: '3-6x',
    recoveryType: 'timed',
    note: 'CSS配速正负5秒/100米，组间15-30秒休息。CSS配速训练是最佳有氧能力训练区间，代表有氧与无氧的交界点。',
  },
  {
    id: 'interval-css-400',
    name: 'CSS Pace 400m Set',
    nameZh: 'CSS配速 400米组',
    duration: '400m',
    useCases: ['阈值训练', '耐力训练'],
    recommendedZones: ['Z2', 'Z3'],
    typicalSets: '2-4x',
    recoveryType: 'timed',
    note: 'CSS配速接近，组间45-60秒休息。适用于长距离游泳者的有氧耐力建设。',
  },

  // ============================================================
  // 11. Kick / Pull — 专项分解间歇
  // ============================================================
  {
    id: 'interval-kick-50',
    name: 'Kick 50m Set',
    nameZh: '打腿 50米组',
    duration: '50m',
    useCases: ['耐力训练', '技术训练'],
    recommendedZones: ['Z2', 'Z3'],
    typicalSets: '8-16x',
    recoveryType: 'timed',
    note: '打腿50米，15-30秒休息。可加脚蹼辅助提升腿部力量和耐力。',
  },
  {
    id: 'interval-pull-100',
    name: 'Pull 100m Set',
    nameZh: '划臂 100米组',
    duration: '100m',
    useCases: ['耐力训练', '技术训练'],
    recommendedZones: ['Z2', 'Z3'],
    typicalSets: '6-10x',
    recoveryType: 'timed',
    note: '使用浮板（Pull Buoy）专注划臂技术，20-30秒休息。发展划水技术、增加划距。',
  },
];
