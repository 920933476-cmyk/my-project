/**
 * Pocket Swimming Coach - Stroke Registry
 * 泳姿知识库 Registry（v2.0）
 *
 * 包含4种泳姿的结构化数据
 * 自动生成自各泳姿专项.md文件
 */

import { StrokeEntry, Zone, TemplateType, StrokeType } from './REGISTRY_SCHEMA';

// ============================================================
// Stroke Registry - 泳姿注册表
// ============================================================

export const strokeRegistry: StrokeEntry[] = [
  // ============================================================
  // 1. Freestyle (自由泳)
  // ============================================================
  {
    id: 'stroke-freestyle-all',
    name: 'Freestyle',
    nameZh: '自由泳',
    strokeType: 'freestyle',
    distances: ['50', '100', '200', '400', '800', '1500'],
    keyTechniques: [
      {
        name: 'High Elbow Catch',
        nameZh: '高肘抓水',
        priority: 1,
        description: '肘部在划水周期中保持高于手的位置，形成有效杠杆系统。入水后立即建立高肘姿态，手掌满掌感受水的压力，像握着满杯凝胶。'
      },
      {
        name: 'Body Rotation',
        nameZh: '身体滚动',
        priority: 1,
        description: '身体沿脊柱长轴旋转45-60°，帮助移臂、减少肩部负担、利用大肌肉群驱动划水。滚动是游泳节奏的"时钟"。'
      },
      {
        name: 'Flutter Kick',
        nameZh: '上下打腿',
        priority: 2,
        description: '从髋部驱动打腿，膝盖放松略微弯曲，下打是动力相。主要功能为抬高腿部减少阻力，次要功能为产生推进力（10-15%）。'
      },
      {
        name: 'Breathing Technique',
        nameZh: '呼吸技术',
        priority: 2,
        description: '在水中持续呼气，利用弓形波在头部前方形成的凹陷区呼吸。转头时太阳穴/颧骨贴水面，保持低轮廓呼吸。双侧呼吸保持划水对称性。'
      },
      {
        name: 'Entry and Recovery',
        nameZh: '入水与移臂',
        priority: 3,
        description: '手以45-90°角切入水面，肘部高于手。移臂时肘先向前，手跟随，像从口袋掏手（Pocket Drill）。恢复臂靠近身体中线。'
      }
    ],
    recommendedZones: ['Z2', 'Z3', 'Z4'],
    recommendedTemplateTypes: ['Sprint', 'Threshold', 'Endurance'],
    recommendedDrills: [
      'drill-zipper-001',              // Zipper Drill
      'drill-fingertip-drag-001',      // Fingertip Drag
      'drill-shark-fin-001',           // Shark Fin Drill
      'drill-6-1-6-001',              // 6-1-6 Drill
      'drill-popov-001',               // Popov Drill
      'drill-broken-arrow-001',        // Broken Arrow Drill
      'drill-ballet-leg-kick-001',     // Ballet Leg Kick Drill
      'drill-sink-down-001',           // Sink Down Exercise
      'drill-shoulder-tap-001',        // Shoulder Tap Drill
    ],
    commonErrors: [
      'error-freestyle-drop-elbow',     // 掉肘（肘部低于手）
      'error-freestyle-head-lift',      // 抬头呼吸
      'error-freestyle-cross-over',      // 手臂交叉越过中线
      'error-freestyle-overreach',       // 入水过伸
      'error-freestyle-knee-bend',      // 膝盖过度弯曲打腿
      'error-freestyle-scissor-kick',   // 剪刀腿
    ],
    energySystem: {
      aerobic: 65,
      threshold: 25,
      anaerobic: 10
    },
    raceStrategy: [
      '短距离（50/100米）：高划水频率（54-55次/分钟），6拍打腿，Superposition协调模式',
      '中距离（200/400米）：平衡划水频率与划水长度，Opposition协调模式，保持节奏稳定',
      '长距离（800/1500米）：较低划水频率（38-41次/分钟），2拍打腿可能更高效，Catch-up协调模式，双侧呼吸',
      '出发和转身后15米水下海豚踢是关键推进段',
      '保持核心稳定性和身体流线型',
    ],
    source: 'Swim Smooth, Swim Speed Secrets, Science of Swimming Faster',
  },

  // ============================================================
  // 2. Backstroke (仰泳)
  // ============================================================
  {
    id: 'stroke-backstroke-all',
    name: 'Backstroke',
    nameZh: '仰泳',
    strokeType: 'backstroke',
    distances: ['50', '100', '200'],
    keyTechniques: [
      {
        name: 'Banana Position',
        nameZh: '香蕉位',
        priority: 1,
        description: '仰泳身体应呈香蕉形：收紧腹肌使脊椎成弧形。水面位置在耳后，头部独立不随身体滚动。眼睛向上看天花板，保持水线位。'
      },
      {
        name: 'Locked Elbow Recovery',
        nameZh: '高肘锁定恢复',
        priority: 1,
        description: '手臂出水后肘部先向前，手跟随，肘部在恢复阶段锁定伸直且高于头部。小指先入水（Pinkies Up），掌心朝外。'
      },
      {
        name: 'Pigeon Toed Kick',
        nameZh: '鸽子趾踢水',
        priority: 2,
        description: '双脚微内扣（鸽子趾），大脚趾轻触彼此。踢水由髋关节驱动，下打是动力相。幅度约15英寸（38cm），全程水下。'
      },
      {
        name: 'Body Rotation',
        nameZh: '身体滚动',
        priority: 2,
        description: '沿脊柱长轴滚动约30-40度，帮助手臂入水、高肘恢复、利用大肌肉群。头部独立于髋部旋转，保持静止。'
      },
      {
        name: 'Breathing Rhythm',
        nameZh: '呼吸节奏',
        priority: 3,
        description: '肩出水时吸气，肩入水时呼气。找"呼吸袋（Breathing Pocket）"时机——肩部出水滚动点。保持呼吸与划水节奏同步。'
      }
    ],
    recommendedZones: ['Z2', 'Z3', 'Z4'],
    recommendedTemplateTypes: ['Sprint', 'Threshold', 'Endurance'],
    recommendedDrills: [
      'drill-streamline-back-flutter-kick-001',  // Streamline Back Flutter Kick
      'drill-slow-flutter-on-back-001',          // Slow Flutter on Back
      'drill-cup-on-forehead-001',              // Cup on Forehead
      'drill-locked-elbow-recovery-001',         // Locked Elbow Recovery
      'drill-up-and-over-001',                   // Up and Over
      'drill-backstroke-l-drill-001',            // Backstroke L Drill
      'drill-pigeon-toed-kick-001',             // Pigeon Toed Kick
      'drill-pencil-float-001',                  // Pencil Float
    ],
    commonErrors: [
      'error-backstroke-head-roll',         // 头随身体滚动
      'error-backstroke-kick-splash',        // 踢水溅水花（抬膝太高）
      'error-backstroke-entry-wrong',        // 手入水不正（腕部下塌）
      'error-backstroke-over-rotation',      // 身体过度滚动（>40度）
      'error-backstroke-low-elbow',          // 恢复时肘部过低
      'error-backstroke-deep-pull',          // 划水过深
    ],
    energySystem: {
      aerobic: 60,
      threshold: 30,
      anaerobic: 10
    },
    raceStrategy: [
      '保持身体香蕉位（收紧腹肌，水面在耳后）',
      '高肘锁定恢复，小指先入水',
      '鸽子趾踢水，双脚微内扣',
      '头部保持独立，不随身体滚动',
      '转身时利用仰泳旗帜判断旋转时机，收紧团身翻转',
      '出发和转身后保持流线型，适度海豚踢',
    ],
    source: 'Swim Smooth, The Swimming Drill Book, Swimming Anatomy',
  },

  // ============================================================
  // 3. Breaststroke (蛙泳)
  // ============================================================
  {
    id: 'stroke-breaststroke-all',
    name: 'Breaststroke',
    nameZh: '蛙泳',
    strokeType: 'breaststroke',
    distances: ['50', '100', '200'],
    keyTechniques: [
      {
        name: 'Pull-Breathe-Kick-Glide Rhythm',
        nameZh: '划-呼-踢-滑节奏',
        priority: 1,
        description: '蛙泳核心节奏口诀：划臂→呼吸→踢水→滑行。严格按顺序执行，划蹬严格分离（No Stars），避免同时做抵消动力。'
      },
      {
        name: 'Oval Pull Path',
        nameZh: '椭圆形划水路径',
        priority: 1,
        description: '划水路径为椭圆形：外扫（Outsweep）→内扫（Insweep）→前伸（Extension）。内扫时加速，在角点（Corners）头部出水吸气。'
      },
      {
        name: 'Whip Kick',
        nameZh: '鞭状踢水',
        priority: 1,
        description: '踢水力量来自臀部，膝盖展开与肩同宽，脚踝必须外旋（外八字）。踢水路径呈月牙形，脚跟快速向臀部收回是核心技术。'
      },
      {
        name: 'Two Balance Points',
        nameZh: '两点平衡',
        priority: 2,
        description: '蛙泳有两个身体平衡点：高点（胸部-划水阶段）和低点（腹部-滑行阶段）。理解身体高度的起伏节奏，保持流线型。'
      },
      {
        name: 'Timing and Coordination',
        nameZh: '时机与协调',
        priority: 2,
        description: '手臂完全伸展后再开始收腿踢水，严格划蹬分离。内扫至角点时头部顺势出水吸气，不要主动抬头。'
      }
    ],
    recommendedZones: ['Z2', 'Z3', 'Z4'],
    recommendedTemplateTypes: ['Endurance', 'Threshold', 'Technique'],
    recommendedDrills: [
      'drill-streamline-breaststroke-kick-001',   // Streamline Breaststroke Kick
      'drill-inverted-breaststroke-kick-001',      // Inverted Breaststroke Kick
      'drill-pull-breathe-kick-glide-001',        // Pull, Breathe, Kick, Glide
      'drill-corners-drill-001',                  // Corners Drill
      'drill-no-stars-001',                       // No Stars
      'drill-standing-breaststroke-pull-001',      // Standing Breaststroke Pulling Action
      'drill-duck-feet-001',                      // Duck Feet
      'drill-double-glide-breaststroke-001',       // Double Glide Breaststroke
    ],
    commonErrors: [
      'error-breaststroke-wide-knees',        // 膝盖过宽（>肩宽）
      'error-breaststroke-no-ankle-rotation', // 脚踝未外旋
      'error-breaststroke-overglide',          // 滑行时间过长
      'error-breaststroke-early-catch',        // 收腿时机过早
      'error-breaststroke-stars',             // 划蹬同时做（出现"星星"）
      'error-breaststroke-deep-pull',         // 划水过深
      'error-breaststroke-head-high',          // 头部位置过高
    ],
    energySystem: {
      aerobic: 70,
      threshold: 25,
      anaerobic: 5
    },
    raceStrategy: [
      '严格执行Pull-Breathe-Kick-Glide节奏',
      '外扫→内扫→前伸的椭圆形划水路径',
      '膝盖与肩同宽，脚踝外旋（外八字）',
      '内扫至角点时头部顺势出水吸气',
      '手臂完全伸展后再收腿踢水（划蹬分离）',
      '每次划臂结束后回流线型滑行',
      '转身使用开放转身，膝盖收紧贴近身体',
    ],
    source: 'Swim Smooth, The Swimming Drill Book, Complete Conditioning for Swimming',
  },

  // ============================================================
  // 4. Butterfly (蝶泳)
  // ============================================================
  {
    id: 'stroke-butterfly-all',
    name: 'Butterfly',
    nameZh: '蝶泳',
    strokeType: 'butterfly',
    distances: ['50', '100', '200'],
    keyTechniques: [
      {
        name: 'Body Wave',
        nameZh: '身体波浪',
        priority: 1,
        description: '蝶泳是短轴泳姿，身体围绕髋部横轴做波浪起伏。波浪从头→胸→髋→脚传导。头部下压是波浪起点，胸部下压后髋部自然被抬起准备海豚踢。'
      },
      {
        name: 'Dolphin Kick',
        nameZh: '海豚踢',
        priority: 1,
        description: '海豚踢是蝶泳的核心，双腿同时踢。踢腿从髋部开始，力量传导：髋→膝→踝（波浪式传递）。一次完整周期=2次划臂+2次海豚踢。'
      },
      {
        name: 'Grab and Go',
        nameZh: '无限流蝶泳',
        priority: 1,
        description: '蝶泳最核心的技术原则：不停顿。推水结束后手臂立即出水恢复，不在水中停留。保持连续划水，消除抱/推间隙。'
      },
      {
        name: 'Pinkies Up Recovery',
        nameZh: '小指向上恢复',
        priority: 2,
        description: '恢复时小指朝上（掌心朝外/朝下），肘部高于手，垂直向上抬臂。避免恢复臂拖肘，这是蝶泳最常见错误之一。'
      },
      {
        name: 'Breathing Timing',
        nameZh: '呼吸时机',
        priority: 2,
        description: '在第二次内扫末期（双手接近身体中线时）抬头吸气。Eyes on Water：眼睛看着水面呼吸，而非抬头。胸先下，头跟随。'
      }
    ],
    recommendedZones: ['Z3', 'Z4', 'Z5'],
    recommendedTemplateTypes: ['Sprint', 'Threshold', 'Technique'],
    recommendedDrills: [
      'drill-superman-dolphin-kick-001',     // Superman Dolphin Kick
      'drill-streamline-dolphin-kick-001',   // Streamline Dolphin Kick
      'drill-butterfly-body-wave-001',       // Butterfly Body Wave
      'drill-grab-and-go-001',               // Grab and Go
      'drill-pinkies-up-001',                // Pinkies Up
      'drill-bowing-001',                    // Bowing
      'drill-2-2-2-001',                    // 2 + 2 + 2
      'drill-one-arm-butterfly-001',         // One-Arm Butterfly
    ],
    commonErrors: [
      'error-butterfly-kick-from-feet',      // 踢腿从脚开始（未用核心力量）
      'error-butterfly-drag-elbow',          // 恢复臂拖肘（肘太低）
      'error-butterfly-pause',               // 节奏断裂（推水后手臂在水中有停顿）
      'error-butterfly-head-lift',           // 低头呼吸（压头太大）
      'error-butterfly-overlift',             // 呼吸时身体过度抬起
      'error-butterfly-early-head-dive',     // 头部下压时机过早
      'error-butterfly-hip-sink',            // 髋部下沉
    ],
    energySystem: {
      aerobic: 55,
      threshold: 30,
      anaerobic: 15
    },
    raceStrategy: [
      '掌握身体波浪传导：头→胸→髋→脚',
      '海豚踢从髋部开始，2次踢水/周期',
      'Grab and Go：推水后立即出水，不停顿',
      '恢复时小指向上，肘部垂直向上抬起',
      '在第二次内扫末期抬头吸气，Eyes on Water',
      '出发和转身后15米水下海豚踢是关键',
      '核心力量和髋部驱动是蝶泳的基础',
    ],
    source: 'Swim Smooth, The Swimming Drill Book, Complete Conditioning for Swimming, Swimming Anatomy',
  },
];


// ============================================================
// Stroke Modifiers - 泳姿修饰符
// ============================================================

/**
 * 泳姿专用修饰符
 * 定义每种泳姿的专项特点、训练调整建议
 */
export const strokeModifiers = {
  freestyle: {
    name: 'Freestyle Modifier',
    nameZh: '自由泳修饰符',
    strokeType: 'freestyle',
    characteristics: {
      description: '自由泳是最快的泳姿，适合各种距离。技术核心是高肘抓水、身体滚动和节奏协调。',
      keyFocus: ['高肘技术', '身体滚动', '呼吸节奏', '划水协调模式'],
      energyProfile: '有氧主导，短距离无氧占比较高',
      typicalZones: ['Z2', 'Z3', 'Z4'],
    },
    trainingEmphasis: {
      technique: ['高肘抓水', '身体滚动', '双侧呼吸'],
      endurance: ['长距离连续游', '划水效率'],
      speed: ['6拍打腿', '高划水频率', '出发转身技术'],
    },
    drillPriority: [
      'drill-zipper-001',           // 高肘技术
      'drill-6-1-6-001',            // 身体滚动
      'drill-sink-down-001',        // 呼吸技术
      'drill-popov-001',            // 移臂技术
    ],
    notes: [
      'Swim Types系统将自由泳游泳者分为6种类型，需针对性纠正',
      '双侧呼吸训练需要约2周适应期',
      '短距离（50/100）与长距离（800/1500）技术差异主要在划水频率和协调模式',
    ],
  },

  backstroke: {
    name: 'Backstroke Modifier',
    nameZh: '仰泳修饰符',
    strokeType: 'backstroke',
    characteristics: {
      description: '仰泳是唯一面部始终在水面上的泳姿。核心技术是香蕉位身体位置、高肘锁定恢复和鸽子趾踢水。',
      keyFocus: ['香蕉位', '头部独立', '高肘锁定恢复', '鸽子趾踢水'],
      energyProfile: '有氧与阈值均衡',
      typicalZones: ['Z2', 'Z3', 'Z4'],
    },
    trainingEmphasis: {
      technique: ['香蕉位身体位置', 'Locked Elbow恢复', '呼吸节奏'],
      endurance: ['身体位置维持', '踢水效率'],
      speed: ['踢水频率', '划水力量', '转身技术'],
    },
    drillPriority: [
      'drill-cup-on-forehead-001',       // 头部独立
      'drill-locked-elbow-recovery-001',  // 高肘恢复
      'drill-pigeon-toed-kick-001',      // 踢水技术
      'drill-streamline-back-flutter-kick-001', // 身体位置
    ],
    notes: [
      '头部独立是关键：头不随身体滚动，否则髋部下沉',
      '小指先入水（Pinkies Up），避免拇指先入水',
      '踢水时双脚微内扣（鸽子趾），增大踢水面积',
      '滚动角度约30-40度，过度滚动会导致失衡',
    ],
  },

  breaststroke: {
    name: 'Breaststroke Modifier',
    nameZh: '蛙泳修饰符',
    strokeType: 'breaststroke',
    characteristics: {
      description: '蛙泳是唯一身体完全在水面下休息的泳姿。核心技术是划-呼-踢-滑节奏、椭圆形划水路径和鞭状踢水。',
      keyFocus: ['节奏', '时机', '流线型', '踢水力量'],
      energyProfile: '有氧占比最高，无氧占比较低',
      typicalZones: ['Z2', 'Z3', 'Z4'],
    },
    trainingEmphasis: {
      technique: ['Pull-Breathe-Kick-Glide节奏', '划蹬分离', '流线型'],
      endurance: ['节奏稳定性', '滑行效率'],
      speed: ['快速内扫', '爆发踢水', '角点加速'],
    },
    drillPriority: [
      'drill-pull-breathe-kick-glide-001',  // 节奏
      'drill-no-stars-001',                 // 划蹬分离
      'drill-corners-drill-001',            // 呼吸时机
      'drill-streamline-breaststroke-kick-001', // 踢水技术
    ],
    notes: [
      '节奏是蛙泳的灵魂：严格按顺序划→呼→踢→滑',
      '膝盖与肩同宽，脚踝必须外旋（外八字）',
      '划水过深是常见错误，保持手在水下10-30厘米',
      'No Stars：划臂时腿不动，踢腿时臂不动',
      '每次划臂结束后必须回流线型滑行',
    ],
  },

  butterfly: {
    name: 'Butterfly Modifier',
    nameZh: '蝶泳修饰符',
    strokeType: 'butterfly',
    characteristics: {
      description: '蝶泳是最具挑战性的泳姿，需要强大的核心力量和全身协调。核心技术是身体波浪、海豚踢和不停顿划水。',
      keyFocus: ['身体波浪', '海豚踢', '核心力量', '不停顿节奏'],
      energyProfile: '无氧占比较高，对核心力量要求最高',
      typicalZones: ['Z3', 'Z4', 'Z5'],
    },
    trainingEmphasis: {
      technique: ['身体波浪传导', '海豚踢', 'Grab and Go'],
      endurance: ['核心力量训练', '短距离重复', '技术耐久性'],
      speed: ['爆发力', '快速恢复', '强力踢水'],
    },
    drillPriority: [
      'drill-superman-dolphin-kick-001',  // 波浪传导
      'drill-butterfly-body-wave-001',     // 完整波浪
      'drill-grab-and-go-001',            // 不停顿
      'drill-pinkies-up-001',             // 恢复技术
    ],
    notes: [
      '核心力量是蝶泳的基础：每周2-3次核心训练',
      'Grab and Go：推水后立即出水，绝不能停顿',
      '海豚踢从髋部开始，不是从脚开始',
      '恢复时小指向上（Pinkies Up），避免拖肘',
      '呼吸时Eyes on Water，不要抬头过高',
      '蝶泳应以短距离高质量训练为主，避免过多长距离游泳固化错误',
    ],
  },
};


// ============================================================
// Helper Functions - 辅助函数
// ============================================================

/**
 * 根据泳姿类型获取StrokeEntry
 */
export function getStrokeByType(strokeType: StrokeType): StrokeEntry | undefined {
  return strokeRegistry.find(entry => entry.strokeType === strokeType);
}

/**
 * 根据ID获取StrokeEntry
 */
export function getStrokeById(id: string): StrokeEntry | undefined {
  return strokeRegistry.find(entry => entry.id === id);
}

/**
 * 根据距离过滤适合的泳姿配置
 */
export function getStrokeForDistance(strokeType: StrokeType, distance: string): StrokeEntry | undefined {
  const stroke = getStrokeByType(strokeType);
  if (stroke && stroke.distances.includes(distance)) {
    return stroke;
  }
  return undefined;
}

/**
 * 获取泳姿的推荐训练Zone
 */
export function getRecommendedZones(strokeType: StrokeType): Zone[] {
  const stroke = getStrokeByType(strokeType);
  return stroke ? stroke.recommendedZones : [];
}

/**
 * 获取泳姿的推荐训练模板类型
 */
export function getRecommendedTemplateTypes(strokeType: StrokeType): TemplateType[] {
  const stroke = getStrokeByType(strokeType);
  return stroke ? stroke.recommendedTemplateTypes : [];
}
