/**
 * Pocket Swimming Coach - Registry Schema Definitions
 * 知识库结构化 Schema（v2.0）
 * 
 * 设计原则：
 * - Rule Engine 可直接调用，无需解析文章
 * - 每个 entry 足够自足，独立描述一个实体
 * - 字段语义明确，无歧义
 */

// ============================================================
// 1. Drill Registry
// ============================================================
export interface DrillEntry {
  /** 唯一标识符，格式: drill-{category}-{number} */
  id: string;
  /** 英文名称 */
  name: string;
  /** 中文名称 */
  nameZh: string;
  /** Drill 类别 */
  category: DrillCategory;
  /** 适用泳姿 */
  strokes: StrokeType[];
  /** 难度等级: L1(初学) | L2(进阶) | L3(熟练) | L4(高级) */
  level: 'L1' | 'L2' | 'L3' | 'L4';
  /** 主要训练目的 */
  purpose: DrillPurpose[];
  /** 操作步骤（分点描述） */
  steps: string[];
  /** 关键要点 */
  keyPoints: string[];
  /** 常见错误 */
  commonErrors: { error: string; correction: string }[];
  /** 推荐训练组合 */
  recommendedSets?: string;
  /** 推荐训练Zone */
  recommendedZones?: Zone[];
  /** 进阶/变体 */
  progressions?: string[];
  /** 禁忌症（不适合的人群/情况） */
  contraindications?: Contraindication[];
  /** 来源 */
  source: string;
  /** 标签（用于检索） */
  tags: string[];
}

export type DrillCategory =
  | 'float'           // 漂浮/流线型
  | 'balance'          // 身体位置/平衡
  | 'breathing'        // 呼吸
  | 'catch'            // 抓水/划水
  | 'kick'             // 打腿
  | 'rotation'         // 身体滚动
  | 'recovery'         // 移臂/恢复
  | 'turn'             // 转身
  | 'start'            // 出发
  | 'stroke'           // 完整划水
  | 'dryland';         // 陆上训练

export type StrokeType = 'freestyle' | 'backstroke' | 'breaststroke' | 'butterfly' | 'medley' | 'all';

export type DrillPurpose =
  | '水感培养'
  | '身体位置'
  | '呼吸技术'
  | '抓水/划水'
  | '打腿技术'
  | '身体滚动'
  | '移臂技术'
  | '转身技术'
  | '出发技术'
  | '节奏训练'
  | '髋部灵活性'
  | '核心稳定性';

export type Zone = 'Z1' | 'Z1-Z2' | 'Z2' | 'Z2-Z3' | 'Z3' | 'Z3-Z4' | 'Z4' | 'Z4-Z5' | 'Z5';

export type Contraindication = '肩伤' | '腰伤' | '颈椎伤' | '踝关节伤' | '膝盖伤' | '髋关节伤' | '初学者禁用' | '无脚蹼禁用';


// ============================================================
// 2. Error Registry
// ============================================================
export interface ErrorEntry {
  /** 唯一标识符，格式: error-{stroke}-{number} */
  id: string;
  /** 英文名称 */
  name: string;
  /** 中文名称 */
  nameZh: string;
  /** 所属泳姿 */
  stroke: StrokeType | 'general';
  /** 错误分类 */
  category: ErrorCategory;
  /** 表现症状 */
  symptoms: string[];
  /** 根本原因（因果链） */
  rootCauses: string[];
  /** 纠正方法（关联 Drill ID 列表） */
  correctionDrills: string[];   // 引用 DrillEntry.id
  /** 预防建议 */
  prevention: string[];
  /** 来源 */
  source: string;
  /** 标签 */
  tags: string[];
}

export type ErrorCategory =
  | 'breathing'      // 呼吸错误
  | 'bodyPosition'   // 身体位置
  | 'pull'           // 划水错误
  | 'kick'           // 打腿错误
  | 'recovery'       // 移臂错误
  | 'entry'          // 入水错误
  | 'rotation'       // 滚动错误
  | 'turn'           // 转身错误
  | 'start'          // 出发错误
  | 'rhythm'         // 节奏错误
  | 'general';       // 通用错误


// ============================================================
// 3. Stroke Registry
// ============================================================
export interface StrokeEntry {
  /** 唯一标识符，格式: stroke-{name}-{distance} */
  id: string;
  /** 泳姿名称（英文） */
  name: string;
  /** 泳姿名称（中文） */
  nameZh: string;
  /** 泳姿类型 */
  strokeType: StrokeType;
  /** 距离项目（如100/200/400/1500） */
  distances: string[];
  /** 技术重点（按优先级排列） */
  keyTechniques: StrokeTechnique[];
  /** 推荐训练Zone */
  recommendedZones: Zone[];
  /** 推荐训练模板类型 */
  recommendedTemplateTypes: TemplateType[];
  /** 推荐关联Drill（DrillEntry.id 列表） */
  recommendedDrills: string[];
  /** 常见错误（ErrorEntry.id 列表） */
  commonErrors: string[];
  /** 能量系统占比 */
  energySystem: EnergySystemContribution;
  /** 比赛策略要点 */
  raceStrategy?: string[];
  /** 来源 */
  source: string;
}

export interface StrokeTechnique {
  /** 技术名称 */
  name: string;
  /** 中文名 */
  nameZh: string;
  /** 优先级 */
  priority: 1 | 2 | 3;
  /** 描述 */
  description: string;
}

export interface EnergySystemContribution {
  /** 有氧系统占比（百分比） */
  aerobic: number;    // e.g., 60
  /** 乳酸阈占比 */
  threshold: number; // e.g., 30
  /** 无氧系统占比 */
  anaerobic: number;  // e.g., 10
}

export type TemplateType = 'Sprint' | 'Threshold' | 'Endurance' | 'Technique' | 'Recovery' | 'Mixed';


// ============================================================
// 4. Interval Registry
// ============================================================
export interface IntervalEntry {
  id: string;
  /** 名称 */
  name: string;
  /** 中文名 */
  nameZh: string;
  /** 持续时间 */
  duration: string;       // e.g., "15s", "30s", "45s", "1:00"
  /** 适用训练类型 */
  useCases: IntervalUseCase[];
  /** 推荐Zone */
  recommendedZones: Zone[];
  /** 典型应用场景 */
  typicalSets?: string;   // e.g., "8-12x"
  /** 恢复方式 */
  recoveryType: 'active' | 'passive' | 'timed';
  /** 说明 */
  note?: string;
}

export type IntervalUseCase =
  | '速度训练'
  | '冲刺训练'
  | '阈值训练'
  | '耐力训练'
  | '技术训练'
  | '恢复训练'
  | '热身'
  | '冷身';


// ============================================================
// 5. Volume Registry
// ============================================================
export interface VolumeEntry {
  id: string;
  /** 训练阶段 */
  phase: TrainingPhase;
  /** 周训练量区间（米） */
  weeklyVolumeRange: { min: number; max: number };  // in meters
  /** 单次训练量区间 */
  sessionVolumeRange: { min: number; max: number };
  /** Zone 分布建议 */
  zoneDistribution: { zone: Zone; percentage: number }[];
  /** 训练重点 */
  focus: string[];
  /** 注意事项 */
  cautions: string[];
}

export type TrainingPhase =
  | 'base'       // 基础期
  | 'build'       // 打磨期
  | 'peak'        // 巅峰期
  | 'taper'       // 减量期
  | 'recovery';   // 恢复期


// ============================================================
// 6. Modifier Registry
// ============================================================
export interface ModifierEntry {
  id: string;
  /** 修饰符名称 */
  name: string;
  /** 中文名 */
  nameZh: string;
  /** 类型 */
  type: ModifierType;
  /** 描述 */
  description: string;
  /** 对训练的影响 */
  impact: {
    /** 需要移除的训练内容 */
    remove?: DrillPurpose[] | StrokeType[];
    /** 需要加入的训练内容 */
    add?: DrillPurpose[] | string[];
    /** Zone 调整 */
    zoneAdjustment?: 'down' | 'up' | 'widen';
    /** 其他调整说明 */
    note: string;
  };
  /** 关联 Drill ID（推荐在此 Modifier 下使用的 Drill） */
  recommendedDrills: string[];
  /** 关联 Error ID（此 Modifier 下需要特别注意的错误） */
  watchOutErrors: string[];
  /** 适用场景 */
  applicableTo: StrokeType[];
}

export type ModifierType =
  | 'athlete_type'   // 运动员类型（铁三/短距离/长距离）
  | 'injury'          // 伤病限制
  | 'age_group'       // 年龄组
  | 'goal';           // 训练目标


// ============================================================
// 7. Recovery Registry
// ============================================================
export interface RecoveryEntry {
  id: string;
  /** 名称 */
  name: string;
  nameZh: string;
  /** 恢复类型 */
  type: RecoveryType;
  /** 时长 */
  duration?: string;
  /** 具体操作步骤 */
  steps: string[];
  /** 适用场景 */
  useCases: string[];
  /** 注意事项 */
  cautions: string[];
  /** 来源 */
  source: string;
}

export type RecoveryType =
  | 'warmup'     // 热身
  | 'cooldown'   // 冷身
  | 'active'     // 主动恢复
  | 'passive'    // 被动恢复
  | 'nutrition'; // 营养恢复


// ============================================================
// 8. Energy System / Zone Registry
// ============================================================
export interface ZoneEntry {
  id: string;
  zone: Zone;
  name: string;
  nameZh: string;
  /** 心率区间（可选） */
  hrRange?: string;
  /** 血乳酸水平（可选） */
  lactateLevel?: string;
  /** 典型感觉 */
  feel: string;
  /** 训练目的 */
  purpose: string;
  /** 典型训练内容 */
  typicalContent: string[];
  /** 恢复时间 */
  recoveryTime: string;
}
