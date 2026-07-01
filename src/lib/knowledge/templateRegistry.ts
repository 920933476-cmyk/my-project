/**
 * Training Template Registry - 游泳训练模板注册表
 * 
 * 基于训练计划设计.md提取的训练模板，包含完整的训练结构
 * 适用于Rule Engine直接调用，生成个性化训练计划
 */

import { Zone, TemplateType } from './REGISTRY_SCHEMA';

// ============================================================
// Template Schema Definition
// ============================================================

export interface TrainingTemplate {
  id: string;
  name: string;
  nameZh: string;
  /** 模板类型 */
  type: TemplateType;
  /** 适用人群级别 */
  level: 'L1' | 'L2' | 'L3' | 'L4';
  /** 训练目标描述 */
  goal: string;
  /** 典型结构 */
  structure: TemplateSection[];
  /** Zone分布 */
  zoneDistribution: { zone: Zone; percentage: number }[];
  /** 推荐频次 */
  frequency: string;
  /** 注意事项 */
  cautions: string[];
  /** 来源 */
  source: string;
  /** 总训练量（米） */
  totalVolume?: string;
  /** 适用泳姿 */
  applicableStrokes?: string[];
}

export interface TemplateSection {
  phase: string;
  duration: string;
  content: string;
  zone: Zone;
  note?: string;
}

// ============================================================
// Template Registry
// ============================================================

export const templateRegistry: TrainingTemplate[] = [
  // ============================================================
  // 1. Sprint Training - 短冲专项训练
  // ============================================================
  
  {
    id: 'template-sprint-l3',
    name: 'Sprint Training - L3',
    nameZh: '短冲专项训练 L3',
    type: 'Sprint',
    level: 'L3',
    goal: '发展速度能力和爆发力，提升Z5区能力',
    structure: [
      {
        phase: '热身',
        duration: '20分钟',
        content: '200m游 + 4×50m Drill + Z1→Z2递增',
        zone: 'Z1-Z2',
        note: '充分激活，逐渐提升心率'
      },
      {
        phase: '主课',
        duration: '30分钟',
        content: '8-10×25m全力冲刺 / 45秒间歇',
        zone: 'Z5',
        note: '全力冲刺，充分恢复'
      },
      {
        phase: '主课',
        duration: '20分钟',
        content: '4×100m @ 85%配速 / 2:00间歇',
        zone: 'Z4',
        note: '速度耐力训练'
      },
      {
        phase: '冷身',
        duration: '15分钟',
        content: '200m轻松游 + 拉伸',
        zone: 'Z1',
        note: '促进恢复'
      }
    ],
    zoneDistribution: [
      { zone: 'Z1', percentage: 25 },
      { zone: 'Z2', percentage: 10 },
      { zone: 'Z4', percentage: 30 },
      { zone: 'Z5', percentage: 35 }
    ],
    frequency: '1-2次/周',
    cautions: [
      '需要充足热身（至少20分钟）',
      '短冲日不能连续高强度',
      '恢复时间96h+',
      '注意技术质量，疲劳时立即停止'
    ],
    source: 'Salo & Riewald - Complete Conditioning for Swimming',
    totalVolume: '1500-2000m',
    applicableStrokes: ['freestyle', 'backstroke', 'butterfly']
  },
  
  {
    id: 'template-sprint-l4',
    name: 'Sprint Training - L4',
    nameZh: '短冲专项训练 L4',
    type: 'Sprint',
    level: 'L4',
    goal: '精英级速度能力，比赛配速模拟，磷酸原系统训练',
    structure: [
      {
        phase: '热身',
        duration: '25分钟',
        content: '400m游 + 6×50m Drill递增 + 4×25m加速',
        zone: 'Z1-Z2',
        note: '充分激活神经肌肉系统'
      },
      {
        phase: '主课',
        duration: '35分钟',
        content: '12-15×25m全力冲刺 / 60秒间歇，比赛配速',
        zone: 'Z5',
        note: '比赛配速模拟，目标时间设定'
      },
      {
        phase: '主课',
        duration: '25分钟',
        content: '6×50m @ 90%配速 / 2:30间歇',
        zone: 'Z4-Z5',
        note: '速度耐力，乳酸耐受'
      },
      {
        phase: '冷身',
        duration: '15分钟',
        content: '300m轻松游 + 水感练习 + 拉伸',
        zone: 'Z1',
        note: '充分冷身'
      }
    ],
    zoneDistribution: [
      { zone: 'Z1', percentage: 20 },
      { zone: 'Z4', percentage: 30 },
      { zone: 'Z5', percentage: 50 }
    ],
    frequency: '1-2次/周（赛季中增加）',
    cautions: [
      '精英级训练，需要扎实的有氧基础',
      '赛前减量期使用',
      '监控疲劳信号',
      '配合出发转身训练'
    ],
    source: 'Salo & Riewald - Complete Conditioning for Swimming; Kalinowski - Elite Swimming Workout',
    totalVolume: '2000-2500m',
    applicableStrokes: ['freestyle', 'backstroke', 'butterfly']
  },
  
  // ============================================================
  // 2. Threshold Training - 阈值训练
  // ============================================================
  
  {
    id: 'template-threshold-l3',
    name: 'Threshold Training - L3',
    nameZh: '阈值训练 L3',
    type: 'Threshold',
    level: 'L3',
    goal: '提升乳酸阈值，发展CSS配速能力，有氧-无氧交界训练',
    structure: [
      {
        phase: '热身',
        duration: '15分钟',
        content: '400m游 + 4×50m Drill + 4×25m加速',
        zone: 'Z1-Z2',
        note: '逐渐提升心率'
      },
      {
        phase: '主课',
        duration: '40分钟',
        content: '4×400m @ CSS配速 / 45秒间歇',
        zone: 'Z3-Z4',
        note: 'CSS配速训练，阈值附近'
      },
      {
        phase: '主课',
        duration: '20分钟',
        content: '8×100m @ CSS-5秒 / 20秒间歇',
        zone: 'Z3',
        note: '节奏控制'
      },
      {
        phase: '冷身',
        duration: '10分钟',
        content: '200m轻松游 + 拉伸',
        zone: 'Z1',
        note: '促进恢复'
      }
    ],
    zoneDistribution: [
      { zone: 'Z1', percentage: 20 },
      { zone: 'Z2', percentage: 15 },
      { zone: 'Z3', percentage: 35 },
      { zone: 'Z4', percentage: 30 }
    ],
    frequency: '2-3次/周',
    cautions: [
      'CSS配速是训练核心',
      '间歇时间要严格控制',
      '心率监控建议',
      '疲劳时降低强度'
    ],
    source: 'Swim Smooth - Paul Newsome; Complete Conditioning for Swimming',
    totalVolume: '2800-3200m',
    applicableStrokes: ['freestyle', 'backstroke']
  },
  
  {
    id: 'template-threshold-l4',
    name: 'Threshold Training - L4',
    nameZh: '阈值训练 L4',
    type: 'Threshold',
    level: 'L4',
    goal: '精英级阈值训练，比赛配速适应，高阈值耐受',
    structure: [
      {
        phase: '热身',
        duration: '20分钟',
        content: '600m游 + 6×50m Drill递增 + 4×25m加速',
        zone: 'Z1-Z2',
        note: '充分激活'
      },
      {
        phase: '主课',
        duration: '45分钟',
        content: '6×400m @ CSS配速 / 30秒间歇',
        zone: 'Z3-Z4',
        note: '高阈值训练'
      },
      {
        phase: '主课',
        duration: '25分钟',
        content: '10×100m @ CSS-10秒 / 15秒间歇',
        zone: 'Z4',
        note: '接近比赛配速'
      },
      {
        phase: '冷身',
        duration: '15分钟',
        content: '300m轻松游 + 水感练习',
        zone: 'Z1',
        note: '充分冷身'
      }
    ],
    zoneDistribution: [
      { zone: 'Z1', percentage: 15 },
      { zone: 'Z3', percentage: 35 },
      { zone: 'Z4', percentage: 50 }
    ],
    frequency: '2-3次/周',
    cautions: [
      '精英级训练量',
      '需要充分恢复（72h+）',
      '配合心率监控',
      '赛前减量期降低组数'
    ],
    source: 'Swim Smooth - Paul Newsome; Kalinowski - Elite Swimming Workout',
    totalVolume: '4000-4500m',
    applicableStrokes: ['freestyle', 'backstroke', 'medley']
  },
  
  // ============================================================
  // 3. Endurance Training - 长距离耐力训练
  // ============================================================
  
  {
    id: 'template-endurance-l2',
    name: 'Endurance Training - L2',
    nameZh: '长距离耐力训练 L2',
    type: 'Endurance',
    level: 'L2',
    goal: '建立有氧基础，脂肪代谢能力，耐力底仓',
    structure: [
      {
        phase: '热身',
        duration: '15分钟',
        content: '400m游 + 4×50m Drill',
        zone: 'Z1-Z2',
        note: '轻松激活'
      },
      {
        phase: '主课',
        duration: '50分钟',
        content: '持续游 1000-1500m @ Z2配速',
        zone: 'Z2',
        note: 'Zone2节奏，保持稳定配速'
      },
      {
        phase: '主课',
        duration: '15分钟',
        content: '4×100m轻松游 / 20秒间歇',
        zone: 'Z2',
        note: '节奏保持'
      },
      {
        phase: '冷身',
        duration: '10分钟',
        content: '200m轻松游',
        zone: 'Z1',
        note: '放松'
      }
    ],
    zoneDistribution: [
      { zone: 'Z1', percentage: 20 },
      { zone: 'Z2', percentage: 80 }
    ],
    frequency: '2-3次/周',
    cautions: [
      '保持轻松配速，可以对话',
      '不需要追求速度',
      '适合基础期和恢复日',
      '技术练习可嵌入'
    ],
    source: 'Swim Smooth - Paul Newsome; Science of Swimming',
    totalVolume: '2000-2500m',
    applicableStrokes: ['freestyle', 'backstroke']
  },
  
  {
    id: 'template-endurance-l3',
    name: 'Endurance Training - L3',
    nameZh: '长距离耐力训练 L3',
    type: 'Endurance',
    level: 'L3',
    goal: '进阶有氧能力，有氧基础巩固，耐力发展',
    structure: [
      {
        phase: '热身',
        duration: '15分钟',
        content: '600m游 + 4×50m Drill + 4×25m加速',
        zone: 'Z1-Z2',
        note: '充分激活'
      },
      {
        phase: '主课',
        duration: '55分钟',
        content: '3×500m @ CSS+15秒 / 30秒间歇',
        zone: 'Z2',
        note: '有氧耐力，稳定配速'
      },
      {
        phase: '主课',
        duration: '20分钟',
        content: '8×100m @ Z2-Z3递增 / 15秒间歇',
        zone: 'Z2-Z3',
        note: '节奏递增'
      },
      {
        phase: '冷身',
        duration: '10分钟',
        content: '300m轻松游 + 拉伸',
        zone: 'Z1',
        note: '促进恢复'
      }
    ],
    zoneDistribution: [
      { zone: 'Z1', percentage: 15 },
      { zone: 'Z2', percentage: 65 },
      { zone: 'Z3', percentage: 20 }
    ],
    frequency: '2-3次/周',
    cautions: [
      '保持配速稳定',
      '呼吸节奏控制',
      '技术质量优先',
      '适合基础期'
    ],
    source: 'Swim Smooth - Paul Newsome; Science of Swimming',
    totalVolume: '3000-3500m',
    applicableStrokes: ['freestyle', 'backstroke', 'medley']
  },
  
  // ============================================================
  // 4. Technique Training - 技术训练
  // ============================================================
  
  {
    id: 'template-technique-l1',
    name: 'Technique Training - L1',
    nameZh: '技术训练 L1',
    type: 'Technique',
    level: 'L1',
    goal: '技术基础建立，水感培养，动作模式学习',
    structure: [
      {
        phase: '热身',
        duration: '10分钟',
        content: '200m轻松游',
        zone: 'Z1',
        note: '放松激活'
      },
      {
        phase: '主课',
        duration: '40分钟',
        content: 'Drill练习：4×50m × 4组不同Drill',
        zone: 'Z1-Z2',
        note: '技术分解练习，专注动作质量'
      },
      {
        phase: '主课',
        duration: '15分钟',
        content: '完整泳姿练习：4×25m + 2×50m',
        zone: 'Z1-Z2',
        note: '整合技术'
      },
      {
        phase: '冷身',
        duration: '10分钟',
        content: '100m轻松游',
        zone: 'Z1',
        note: '放松'
      }
    ],
    zoneDistribution: [
      { zone: 'Z1', percentage: 80 },
      { zone: 'Z2', percentage: 20 }
    ],
    frequency: '3-4次/周',
    cautions: [
      '技术优先于速度',
      '每次Drill专注一个技术点',
      '及时反馈和纠正',
      '保持轻松节奏'
    ],
    source: '100 More Swimming Drills - Blythe Lucero; Technique Swim Workouts',
    totalVolume: '800-1200m',
    applicableStrokes: ['all']
  },
  
  {
    id: 'template-technique-l2',
    name: 'Technique Training - L2',
    nameZh: '技术训练 L2',
    type: 'Technique',
    level: 'L2',
    goal: '技术巩固，动作优化，效率提升',
    structure: [
      {
        phase: '热身',
        duration: '15分钟',
        content: '400m游 + 4×50m Drill',
        zone: 'Z1-Z2',
        note: '热身激活'
      },
      {
        phase: '主课',
        duration: '45分钟',
        content: 'Drill + Swim交替：6×50m Drill + 50m游 × 3组',
        zone: 'Z1-Z2',
        note: '技术整合，Drill后立即应用'
      },
      {
        phase: '主课',
        duration: '15分钟',
        content: '划次控制练习：4×50m @ DPS目标',
        zone: 'Z2',
        note: '效率训练，减少划次'
      },
      {
        phase: '冷身',
        duration: '10分钟',
        content: '200m轻松游 + 拉伸',
        zone: 'Z1',
        note: '放松'
      }
    ],
    zoneDistribution: [
      { zone: 'Z1', percentage: 60 },
      { zone: 'Z2', percentage: 40 }
    ],
    frequency: '2-3次/周',
    cautions: [
      'Drill后立即整合到完整泳姿',
      '划次目标设定',
      '质量优先于数量',
      '视频反馈建议'
    ],
    source: '100 More Swimming Drills - Blythe Lucero; Swim Smooth',
    totalVolume: '1500-2000m',
    applicableStrokes: ['all']
  },
  
  // ============================================================
  // 5. Recovery Training - 恢复训练
  // ============================================================
  
  {
    id: 'template-recovery-l1',
    name: 'Recovery Training - L1',
    nameZh: '恢复训练 L1',
    type: 'Recovery',
    level: 'L1',
    goal: '主动恢复，促进血液循环，消除疲劳',
    structure: [
      {
        phase: '热身',
        duration: '10分钟',
        content: '200m轻松游',
        zone: 'Z1',
        note: '非常轻松'
      },
      {
        phase: '主课',
        duration: '30分钟',
        content: '轻松游 400-600m，技术Drill嵌入',
        zone: 'Z1',
        note: '完全不喘，可以对话'
      },
      {
        phase: '主课',
        duration: '10分钟',
        content: '水感练习（Sculling）',
        zone: 'Z1',
        note: '轻松水感'
      },
      {
        phase: '冷身',
        duration: '10分钟',
        content: '200m超轻松游 + 拉伸',
        zone: 'Z1',
        note: '完全放松'
      }
    ],
    zoneDistribution: [
      { zone: 'Z1', percentage: 100 }
    ],
    frequency: '高强度训练后次日',
    cautions: [
      '完全不追求速度',
      '保持轻松对话节奏',
      '随时可以停止',
      '适合比赛后恢复'
    ],
    source: 'Complete Conditioning for Swimming; Science of Swimming',
    totalVolume: '800-1000m',
    applicableStrokes: ['all']
  },
  
  // ============================================================
  // 6. Mixed Training - 混合训练
  // ============================================================
  
  {
    id: 'template-mixed-l3',
    name: 'Mixed Training - L3',
    nameZh: '混合训练 L3',
    type: 'Mixed',
    level: 'L3',
    goal: '综合能力发展，多Zone组合，训练多样性',
    structure: [
      {
        phase: '热身',
        duration: '15分钟',
        content: '400m游 + 4×50m Drill + 4×25m加速',
        zone: 'Z1-Z2',
        note: '充分激活'
      },
      {
        phase: '主课',
        duration: '30分钟',
        content: '4×200m @ Z2配速 / 30秒间歇',
        zone: 'Z2',
        note: '有氧基础'
      },
      {
        phase: '主课',
        duration: '25分钟',
        content: '8×50m @ Z3-Z4递增 / 20秒间歇',
        zone: 'Z3-Z4',
        note: '阈值训练'
      },
      {
        phase: '主课',
        duration: '15分钟',
        content: '6×25m冲刺 / 45秒间歇',
        zone: 'Z5',
        note: '速度训练'
      },
      {
        phase: '冷身',
        duration: '10分钟',
        content: '200m轻松游 + 拉伸',
        zone: 'Z1',
        note: '放松恢复'
      }
    ],
    zoneDistribution: [
      { zone: 'Z1', percentage: 15 },
      { zone: 'Z2', percentage: 30 },
      { zone: 'Z3', percentage: 25 },
      { zone: 'Z4', percentage: 20 },
      { zone: 'Z5', percentage: 10 }
    ],
    frequency: '1-2次/周',
    cautions: [
      '多Zone组合，注意强度控制',
      '适合赛季中维持状态',
      '监控疲劳累积',
      '可根据重点调整比例'
    ],
    source: 'Kalinowski - Elite Swimming Workout; Science of Swimming',
    totalVolume: '2500-3000m',
    applicableStrokes: ['freestyle', 'backstroke', 'medley']
  },
  
  // ============================================================
  // 7. Open Water Training - 开放水域专项
  // ============================================================
  
  {
    id: 'template-openwater-l3',
    name: 'Open Water Training - L3',
    nameZh: '开放水域专项训练 L3',
    type: 'Endurance',
    level: 'L3',
    goal: '开放水域适应， sighting技术，群体出发能力',
    structure: [
      {
        phase: '热身',
        duration: '15分钟',
        content: '400m游 + 4×50m Drill',
        zone: 'Z1-Z2',
        note: '热身激活'
      },
      {
        phase: '主课',
        duration: '40分钟',
        content: '持续游 1200-1500m，每100m sighting练习',
        zone: 'Z2-Z3',
        note: '开放水域sighting技术'
      },
      {
        phase: '主课',
        duration: '20分钟',
        content: '群体出发模拟：4×100m快出发 / 45秒间歇',
        zone: 'Z3-Z4',
        note: '模拟比赛出发'
      },
      {
        phase: '冷身',
        duration: '10分钟',
        content: '200m轻松游',
        zone: 'Z1',
        note: '放松'
      }
    ],
    zoneDistribution: [
      { zone: 'Z1', percentage: 15 },
      { zone: 'Z2', percentage: 50 },
      { zone: 'Z3', percentage: 25 },
      { zone: 'Z4', percentage: 10 }
    ],
    frequency: '1-2次/周（赛前增加）',
    cautions: [
      'sighting技术重点练习',
      '模拟比赛环境',
      '注意方向控制',
      '适合铁三和公开水域比赛'
    ],
    source: 'Swim Smooth - Paul Newsome; 耐力训练.md',
    totalVolume: '2200-2700m',
    applicableStrokes: ['freestyle']
  },
  
  // ============================================================
  // 8. Triathlon Swim Training - 铁三游泳训练
  // ============================================================
  
  {
    id: 'template-triathlon-l3',
    name: 'Triathlon Swim Training - L3',
    nameZh: '铁三游泳专项训练 L3',
    type: 'Endurance',
    level: 'L3',
    goal: '铁三游泳专项，Zone2-3持续输出，节能游泳',
    structure: [
      {
        phase: '热身',
        duration: '15分钟',
        content: '400m游 + 4×50m Drill',
        zone: 'Z1-Z2',
        note: '热身激活'
      },
      {
        phase: '主课',
        duration: '50分钟',
        content: '持续游 1500-2000m @ Z2-Z3配速',
        zone: 'Z2-Z3',
        note: '铁三比赛配速，节能输出'
      },
      {
        phase: '主课',
        duration: '15分钟',
        content: '4×100m @ Z3 / 20秒间歇',
        zone: 'Z3',
        note: '节奏控制'
      },
      {
        phase: '冷身',
        duration: '10分钟',
        content: '200m轻松游 + 拉伸',
        zone: 'Z1',
        note: '放松'
      }
    ],
    zoneDistribution: [
      { zone: 'Z1', percentage: 15 },
      { zone: 'Z2', percentage: 55 },
      { zone: 'Z3', percentage: 30 }
    ],
    frequency: '2-3次/周',
    cautions: [
      '保持节能游泳',
      'Zone2-3为主，不过度消耗',
      '为跑步和骑行保留体能',
      'sighting技术结合'
    ],
    source: 'Swim Smooth - Paul Newsome; 耐力训练.md; Complete Conditioning for Swimming',
    totalVolume: '2500-3000m',
    applicableStrokes: ['freestyle']
  },
  
  // ============================================================
  // 9. IM (Individual Medley) Training - 个人混合泳训练
  // ============================================================
  
  {
    id: 'template-im-l3',
    name: 'IM Training - L3',
    nameZh: '个人混合泳训练 L3',
    type: 'Mixed',
    level: 'L3',
    goal: '四种泳姿综合发展，转身技术，节奏转换',
    structure: [
      {
        phase: '热身',
        duration: '15分钟',
        content: '400m IM顺序游（各100m）',
        zone: 'Z1-Z2',
        note: '四泳姿激活'
      },
      {
        phase: '主课',
        duration: '35分钟',
        content: '4×100m IM @ Z2-Z3 / 30秒间歇',
        zone: 'Z2-Z3',
        note: '混合泳节奏'
      },
      {
        phase: '主课',
        duration: '25分钟',
        content: '各泳姿专项：4×50m蝶 + 4×50m仰 + 4×50m蛙 + 4×50m自',
        zone: 'Z3',
        note: '各泳姿技术强化'
      },
      {
        phase: '冷身',
        duration: '10分钟',
        content: '200m轻松游',
        zone: 'Z1',
        note: '放松'
      }
    ],
    zoneDistribution: [
      { zone: 'Z1', percentage: 20 },
      { zone: 'Z2', percentage: 30 },
      { zone: 'Z3', percentage: 50 }
    ],
    frequency: '1-2次/周',
    cautions: [
      '四种泳姿均衡发展',
      '转身技术重点练习',
      '注意蛙泳对体能消耗的影响',
      '适合全面发展'
    ],
    source: 'Kalinowski - Elite Swimming Workout; Science of Swimming',
    totalVolume: '2200-2600m',
    applicableStrokes: ['medley']
  },
  
  // ============================================================
  // 10. Race Pace Training - 比赛配速训练
  // ============================================================
  
  {
    id: 'template-racepace-l4',
    name: 'Race Pace Training - L4',
    nameZh: '比赛配速训练 L4',
    type: 'Threshold',
    level: 'L4',
    goal: '比赛配速适应，目标时间设定，比赛模拟',
    structure: [
      {
        phase: '热身',
        duration: '20分钟',
        content: '600m游 + 6×50m Drill递增 + 4×25m加速',
        zone: 'Z1-Z2',
        note: '充分激活'
      },
      {
        phase: '主课',
        duration: '40分钟',
        content: '8-10×100m @ 比赛配速 / 目标时间+20秒间歇',
        zone: 'Z4-Z5',
        note: '比赛配速训练，目标时间设定'
      },
      {
        phase: '主课',
        duration: '20分钟',
        content: '4×50m @ 冲刺配速 / 60秒间歇',
        zone: 'Z5',
        note: '速度训练'
      },
      {
        phase: '冷身',
        duration: '15分钟',
        content: '300m轻松游 + 拉伸',
        zone: 'Z1',
        note: '充分冷身'
      }
    ],
    zoneDistribution: [
      { zone: 'Z1', percentage: 15 },
      { zone: 'Z4', percentage: 45 },
      { zone: 'Z5', percentage: 40 }
    ],
    frequency: '1-2次/周（赛前增加）',
    cautions: [
      '目标时间根据比赛成绩设定',
      '连续错过目标时间2次即停组',
      '建立比赛配速的肌肉记忆',
      '赛前减量期使用'
    ],
    source: 'Secrets of Race Pace Swimming - Ernest Cheung; Complete Conditioning for Swimming',
    totalVolume: '2200-2700m',
    applicableStrokes: ['freestyle', 'backstroke', 'butterfly', 'breaststroke']
  }
];

// ============================================================
// Template Helper Functions
// ============================================================

/**
 * 根据训练类型获取模板列表
 */
export function getTemplatesByType(type: TemplateType): TrainingTemplate[] {
  return templateRegistry.filter(t => t.type === type);
}

/**
 * 根据训练级别获取模板列表
 */
export function getTemplatesByLevel(level: 'L1' | 'L2' | 'L3' | 'L4'): TrainingTemplate[] {
  return templateRegistry.filter(t => t.level === level);
}

/**
 * 根据泳姿获取适用的模板列表
 */
export function getTemplatesByStroke(stroke: string): TrainingTemplate[] {
  return templateRegistry.filter(t => 
    !t.applicableStrokes || 
    t.applicableStrokes.includes(stroke) || 
    t.applicableStrokes.includes('all')
  );
}

/**
 * 根据训练阶段获取推荐的模板
 */
export function getTemplatesByPhase(phase: string): TrainingTemplate[] {
  const phaseTemplates: Record<string, string[]> = {
    'general-prep': ['template-endurance-l2', 'template-endurance-l3', 'template-technique-l2'],
    'specific-prep': ['template-threshold-l3', 'template-threshold-l4', 'template-mixed-l3'],
    'pre-competition': ['template-sprint-l3', 'template-sprint-l4', 'template-racepace-l4'],
    'taper': ['template-sprint-l4', 'template-racepace-l4', 'template-technique-l2'],
    'recovery': ['template-recovery-l1', 'template-technique-l1']
  };
  
  const templateIds = phaseTemplates[phase] || phaseTemplates['general-prep'];
  return templateRegistry.filter(t => templateIds.includes(t.id));
}

/**
 * 根据训练目标获取推荐的模板
 */
export function getTemplatesByGoal(goal: string): TrainingTemplate[] {
  const goalMap: Record<string, TemplateType[]> = {
    '速度': ['Sprint'],
    '耐力': ['Endurance', 'Threshold'],
    '技术': ['Technique'],
    '恢复': ['Recovery'],
    '综合': ['Mixed'],
    '比赛': ['Threshold', 'Sprint']
  };
  
  const types = goalMap[goal] || ['Mixed'];
  return templateRegistry.filter(t => types.includes(t.type));
}

/**
 * 获取模板的Zone分布摘要
 */
export function getTemplateZoneSummary(templateId: string): string {
  const template = templateRegistry.find(t => t.id === templateId);
  if (!template) return '';
  
  return template.zoneDistribution
    .map(z => `${z.zone}: ${z.percentage}%`)
    .join(', ');
}

/**
 * 计算模板的总训练量（从structure解析）
 */
export function calculateTemplateVolume(templateId: string): string {
  const template = templateRegistry.find(t => t.id === templateId);
  if (!template) return '0m';
  
  return template.totalVolume || '未指定';
}
