/**
 * Pocket Swimming Coach - Volume Registry
 * 训练量配置知识库
 *
 * 覆盖：5个训练阶段 × 4个人群等级 = 20种组合
 * 来源：训练计划设计.md（Section 3, 6）、体能陆训.md、耐力训练.md
 */

import { VolumeEntry } from './REGISTRY_SCHEMA';

export const volumeRegistry: VolumeEntry[] = [
  // ============================================================
  // PHASE: Base (基础期 / 一般准备期)
  // 目标：打牢有氧基础，修复技术缺陷，逐步提升训练耐受能力
  // Zone分布: Z1 10%, Z2 60%, Z3 15%, Z4 10%, Z5 5%
  // ============================================================
  {
    id: 'volume-base-L1',
    phase: 'base',
    weeklyVolumeRange: { min: 3000, max: 6000 },
    sessionVolumeRange: { min: 1000, max: 1500 },
    zoneDistribution: [
      { zone: 'Z1', percentage: 10 },
      { zone: 'Z2', percentage: 60 },
      { zone: 'Z3', percentage: 15 },
      { zone: 'Z4', percentage: 10 },
      { zone: 'Z5', percentage: 5 },
    ],
    focus: ['建立水感', '呼吸基础训练', '基础打腿技术', '有氧基础建设'],
    cautions: ['避免高强度间歇', '多次数短时间优于单次长时间', '以技术为主导'],
  },
  {
    id: 'volume-base-L2',
    phase: 'base',
    weeklyVolumeRange: { min: 8000, max: 12000 },
    sessionVolumeRange: { min: 2000, max: 3000 },
    zoneDistribution: [
      { zone: 'Z1', percentage: 10 },
      { zone: 'Z2', percentage: 60 },
      { zone: 'Z3', percentage: 15 },
      { zone: 'Z4', percentage: 10 },
      { zone: 'Z5', percentage: 5 },
    ],
    focus: ['有氧耐力提升', '技术打磨', '打腿能力强化', '核心稳定性'],
    cautions: ['保持低强度占比', '不要过早追求速度', '注意休息日安排'],
  },
  {
    id: 'volume-base-L3',
    phase: 'base',
    weeklyVolumeRange: { min: 15000, max: 22000 },
    sessionVolumeRange: { min: 3000, max: 5000 },
    zoneDistribution: [
      { zone: 'Z1', percentage: 10 },
      { zone: 'Z2', percentage: 60 },
      { zone: 'Z3', percentage: 15 },
      { zone: 'Z4', percentage: 10 },
      { zone: 'Z5', percentage: 5 },
    ],
    focus: ['大容量有氧耐力', '阈值训练引入', '技术精细化', '陆上力量巩固'],
    cautions: ['训练量峰值不超过32,000米/周', '连续训练不超过3-4天', '监控疲劳信号'],
  },
  {
    id: 'volume-base-L4',
    phase: 'base',
    weeklyVolumeRange: { min: 20000, max: 35000 },
    sessionVolumeRange: { min: 5000, max: 8000 },
    zoneDistribution: [
      { zone: 'Z1', percentage: 10 },
      { zone: 'Z2', percentage: 60 },
      { zone: 'Z3', percentage: 15 },
      { zone: 'Z4', percentage: 10 },
      { zone: 'Z5', percentage: 5 },
    ],
    focus: ['年度最高训练量', '技术持续打磨', '打腿专项强化', '阈值能力基础'],
    cautions: ['量峰与强度峰不可同时出现', '每周增量不超过10-15%', '陆上力量每周3-4次', '含早训/晚训多堂课'],
  },

  // ============================================================
  // PHASE: Build (打磨期 / 专项准备期)
  // 目标：从一般有氧转向专项能力，引入乳酸阈值训练
  // Zone分布: Z1 5%, Z2 40%, Z3 30%, Z4 15%, Z5 10%
  // ============================================================
  {
    id: 'volume-build-L1',
    phase: 'build',
    weeklyVolumeRange: { min: 4000, max: 8000 },
    sessionVolumeRange: { min: 1200, max: 2000 },
    zoneDistribution: [
      { zone: 'Z1', percentage: 5 },
      { zone: 'Z2', percentage: 40 },
      { zone: 'Z3', percentage: 30 },
      { zone: 'Z4', percentage: 15 },
      { zone: 'Z5', percentage: 10 },
    ],
    focus: ['短间歇训练引入', '速度耐力基础', '比赛配速感知', '出发转身练习'],
    cautions: ['高强度间歇需充分恢复', '引入CSS配速训练', '保持技术训练比例不低于15%'],
  },
  {
    id: 'volume-build-L2',
    phase: 'build',
    weeklyVolumeRange: { min: 10000, max: 16000 },
    sessionVolumeRange: { min: 2500, max: 4000 },
    zoneDistribution: [
      { zone: 'Z1', percentage: 5 },
      { zone: 'Z2', percentage: 40 },
      { zone: 'Z3', percentage: 30 },
      { zone: 'Z4', percentage: 15 },
      { zone: 'Z5', percentage: 10 },
    ],
    focus: ['乳酸阈值强化', '比赛配速训练', '阻力专项力量', '混合泳训练'],
    cautions: ['绿色区(阈值)训练占比增加', '保持训练量不降下过多', '注意肩部预防训练'],
  },
  {
    id: 'volume-build-L3',
    phase: 'build',
    weeklyVolumeRange: { min: 18000, max: 28000 },
    sessionVolumeRange: { min: 4000, max: 6000 },
    zoneDistribution: [
      { zone: 'Z1', percentage: 5 },
      { zone: 'Z2', percentage: 40 },
      { zone: 'Z3', percentage: 30 },
      { zone: 'Z4', percentage: 15 },
      { zone: 'Z5', percentage: 10 },
    ],
    focus: ['专项配速能力', '乳酸耐受训练', '比赛战术模拟', '出发转身精细优化'],
    cautions: ['训练量仍保持高位', '高强度训练日之间间隔48小时', '监控划次变化判断疲劳'],
  },
  {
    id: 'volume-build-L4',
    phase: 'build',
    weeklyVolumeRange: { min: 18000, max: 28000 },
    sessionVolumeRange: { min: 5000, max: 8000 },
    zoneDistribution: [
      { zone: 'Z1', percentage: 5 },
      { zone: 'Z2', percentage: 40 },
      { zone: 'Z3', percentage: 30 },
      { zone: 'Z4', percentage: 15 },
      { zone: 'Z5', percentage: 10 },
    ],
    focus: ['高强度专项训练', 'Race Pace精准控制', '水中阻力训练', '力量→爆发力转化'],
    cautions: ['每日训练RPE控制在11-14区间', '短冲训练RPE 17+仅用于专项', '每周至少1个完整休息日'],
  },

  // ============================================================
  // PHASE: Peak (巅峰期 / 赛前子期)
  // 目标：训练强度达全年高峰，训练量开始下降
  // Zone分布: Z1 5%, Z2 20%, Z3 25%, Z4 30%, Z5 20%
  // ============================================================
  {
    id: 'volume-peak-L1',
    phase: 'peak',
    weeklyVolumeRange: { min: 2500, max: 5000 },
    sessionVolumeRange: { min: 800, max: 1500 },
    zoneDistribution: [
      { zone: 'Z1', percentage: 5 },
      { zone: 'Z2', percentage: 20 },
      { zone: 'Z3', percentage: 25 },
      { zone: 'Z4', percentage: 30 },
      { zone: 'Z5', percentage: 20 },
    ],
    focus: ['比赛配速模拟', '高强度短间歇', '出发练习', '心理准备'],
    cautions: ['训练量适当降低', '保持高强度但不力竭', '充分热身预防受伤'],
  },
  {
    id: 'volume-peak-L2',
    phase: 'peak',
    weeklyVolumeRange: { min: 6000, max: 12000 },
    sessionVolumeRange: { min: 2000, max: 3500 },
    zoneDistribution: [
      { zone: 'Z1', percentage: 5 },
      { zone: 'Z2', percentage: 20 },
      { zone: 'Z3', percentage: 25 },
      { zone: 'Z4', percentage: 30 },
      { zone: 'Z5', percentage: 20 },
    ],
    focus: ['比赛配速保持', '乳酸耐受训练', '混合泳转型', '转身频率训练'],
    cautions: ['训练强度达到全年最高', '量减强度不减', '充分睡眠8-10小时'],
  },
  {
    id: 'volume-peak-L3',
    phase: 'peak',
    weeklyVolumeRange: { min: 12000, max: 18000 },
    sessionVolumeRange: { min: 3500, max: 5000 },
    zoneDistribution: [
      { zone: 'Z1', percentage: 5 },
      { zone: 'Z2', percentage: 20 },
      { zone: 'Z3', percentage: 25 },
      { zone: 'Z4', percentage: 30 },
      { zone: 'Z5', percentage: 20 },
    ],
    focus: ['比赛专项配速', '高频短距离冲刺', '战术执行训练', '精神状态调整'],
    cautions: ['黄区+红区占比过半', '避免同时加大量和强度', '划次/HRV监测预防过度训练'],
  },
  {
    id: 'volume-peak-L4',
    phase: 'peak',
    weeklyVolumeRange: { min: 12000, max: 20000 },
    sessionVolumeRange: { min: 4000, max: 6000 },
    zoneDistribution: [
      { zone: 'Z1', percentage: 5 },
      { zone: 'Z2', percentage: 20 },
      { zone: 'Z3', percentage: 25 },
      { zone: 'Z4', percentage: 30 },
      { zone: 'Z5', percentage: 20 },
    ],
    focus: ['最高强度训练刺激', '比赛节奏完美模拟', '出发转身毫克优化', '心理可视化训练'],
    cautions: ['训练量较专项准备期下降', '两次高强度日之间充分休息', '监控过度训练综合征(OTS)信号'],
  },

  // ============================================================
  // PHASE: Taper (减量期)
  // 目标：消除累积疲劳，最大化竞技状态
  // 量降40-60%（相对正常量），保持强度
  // Zone分布: Z1 10%, Z2 15%, Z3 15%, Z4 30%, Z5 30%
  // ============================================================
  {
    id: 'volume-taper-L1',
    phase: 'taper',
    weeklyVolumeRange: { min: 1500, max: 3000 },
    sessionVolumeRange: { min: 500, max: 1000 },
    zoneDistribution: [
      { zone: 'Z1', percentage: 10 },
      { zone: 'Z2', percentage: 15 },
      { zone: 'Z3', percentage: 15 },
      { zone: 'Z4', percentage: 30 },
      { zone: 'Z5', percentage: 30 },
    ],
    focus: ['保持高强度短时间', '出发转身锚定', '技术校准', '心理放松'],
    cautions: ['减量不是停止训练', '赛前2天半量, 赛前1天1/3量', '充分睡眠8-10小时'],
  },
  {
    id: 'volume-taper-L2',
    phase: 'taper',
    weeklyVolumeRange: { min: 3000, max: 7000 },
    sessionVolumeRange: { min: 1500, max: 2500 },
    zoneDistribution: [
      { zone: 'Z1', percentage: 10 },
      { zone: 'Z2', percentage: 15 },
      { zone: 'Z3', percentage: 15 },
      { zone: 'Z4', percentage: 30 },
      { zone: 'Z5', percentage: 30 },
    ],
    focus: ['质量优先于数量', '比赛配速模拟', '出发转身高频练习', '营养管理'],
    cautions: ['训练量降40-60%', '2周前70%量, 1周前40-50%量', '不要尝试新技术或新训练'],
  },
  {
    id: 'volume-taper-L3',
    phase: 'taper',
    weeklyVolumeRange: { min: 5000, max: 10000 },
    sessionVolumeRange: { min: 2000, max: 3500 },
    zoneDistribution: [
      { zone: 'Z1', percentage: 10 },
      { zone: 'Z2', percentage: 15 },
      { zone: 'Z3', percentage: 15 },
      { zone: 'Z4', percentage: 30 },
      { zone: 'Z5', percentage: 30 },
    ],
    focus: ['冲刺保持', '比赛节奏锚定', '出发转身质量', '赛前营养堆叠'],
    cautions: ['赛前2-3天总量降至30%', '训练时间缩短但保持高质量', '避免社交压力干扰休息'],
  },
  {
    id: 'volume-taper-L4',
    phase: 'taper',
    weeklyVolumeRange: { min: 6000, max: 12000 },
    sessionVolumeRange: { min: 2500, max: 4000 },
    zoneDistribution: [
      { zone: 'Z1', percentage: 10 },
      { zone: 'Z2', percentage: 15 },
      { zone: 'Z3', percentage: 15 },
      { zone: 'Z4', percentage: 30 },
      { zone: 'Z5', percentage: 30 },
    ],
    focus: ['全力冲刺保持', '比赛策略最后完善', '热身流程固化', '心理巅峰调适'],
    cautions: [
      '2周前→70%正常量, 1周前→40-50%, 2-3天前→30%',
      '比赛前1天只做热身+技术锚定',
      'RPE监控减量期间强度',
    ],
  },

  // ============================================================
  // PHASE: Recovery (恢复期 / 过渡期)
  // 目标：身心完全恢复，消除累积疲劳
  // Zone分布: Z1 20%, Z2 60%, Z3 15%, Z4 5%, Z5 0%
  // ============================================================
  {
    id: 'volume-recovery-L1',
    phase: 'recovery',
    weeklyVolumeRange: { min: 1000, max: 3000 },
    sessionVolumeRange: { min: 500, max: 1000 },
    zoneDistribution: [
      { zone: 'Z1', percentage: 20 },
      { zone: 'Z2', percentage: 60 },
      { zone: 'Z3', percentage: 15 },
      { zone: 'Z4', percentage: 5 },
    ],
    focus: ['放松游泳', '水中游戏', '技术回顾', '交叉训练（骑行/瑜伽）'],
    cautions: ['完全脱离结构化训练', '以乐趣为主防止心理疲劳', '可进行伤病康复评估'],
  },
  {
    id: 'volume-recovery-L2',
    phase: 'recovery',
    weeklyVolumeRange: { min: 3000, max: 6000 },
    sessionVolumeRange: { min: 1000, max: 2000 },
    zoneDistribution: [
      { zone: 'Z1', percentage: 20 },
      { zone: 'Z2', percentage: 60 },
      { zone: 'Z3', percentage: 15 },
      { zone: 'Z4', percentage: 5 },
    ],
    focus: ['积极恢复游泳', '低速技术练习', '身体灵活性训练', '伤病预防评估'],
    cautions: ['不进行任何高强度训练', '2-6周过渡期后进入新周期', '记录赛季总结和分析'],
  },
  {
    id: 'volume-recovery-L3',
    phase: 'recovery',
    weeklyVolumeRange: { min: 5000, max: 12000 },
    sessionVolumeRange: { min: 2000, max: 3000 },
    zoneDistribution: [
      { zone: 'Z1', percentage: 20 },
      { zone: 'Z2', percentage: 60 },
      { zone: 'Z3', percentage: 15 },
      { zone: 'Z4', percentage: 5 },
    ],
    focus: ['积极性恢复', '交叉训练多样化', '灵活性/关节活动度提升', '伤兵管理'],
    cautions: ['低强度运动为主', '心理放松同样重要', '安排阶段性体检和评估'],
  },
  {
    id: 'volume-recovery-L4',
    phase: 'recovery',
    weeklyVolumeRange: { min: 6000, max: 15000 },
    sessionVolumeRange: { min: 2000, max: 4000 },
    zoneDistribution: [
      { zone: 'Z1', percentage: 20 },
      { zone: 'Z2', percentage: 60 },
      { zone: 'Z3', percentage: 15 },
      { zone: 'Z4', percentage: 5 },
    ],
    focus: ['完全身心恢复', '技术基础回顾', '伤病全面康复', '赛季总结与下赛季规划'],
    cautions: ['保持基本体能即可', '避免进入下一赛季时仍疲劳', '心理放松比身体恢复更需要关注'],
  },
];
