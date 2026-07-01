import { ModifierEntry } from './REGISTRY_SCHEMA';

/**
 * Modifier Registry - 个性化训练修饰符
 *
 * 每个 Modifier 代表一种训练上下文（运动员类型/伤病/年龄组/目标），
 * 对基础训练方案进行适当调整。
 *
 * 来源: 铁三训练.md, 错误库.md, 青少年游泳.md, 营养与恢复.md
 *
 * 注意: remove 字段限制为 DrillPurpose[] | StrokeType[]，非该类型的训练移除建议放在 note 中。
 */

export const modifierRegistry: ModifierEntry[] = [
  // =============================================================
  // === 运动员类型 (athlete_type) ===
  // =============================================================
  {
    id: 'modifier-triathlon',
    name: 'Triathlon',
    nameZh: '铁人三项运动员',
    type: 'athlete_type',
    description: '铁三游泳阶段需为自行车和跑步保留体力，以高效完成为核心而非拼速度；需要开放水域能力、持续稳定输出和精准导航。',
    impact: {
      remove: ['打腿技术'],
      add: ['开放水域技术', '持续Z2输出', 'Paddles训练', 'Pull训练', '跟随训练', '导航训练', '防寒泳衣适应'],
      zoneAdjustment: 'widen',
      note: '不要过度消耗体力；Zone2-3为主，Sprint为辅；CSS配速训练是体能的基石；两拍打腿节能；移除大量冲刺训练',
    },
    recommendedDrills: ['drill-breathing-01', 'drill-balance-01', 'drill-kick-02'],
    watchOutErrors: ['error-general-overpacing', 'error-freestyle-kick-02', 'error-freestyle-entry-01'],
    applicableTo: ['freestyle'],
  },

  {
    id: 'modifier-sprinter',
    name: 'Sprinter',
    nameZh: '短距离专项运动员',
    type: 'athlete_type',
    description: '50-100米专项，爆发力和速度耐力为核心需求，需要强大的无氧能力和精准的出发转身技术。',
    impact: {
      remove: [],
      add: ['爆发力训练', '无氧能力训练', '出发技术', '转身技术', '水下海豚踢', '六拍打腿强化'],
      zoneAdjustment: 'up',
      note: 'Z4-Z5高强度为主，力量训练比重大，出发和转身是决胜关键；注意肩部保护，高强度训练后充分恢复',
    },
    recommendedDrills: ['drill-start-01', 'drill-turn-01', 'drill-kick-04', 'drill-stroke-01'],
    watchOutErrors: ['error-general-shoulder-01', 'error-general-overtraining'],
    applicableTo: ['freestyle', 'butterfly'],
  },

  {
    id: 'modifier-distance',
    name: 'Distance',
    nameZh: '长距离专项运动员',
    type: 'athlete_type',
    description: '800-1500米及以上中长距离，高水平有氧耐力为基础，高效划水技术和经济配速是关键。',
    impact: {
      remove: [],
      add: ['有氧耐力训练', '阈值配速训练', '划水效率优化', '双侧呼吸', '节奏训练'],
      zoneAdjustment: 'down',
      note: 'Z2-Z3有氧为主，Z4阈值为辅；技术效率决定能量消耗；划次(DPS)持续优化；双侧呼吸必须掌握以避免游偏',
    },
    recommendedDrills: ['drill-breathing-02', 'drill-stroke-02', 'drill-rotation-01'],
    watchOutErrors: ['error-general-overpacing', 'error-freestyle-breathing-04'],
    applicableTo: ['freestyle', 'backstroke'],
  },

  // =============================================================
  // === 伤病限制 (injury) ===
  // =============================================================
  {
    id: 'modifier-shoulder-injury',
    name: 'Shoulder Injury',
    nameZh: '肩部伤病',
    type: 'injury',
    description: '肩袖/肩关节伤病（Swimmer\'s Shoulder），需避开高强度划水训练和加重肩部负荷的动作。常见于高重复划水、肩袖肌群不平衡、划水技术不佳。',
    impact: {
      remove: ['抓水/划水', '移臂技术'],
      add: ['水感培养', '打腿技术', '核心稳定性', '肩袖外旋强化', '高肘入水训练'],
      zoneAdjustment: 'down',
      note: '肩伤期间以Z1-Z2为主，避免任何肩部疼痛动作；避免拇指先入水（改为指尖先入水或小指入水）；保持内旋/外旋力量平衡；90°原则——避免肩关节外展/屈曲超过90°时负重',
    },
    recommendedDrills: ['drill-float-01', 'drill-kick-01', 'drill-balance-01'],
    watchOutErrors: ['error-freestyle-entry-02', 'error-freestyle-recovery-01', 'error-general-shoulder-01'],
    applicableTo: ['freestyle', 'backstroke', 'butterfly'],
  },

  {
    id: 'modifier-ankle-stiffness',
    name: 'Ankle Stiffness',
    nameZh: '踝关节僵硬',
    type: 'injury',
    description: '踝关节灵活性受限（背屈/跖屈受限），影响所有泳姿的打腿效率。铁人三项运动员因跑步和骑行背景尤为常见。',
    impact: {
      remove: [],
      add: ['踝关节灵活性训练', '垂直打腿', '脚蹼辅助训练', 'Pigeon Toed Kick', 'Sitting Ankle Stretch'],
      zoneAdjustment: 'down',
      note: '使用脚蹼补偿推进力，专注踢水幅度而非速度；僵硬的脚踝像"锚"一样增加阻力，持续踝关节伸展练习（每周多次）可逐步改善',
    },
    recommendedDrills: ['drill-kick-03', 'drill-kick-04', 'drill-float-02'],
    watchOutErrors: ['error-freestyle-kick-03', 'error-freestyle-kick-01'],
    applicableTo: ['freestyle', 'butterfly', 'backstroke'],
  },

  {
    id: 'modifier-knee-issue',
    name: 'Knee Issue',
    nameZh: '膝盖伤病',
    type: 'injury',
    description: '膝关节损伤（常见为Breaststroke Knee——蛙泳蹬腿扭转力矩导致），需避免蛙泳蹬腿的高负荷。也涉及跑步/骑行导致的髌骨问题。',
    impact: {
      remove: ['打腿技术'],
      add: ['核心稳定性', '水中浮板打腿（低强度）', '髋部灵活性训练', '自由泳为主，减少蛙泳训练量'],
      zoneAdjustment: 'down',
      note: '蛙泳蹬腿时膝盖分开角度不应超过肩宽；避免膝盖大幅弯曲；主要采用自由泳和仰泳训练；强化髋部驱动以减轻膝盖代偿',
    },
    recommendedDrills: ['drill-core-01', 'drill-balance-02'],
    watchOutErrors: ['error-freestyle-kick-01'],
    applicableTo: ['freestyle', 'backstroke', 'butterfly'],
  },

  {
    id: 'modifier-neck-issue',
    name: 'Neck Issue',
    nameZh: '颈椎/颈部伤病',
    type: 'injury',
    description: '颈椎损伤或慢性颈部不适，常见于过度抬头呼吸、长时间低头工作、肩部前倾导致的颈部紧张。',
    impact: {
      remove: ['出发技术'],
      add: ['呼吸技术纠正', '弓形波呼吸练习', '双侧呼吸', '肩胛稳定性训练', '颈椎伸展'],
      zoneAdjustment: 'down',
      note: '避免任何大幅抬头动作；使用弓形波呼吸（在波谷处呼吸），确保头部随身体滚动而非主动抬头；可采用仰泳训练减轻颈部负担；避免高强度出发训练',
    },
    recommendedDrills: ['drill-breathing-01', 'drill-breathing-02', 'drill-rotation-01'],
    watchOutErrors: ['error-freestyle-breathing-02', 'error-freestyle-breathing-04'],
    applicableTo: ['freestyle', 'backstroke', 'breaststroke', 'butterfly'],
  },

  // =============================================================
  // === 年龄组 (age_group) ===
  // =============================================================
  {
    id: 'modifier-youth-5-8',
    name: 'Youth Age 5-8',
    nameZh: '青少年 5-8岁（启蒙期）',
    type: 'age_group',
    description: '儿童启蒙期，以游戏和兴趣为主培养水感；骨骼生长快但肌肉力量弱，心肺发育未成熟，避免技术压力和高强度训练。',
    impact: {
      remove: [],
      add: ['趣味游戏', '多泳姿接触', '水感培养', '基础漂浮练习', '水中呼吸游戏', '基础打腿游戏'],
      zoneAdjustment: 'down',
      note: '每堂课20-40分钟，每周2-3次；训练以游戏为核心，每15-20分钟变换活动；90%以上时间用于技术和水感培养；竞赛参与极少或全无；骨骼骨骺板未闭合，禁止大负重',
    },
    recommendedDrills: ['drill-float-01', 'drill-float-02', 'drill-breathing-01', 'drill-kick-01'],
    watchOutErrors: [],
    applicableTo: ['all'],
  },

  {
    id: 'modifier-youth-9-12',
    name: 'Youth Age 9-12',
    nameZh: '青少年 9-12岁（基础期→技术深化期）',
    type: 'age_group',
    description: '运动技能学习黄金期（神经适应高峰），核心目标是学习四种泳姿的正确技术、发展水中协调能力、建立有氧基础。',
    impact: {
      remove: [],
      add: ['四种泳姿完整技术', '出发转身基础', '打腿技术强化', '双侧呼吸培养（9-10岁开始）', '有氧基础发展', '协调性训练'],
      zoneAdjustment: 'down',
      note: '80%训练精力放在技术打磨上；9-12岁是技能定型的关键期——错误技术一旦固化纠正成本指数级增长；训练时间45-75分钟/次，每周3-5次；每4-6周安排减量周；引入双侧呼吸（2周坚持克服不适期）',
    },
    recommendedDrills: ['drill-rotation-01', 'drill-stroke-02', 'drill-kick-02', 'drill-balance-01', 'drill-turn-01'],
    watchOutErrors: ['error-freestyle-breathing-01', 'error-freestyle-breathing-04', 'error-freestyle-kick-01', 'error-freestyle-bodyposition-01'],
    applicableTo: ['all'],
  },

  {
    id: 'modifier-youth-13-18',
    name: 'Youth Age 13-18',
    nameZh: '青少年 13-18岁（专项发展期）',
    type: 'age_group',
    description: '青春期激素变化促进肌肉增长，有氧能力和乳酸耐受逐步接近成人；可引入系统化高强度训练，但须重视生长突增（PHV）期间的技术"退化期"。',
    impact: {
      remove: [],
      add: ['系统化力量训练', '比赛配速训练', '高强度间歇训练', '比赛心理建设', '减量期（Taper）策略', '营养策略'],
      zoneAdjustment: 'up',
      note: '13-14岁引入系统化陆上训练和正式比赛（注重过程而非结果）；15-16岁专项深化，确定主项；17-18岁竞技表现优化；PHV期间减少高强度，增加灵活性和协调性训练；每4-6周安排减量周；注意"生长紧绷期"——灵活性暂时下降',
    },
    recommendedDrills: ['drill-start-01', 'drill-turn-01', 'drill-kick-04', 'drill-stroke-01'],
    watchOutErrors: ['error-general-overtraining', 'error-general-shoulder-01', 'error-general-core-01'],
    applicableTo: ['all'],
  },

  {
    id: 'modifier-master-40plus',
    name: 'Masters 40+',
    nameZh: '大师级泳者 40岁以上',
    type: 'age_group',
    description: '40岁以上成人游泳者，恢复时间比年轻运动员长，关节柔韧性和肌肉弹性下降，需要更充分的热身和恢复。',
    impact: {
      remove: [],
      add: ['热身延长', '冷身拉伸', '主动恢复', '关节灵活性训练', '肩部保护训练'],
      zoneAdjustment: 'down',
      note: '热身至少15分钟，注意关节保护和恢复；训练前后充分拉伸（肩/髋/踝为重点）；避免突然的高强度训练；优先保持技术质量而非训练量',
    },
    recommendedDrills: ['drill-float-01', 'drill-balance-01', 'drill-kick-01'],
    watchOutErrors: ['error-general-overtraining', 'error-general-shoulder-01'],
    applicableTo: ['all'],
  },

  {
    id: 'modifier-master-60plus',
    name: 'Masters 60+',
    nameZh: '大师级泳者 60岁以上',
    type: 'age_group',
    description: '60岁以上银发游泳者，关节退化风险增加，心肺功能自然下降，以健康维持和关节保全为首要目标。',
    impact: {
      remove: [],
      add: ['超长热身', '水中拉伸', '低强度有氧', '关节活动度训练', '平衡训练', '呼吸技术维持'],
      zoneAdjustment: 'down',
      note: '热身至少20分钟，强度控制在Z1-Z2；主要泳姿为自由泳和仰泳（对关节友好）；避免蝶泳和蛙泳高强度蹬腿；训练后充分冷身和拉伸；重视补水和电解质补充；建议使用Pull Buoy减少腿部负担',
    },
    recommendedDrills: ['drill-float-01', 'drill-breathing-01', 'drill-balance-01'],
    watchOutErrors: ['error-general-overtraining'],
    applicableTo: ['freestyle', 'backstroke'],
  },

  // =============================================================
  // === 训练目标 (goal) ===
  // =============================================================
  {
    id: 'modifier-goal-100free',
    name: 'Goal: 100m Freestyle',
    nameZh: '目标: 100米自由泳',
    type: 'goal',
    description: '短距离爆发力为主，需要速度耐力平衡，出色的出发转身和水下海豚踢是决胜关键。能量系统：磷酸原+糖酵解。',
    impact: {
      remove: [],
      add: ['短冲训练', '阈值配速', '转身强化', '出发技术', '水下海豚踢', '六拍打腿'],
      zoneAdjustment: 'up',
      note: '100自需要Z4-Z5速度能力，Z3阈值耐力；出发和转身对成绩影响超过30%；前50米有氧+后50米无氧；保持高划水率',
    },
    recommendedDrills: ['drill-start-01', 'drill-turn-01', 'drill-kick-04', 'drill-stroke-01'],
    watchOutErrors: ['error-general-overpacing', 'error-freestyle-entry-01'],
    applicableTo: ['freestyle'],
  },

  {
    id: 'modifier-goal-1500free',
    name: 'Goal: 1500m Freestyle',
    nameZh: '目标: 1500米自由泳',
    type: 'goal',
    description: '长距离耐力为主，需要出色的有氧基础（有氧氧化系统占主导）、高效的划水效率和经济配速策略。',
    impact: {
      remove: [],
      add: ['有氧耐力训练（Z2-Z3）', 'CSS配速训练', '划水效率（DPS）', '双侧呼吸', '节奏训练', '配速策略演练'],
      zoneAdjustment: 'down',
      note: '有氧氧化占主导（约90%），Z2-Z3为基础训练区；CSS配速是核心比赛配速；优化划水效率减少划次；双侧呼吸必须掌握；注意后程冲刺能力',
    },
    recommendedDrills: ['drill-breathing-02', 'drill-stroke-02', 'drill-rotation-01'],
    watchOutErrors: ['error-general-overpacing', 'error-freestyle-breathing-04'],
    applicableTo: ['freestyle'],
  },

  {
    id: 'modifier-goal-200ima',
    name: 'Goal: 200m IM',
    nameZh: '目标: 200米个人混合泳',
    type: 'goal',
    description: '四种泳姿全面能力、泳姿间流畅转换（尤其蝶转仰、仰转蛙、蛙转自）和均衡的体能分配。',
    impact: {
      remove: [],
      add: ['四种泳姿均衡训练', '转换训练', '弱项泳姿专项攻克', '混合泳配速策略', '转身技术（各泳姿到各泳姿）'],
      zoneAdjustment: 'up',
      note: '蝶泳/仰泳/蛙泳/自由泳各约50米；弱项泳姿决定整体成绩——花更多时间攻克弱项；转换损失可超过1秒，需反复练习各泳姿衔接；体能分配：蝶泳不要过度消耗，自由泳留力冲刺',
    },
    recommendedDrills: ['drill-turn-02', 'drill-stroke-03', 'drill-kick-02', 'drill-breathing-01'],
    watchOutErrors: ['error-freestyle-rotation-01', 'error-freestyle-kick-01', 'error-general-overtraining'],
    applicableTo: ['medley'],
  },

  {
    id: 'modifier-goal-openwater',
    name: 'Goal: Open Water',
    nameZh: '目标: 开放水域游泳',
    type: 'goal',
    description: '开放水域或铁三游泳，需要导航（鳄鱼眼）、跟随（Drafting）、浮标转向和波浪适应等泳池不需要的专项技能。',
    impact: {
      remove: [],
      add: ['导航技术', '跟随训练', '浮标转向', '波浪适应', '双侧呼吸', '防寒泳衣适应', '集体出发模拟', '焦虑管理'],
      zoneAdjustment: 'widen',
      note: '稍高划水率以维持波浪中稳定；稍直臂移臂适应防寒泳衣和越过波浪；CSS配速为基础训练核心；每6-8划导航一次；跟随可节省38%能量；防寒泳衣至少赛前穿着练习3-4次',
    },
    recommendedDrills: ['drill-breathing-02', 'drill-stroke-02', 'drill-kick-02'],
    watchOutErrors: ['error-freestyle-breathing-04', 'error-general-overpacing', 'error-freestyle-entry-01'],
    applicableTo: ['freestyle'],
  },
];
