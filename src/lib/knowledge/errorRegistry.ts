/**
 * Pocket Swimming Coach - Error Registry
 * 游泳错误纠正库 - 结构化数据
 * 
 * 来源：综合 Swim Smooth、The Swim Coaching Bible、The Swimming Drill Book 2E、
 *       Swimming Knowledge Summary、Swimming Tech Supplementary
 * 
 * 按泳姿分组，每组包含该泳姿的常见错误
 */

import { ErrorEntry } from './REGISTRY_SCHEMA';

// ============================================================
// 自由泳错误库 (Freestyle Errors)
// ============================================================

export const errorRegistry: ErrorEntry[] = [

  // ─────────────────────────────────────────────────────────
  // 自由泳 · 呼吸错误 (Breathing)
  // ─────────────────────────────────────────────────────────

  {
    id: 'error-freestyle-breathing-001',
    name: 'Holding Breath',
    nameZh: '水中憋气',
    stroke: 'freestyle',
    category: 'breathing',
    symptoms: [
      'CO₂积累导致紧张感和窒息恐慌',
      '呼吸急促、节奏混乱',
      '身体紧绷下沉',
    ],
    rootCauses: [
      '不习惯在水中用嘴/鼻持续呼气',
      '呼气意识缺失，水下时屏住气息',
      '源于对水的恐惧本能反应',
    ],
    correctionDrills: [
      'Sink Down Exercise',
      'Breathe-Bubble-Bubble-Breathe',
      'Constant Breathing Drill',
    ],
    prevention: [
      '每次训练前做深呼吸放松练习',
      '强调"水中吐气，水上吸气"的基本原则，永不憋气游泳',
    ],
    source: 'Swim Smooth - Chapter 7（呼吸技术）',
    tags: ['憋气', '呼吸', '初学者', '恐慌', 'CO₂积累'],
  },

  {
    id: 'error-freestyle-breathing-002',
    name: 'Lifting Head to Breathe',
    nameZh: '抬头呼吸',
    stroke: 'freestyle',
    category: 'breathing',
    symptoms: [
      '腿部显著下沉，形成"上坡游泳"姿态',
      '身体倾斜，髋部失去水平位置',
      '划水效率大幅下降，阻力急剧增加',
    ],
    rootCauses: [
      '感知到缺氧恐慌，主动抬头找空气',
      '未能利用髋部旋转带动头部侧转',
      '不理解"弓形波凹陷"的呼吸原理',
    ],
    correctionDrills: [
      'Popeye Breathing',
      'Bow-Wave Breathing',
      'Freestyle Side Glide with Breathing',
      'Split Screen Visualisation',
    ],
    prevention: [
      '永远不要主动"抬"头呼吸，而是随髋部旋转"转"头',
      '呼吸时太阳穴/颧骨贴近水面，而非下巴先出水',
    ],
    source: 'Swim Smooth - Chapter 7；Swimming Tech Supplementary - Section 5.1',
    tags: ['抬头呼吸', '腿部下沉', '呼吸时机', '髋驱动'],
  },

  {
    id: 'error-freestyle-breathing-003',
    name: 'Late Breathing Timing',
    nameZh: '呼吸时机过晚',
    stroke: 'freestyle',
    category: 'breathing',
    symptoms: [
      '手臂已进入恢复阶段才开始转头呼吸',
      '呼吸急促、吸气不足',
      '整体节奏被打断',
    ],
    rootCauses: [
      '身体旋转不足，头部无法在正常时机转出水面',
      '呼吸时机意识缺失，习惯性延迟',
      '视觉化指令模糊',
    ],
    correctionDrills: [
      'Breathe from Hips',
      'Reach to Inhale',
      'Constant Breathing',
    ],
    prevention: [
      '将呼吸时机与划水阶段绑定：手臂入水=开始转头，手臂入水完成=转头到位',
      '练习时放慢速度，专门感受呼吸时机',
    ],
    source: 'Swim Smooth - Chapter 7（呼吸时机）',
    tags: ['呼吸时机', '转头过晚', '节奏混乱', '旋转不足'],
  },

  {
    id: 'error-freestyle-breathing-004',
    name: 'Bilateral Breathing Deficiency',
    nameZh: '单侧呼吸',
    stroke: 'freestyle',
    category: 'breathing',
    symptoms: [
      '仅向习惯侧呼吸，划水不对称',
      '开放水域中游偏航线',
      '身体向呼吸侧倾斜',
    ],
    rootCauses: [
      '只练习习惯侧，忽视非习惯侧',
      '长期单侧呼吸导致肌肉发展不均衡',
      '划水节奏不对称的根源之一',
    ],
    correctionDrills: [
      'Bilateral Breathing Drill',
      'Breathe-Bubble-Bubble-Breathe',
      'Split Screen Visualisation',
    ],
    prevention: [
      '初学阶段就培养双侧呼吸能力',
      '开放水域游泳者必须具备双侧呼吸技能，以防游偏',
    ],
    source: 'Swim Smooth - Chapter 7（双侧呼吸）',
    tags: ['单侧呼吸', '划水不对称', '开放水域', '双侧呼吸'],
  },

  // ─────────────────────────────────────────────────────────
  // 自由泳 · 身体位置错误 (Body Position)
  // ─────────────────────────────────────────────────────────

  {
    id: 'error-freestyle-bodyPosition-001',
    name: 'Legs Sinking / Swimming Uphill',
    nameZh: '腿部下沉',
    stroke: 'freestyle',
    category: 'bodyPosition',
    symptoms: [
      '身体前端高、后端低，呈"上坡"姿态',
      '脚后跟无法触碰水面',
      '明显阻力增加，速度下降',
    ],
    rootCauses: [
      '头部位置过高导致髋部代偿下沉',
      '水中憋气导致胸腔浮力过大前端抬起后端下沉',
      '呼吸时抬头过高导致髋部被迫旋转',
      '核心稳定性差无法保持骨盆水平',
      '打腿不足缺乏提升腿部的推进力',
      '抓水时向下压水抬高前端下沉后端',
      '髋部灵活性差限制旋转范围（久坐/骑行人群常见）',
      '脚踝灵活性差打腿效率低（铁人三项运动员常见）',
    ],
    correctionDrills: [
      'Torpedo Kick',
      'Streamline Freestyle Kick No Breath',
      'Tip Forward',
      'Lateral Balance',
      'Kick On Side',
      'Breathe from Hips',
    ],
    prevention: [
      '高身体位置是游泳效率的基础，必须首先解决',
      '建议初学者使用踢板专注打腿，感受腿部高位',
      '注意：并非所有人都适合低头，过度低头同样有害',
    ],
    source: 'Swim Smooth - Chapter 8（身体位置）',
    tags: ['腿部下沉', '上坡游泳', '身体位置', '阻力增加'],
  },

  {
    id: 'error-freestyle-bodyPosition-002',
    name: 'No Body Rotation / Flat Swimming',
    nameZh: '身体不滚动 / 平板游泳',
    stroke: 'freestyle',
    category: 'bodyPosition',
    symptoms: [
      '身体完全平躺或固定侧向游进',
      '划水效率低，肩部过度负担',
      '腿部容易下沉',
    ],
    rootCauses: [
      '核心力量不足，无法主动旋转',
      '髋部灵活性限制',
      '没有理解身体滚动是划水动力的来源',
    ],
    correctionDrills: [
      '6-1-6 Drill',
      '6-3-6 Drill',
      'Lateral Balance',
      'Power Zone Drill',
      'Lean In Out',
    ],
    prevention: [
      '身体滚动是游泳动力的"时钟"（The Clock），所有动作以此为时间参考',
      '自由泳侧身滚动约60°是最优姿态',
    ],
    source: 'Swim Smooth - Chapter 2；Swimming Knowledge Summary - Section 2.1',
    tags: ['身体不滚动', '平板游泳', '核心力量', '旋转不足'],
  },

  {
    id: 'error-freestyle-bodyPosition-003',
    name: 'Incorrect Head Position',
    nameZh: '头部位置不当',
    stroke: 'freestyle',
    category: 'bodyPosition',
    symptoms: [
      '头过高：髋部下沉，阻力增加',
      '头过低：破坏流线型，腿部位置反而变差',
    ],
    rootCauses: [
      '缺乏头部位置个性化调整意识',
      '盲目采用"低头"或"抬头"策略',
    ],
    correctionDrills: [
      'Cup on Forehead',
      'Gliding in Streamline',
    ],
    prevention: [
      '眼睛向下看，后脑贴近水面',
      '头部与身体同时旋转，不单独移动',
      '训练时录视频检查头部位置',
    ],
    source: 'Swim Smooth - Chapter 8；Swimming Tech Supplementary - Section 1.4',
    tags: ['头部位置', '抬头过高', '低头过低', '个性化调整'],
  },

  // ─────────────────────────────────────────────────────────
  // 自由泳 · 划水错误 (Pull)
  // ─────────────────────────────────────────────────────────

  {
    id: 'error-freestyle-pull-001',
    name: 'Pushing Down Instead of Back',
    nameZh: '向下推水',
    stroke: 'freestyle',
    category: 'pull',
    symptoms: [
      '身体前端抬升，腿部下沉',
      '有力但无推进——像在原地"拉"自己',
      '消耗大量能量但前进速度慢',
    ],
    rootCauses: [
      '误解划水动作的本意，误以为向下压产生推进力',
      '抓水位置过浅或过深',
      '不理解"S"形三维划水路径',
    ],
    correctionDrills: [
      '3D Freestyle',
      'Over the Barrel',
      'Sculling Drills',
      'PT Paddles Drill',
    ],
    prevention: [
      '牢记：游泳的唯一推进方向是"向后"，不是向下',
      '想象肘部是支点，手掌向后推整个身体前进',
    ],
    source: 'Swim Smooth - Chapter 13（划水技术）',
    tags: ['向下推水', '推进力损失', '划水路径', 'S形划水'],
  },

  {
    id: 'error-freestyle-pull-002',
    name: 'Arm Crossing Over Centerline',
    nameZh: '手臂交叉越过中线',
    stroke: 'freestyle',
    category: 'pull',
    symptoms: [
      '蛇形游动轨迹',
      '剪刀腿（Scissor Kick）',
      '身体左右摆动大',
    ],
    rootCauses: [
      '姿势差（Swim proud意识缺失）',
      '肩胛骨未内收',
      '入水点过中线',
      '可能是身体不滚动的表现',
    ],
    correctionDrills: [
      'Swim Proud',
      'Middle Finger Visualisation',
      'Fingertip Drag',
      'Zipper Drill',
      'Kick On Side',
    ],
    prevention: [
      '入水点在另一只手臂的腕关节与肘关节之间（不超中线）',
      '想象肩膀之间有一根绳子拉紧',
    ],
    source: 'Swim Smooth - Chapter 13；Swimming Drill Book - Section 5',
    tags: ['手臂交叉', '中线意识', '蛇形游进', '剪刀腿'],
  },

  {
    id: 'error-freestyle-pull-003',
    name: 'Excessive Wide Pull',
    nameZh: '划水外扫过多',
    stroke: 'freestyle',
    category: 'pull',
    symptoms: [
      '力量流失，浪费时间',
      '手掌感觉抓不住水',
      '推进效率低',
    ],
    rootCauses: [
      '不理解划水路径应为垂直"S"形',
      '入水后手臂过度展开',
      '抓水时机延误',
    ],
    correctionDrills: [
      'Zipper Drill',
      'Fingertip Drag',
      'Over the Barrel',
      '3D Freestyle',
    ],
    prevention: [
      '划水路径应垂直而非水平外展',
      '专注于手掌从入水到髋部的全程贴近身体',
    ],
    source: 'Swim Smooth - Chapter 13；Swimming Drill Book - Section E',
    tags: ['划水外扫', '力量流失', '垂直路径', '推进效率'],
  },

  {
    id: 'error-freestyle-pull-004',
    name: 'Hand Lifting After Push',
    nameZh: '推水后手掌拖出水面',
    stroke: 'freestyle',
    category: 'pull',
    symptoms: [
      '推水结束后手掌向上抬升',
      '出水动作不干脆',
      '破坏恢复臂节奏',
    ],
    rootCauses: [
      '推水方向不够向后',
      '出水时缺乏肘部引导',
      '肩部内旋时机错误',
    ],
    correctionDrills: [
      'Accelerate Arm Stroke',
      'Pocket Drill',
      'Trailing Hand',
    ],
    prevention: [
      '推水完成点在髋部，手掌应沿髋部边缘滑出而非上抬',
    ],
    source: 'Swimming Tech Supplementary - Section 2.1',
    tags: ['推水结束', '手掌抬起', '出水动作', '肘部引导'],
  },

  {
    id: 'error-freestyle-pull-005',
    name: 'Too Many Strokes Per Length',
    nameZh: '划次过多',
    stroke: 'freestyle',
    category: 'pull',
    symptoms: [
      '短距离需要划水次数过多',
      '划水频率低但划次高',
      '效率低下',
    ],
    rootCauses: [
      '身体未充分滚动，划水长度短',
      '入水后手臂未充分伸展',
      '手入水过于靠近身体',
    ],
    correctionDrills: [
      'Extension Drill',
      'Long Dog',
      'DPS Training',
    ],
    prevention: [
      '优秀游泳者每25米约15-20划（自由泳）',
      '增加身体滚动是减少划次的最有效方法',
    ],
    source: 'Swimming Knowledge Summary - Section 2.1',
    tags: ['划次过多', '效率低下', '身体滚动', '划水长度'],
  },

  // ─────────────────────────────────────────────────────────
  // 自由泳 · 打腿错误 (Kick)
  // ─────────────────────────────────────────────────────────

  {
    id: 'error-freestyle-kick-001',
    name: 'Kicking from Knees',
    nameZh: '从膝盖打腿',
    stroke: 'freestyle',
    category: 'kick',
    symptoms: [
      '膝盖大幅弯曲，产生巨大阻力',
      '消耗大量能量但推进效率极低',
      '腿部在水面上下乱拍',
    ],
    rootCauses: [
      '跑步和骑行的习惯迁移',
      '不理解打腿的髋驱动原理',
      '踝关节灵活性差导致代偿弯曲膝盖',
    ],
    correctionDrills: [
      'Ballet Leg Kick Drill',
      'Fish Don\'t Have Knees',
      'Slow Flutter on Front',
      'Streamline Front Flutter Kick',
      'Sea Anchors Drill',
    ],
    prevention: [
      '打腿发力来自髋部，膝盖只是传递而非驱动',
      '脚踝是打腿的"螺旋桨"，灵活性是关键',
    ],
    source: 'Swim Smooth - Chapter 9（打腿技术）',
    tags: ['从膝盖打腿', '髋驱动', '脚踝灵活性', '推进效率'],
  },

  {
    id: 'error-freestyle-kick-002',
    name: 'Scissor Kick',
    nameZh: '剪刀腿',
    stroke: 'freestyle',
    category: 'kick',
    symptoms: [
      '腿部像降落伞一样左右张开',
      '游进时身体左右扭动',
      '打腿效率为零',
    ],
    rootCauses: [
      '根本原因是手臂交叉越过中线（而非打腿本身的问题）',
      '手臂交叉导致身体旋转失衡',
      '身体通过剪刀腿试图平衡，导致横向摆动',
    ],
    correctionDrills: [
      'Middle Finger Visualisation',
      'Swim Proud',
      'Kick On Side',
    ],
    prevention: [
      '每次游进时注意手臂入水点位置',
      '建立"中线意识"，肩膀和髋部对齐',
    ],
    source: 'Swim Smooth - Chapter 9（打腿技术）',
    tags: ['剪刀腿', '手臂交叉', '身体扭动', '中线意识'],
  },

  {
    id: 'error-freestyle-kick-003',
    name: 'Feet Turned Out',
    nameZh: '脚尖外翻',
    stroke: 'freestyle',
    category: 'kick',
    symptoms: [
      '打腿时脚踝角度不正确',
      '推进力损失',
      '脚蹼水面打水',
    ],
    rootCauses: [
      '踝关节灵活性差（背屈受限）',
      '髋关节内旋角度不足',
      '脚踝未作为推进面正确使用',
    ],
    correctionDrills: [
      'Pigeon Toed Kick',
      'Duck Feet',
      'Sitting Ankle Stretch',
    ],
    prevention: [
      '脚踝僵硬是铁人三项运动员和久坐人群的常见问题',
      '每周多次踝关节灵活性练习，逐步改善',
    ],
    source: 'Swim Smooth - Chapter 9；Swimming Drill Book - Section 5',
    tags: ['脚尖外翻', '踝关节灵活性', '脚蹼', '蹬水面积'],
  },

  {
    id: 'error-freestyle-kick-004',
    name: 'Two-Beat Kick Misuse',
    nameZh: '两拍打腿配合不当',
    stroke: 'freestyle',
    category: 'kick',
    symptoms: [
      '划水率慢但只用两拍打腿',
      '身体位置不稳，腿部时而下沉',
      '节奏不连贯',
    ],
    rootCauses: [
      '两拍打腿需要快速划水率才能维持身体位置',
      '慢划水率配两拍打腿导致身体不稳定',
      '未理解两拍打腿与划水配合的时机',
    ],
    correctionDrills: [
      '2-Beat Kick with Fast Stroke Rate',
      '6-Beat Kick Drill',
    ],
    prevention: [
      '建议大多数游泳者使用六拍打腿',
      '两拍打腿适合快速划水的短距离游泳者',
    ],
    source: 'Swim Smooth - Chapter 9；Swimming Knowledge Summary - Section 2.2',
    tags: ['两拍打腿', '六拍打腿', '划水配合', '身体不稳'],
  },

  // ─────────────────────────────────────────────────────────
  // 自由泳 · 移臂与恢复错误 (Recovery)
  // ─────────────────────────────────────────────────────────

  {
    id: 'error-freestyle-recovery-001',
    name: 'Low Elbow Recovery / Hand Leading Elbow',
    nameZh: '低肘移臂 / 手领先肘部',
    stroke: 'freestyle',
    category: 'recovery',
    symptoms: [
      '移臂困难，肩部紧张',
      '恢复臂划水效率低',
      '肩关节压力过大',
    ],
    rootCauses: [
      '肩部灵活性差（尤其久坐办公室人群）',
      '身体旋转不足',
      '肩胛骨未内收',
    ],
    correctionDrills: [
      'Popov Drill',
      'Broken Arrow Drill',
      'Loose Hand Swing',
      'Shark Fin Drill',
    ],
    prevention: [
      '高肘恢复是预防肩部受伤的关键',
      '开放水域可尝试直臂移臂（过波浪更容易）',
    ],
    source: 'Swim Smooth - Appendix A（练习方法库）',
    tags: ['低肘移臂', '肩部紧张', '肩关节', '高肘恢复'],
  },

  {
    id: 'error-freestyle-recovery-002',
    name: 'Recovery Arm Too Far From Body',
    nameZh: '恢复臂靠近中线不足',
    stroke: 'freestyle',
    category: 'recovery',
    symptoms: [
      '手臂外摆增加身体横向摆动',
      '下身因反作用力左右摆动',
      '阻力增大',
    ],
    rootCauses: [
      '不理解恢复臂应贴近身体中线',
      '肩部外展灵活性不足',
      '习惯性宽幅移臂',
    ],
    correctionDrills: [
      'Zipper Drill',
      'Fingertip Drag',
      'Popov Drill',
    ],
    prevention: [
      '恢复臂应像"拉链"一样沿身体中线移动',
      '手掌松弛，肘部引领',
    ],
    source: 'Swimming Tech Supplementary - Section 2.1',
    tags: ['恢复臂过宽', '横向摆动', '中线意识', '拉链路径'],
  },

  // ─────────────────────────────────────────────────────────
  // 自由泳 · 入水错误 (Entry)
  // ─────────────────────────────────────────────────────────

  {
    id: 'error-freestyle-entry-001',
    name: 'Thumb-First Entry',
    nameZh: '拇指先入水',
    stroke: 'freestyle',
    category: 'entry',
    symptoms: [
      '手掌入水角度过大（向下拍水）',
      '肩部内旋，易受伤',
      '入水冲击大，水花大',
    ],
    rootCauses: [
      '旧式游泳教学的错误习惯',
      '入水时手腕未锁住',
      '手掌朝向不正确',
    ],
    correctionDrills: [
      'Hide Palm From Thumb',
      'Briefcase Visualisation',
      'Middle Finger Visualisation',
      'Shoulder Tap Drill',
    ],
    prevention: [
      '正确入水顺序：小指→手掌→拇指（或中指→无名指→小指→拇指）',
      '入水应"切"入水面，而非"拍"入',
    ],
    source: 'Swim Smooth - Appendix A；Swimming Tech Supplementary - Section 5.1',
    tags: ['拇指先入水', '入水角度', '肩部内旋', '小指入水'],
  },

  {
    id: 'error-freestyle-entry-002',
    name: 'Incorrect Entry Point',
    nameZh: '入水点不当',
    stroke: 'freestyle',
    category: 'entry',
    symptoms: [
      '入水点过于靠前（过伸）或过于靠后',
      '肘部先入水',
      '破坏身体流线型',
    ],
    rootCauses: [
      '入水延伸意识缺失',
      '过度前伸手臂',
      '对正确入水点位置不了解',
    ],
    correctionDrills: [
      'Shoulder Tap Drill',
      'Middle Finger Visualisation',
    ],
    prevention: [
      '入水不是"够向前"，而是"伸向前"',
      '过头流线型是入水后的正确姿态',
    ],
    source: 'Swim Smooth - Appendix A（练习方法库）',
    tags: ['入水点', '过伸', '流线型', '前伸手臂'],
  },

  {
    id: 'error-freestyle-entry-003',
    name: 'Excessive Head Extension',
    nameZh: '头部过度前伸',
    stroke: 'freestyle',
    category: 'entry',
    symptoms: [
      '颈部过度伸展',
      '破坏身体流线型',
      '头部难以与身体同时旋转',
    ],
    rootCauses: [
      '入水后手臂过度前伸',
      '抓水时机因头部位置而延迟',
      '颈部和肩部肌肉紧张',
    ],
    correctionDrills: [
      'Gliding in Streamline',
      'Middle Finger Visualisation',
    ],
    prevention: [
      '身体滚动帮助手臂轻松入水，头部自然嵌入上臂旁的凹槽中',
      '录视频检查头部位置',
    ],
    source: 'Swimming Tech Supplementary - Section 2.1；Swimming Drill Book - Section 5',
    tags: ['头部前伸', '颈部伸展', '流线型', '抓水时机'],
  },

  // ─────────────────────────────────────────────────────────
  // 仰泳错误库 (Backstroke Errors)
  // ─────────────────────────────────────────────────────────

  // ─────────────────────────────────────────────────────────
  // 仰泳 · 呼吸与头部位置错误 (Body Position)
  // ─────────────────────────────────────────────────────────

  {
    id: 'error-backstroke-bodyPosition-001',
    name: 'Head Rolling with Body',
    nameZh: '头部随身体转动',
    stroke: 'backstroke',
    category: 'bodyPosition',
    symptoms: [
      '髋部在水中下沉',
      '呼吸节奏被打乱',
      '破坏仰泳稳定身体线',
    ],
    rootCauses: [
      '缺乏头部独立于身体的意识',
      '不理解"头靠水枕头"的原理',
      '颈部肌肉习惯性跟随滚动',
    ],
    correctionDrills: [
      'Cup on Forehead',
      'Waterline Drill',
      'Head on a Pillow',
      'Spine Line',
    ],
    prevention: [
      '仰泳时眼睛向上看天花板，头部完全独立于身体旋转',
      '保持髋部高位是关键',
    ],
    source: 'Swimming Knowledge Summary - Section 1.1；Swimming Drill Book - Section D',
    tags: ['头部随转', '髋部下沉', '仰泳', '头部独立性'],
  },

  // ─────────────────────────────────────────────────────────
  // 仰泳 · 打腿错误 (Kick)
  // ─────────────────────────────────────────────────────────

  {
    id: 'error-backstroke-kick-001',
    name: 'Excessive Knee Lift in Kick',
    nameZh: '打腿时膝盖抬得太高',
    stroke: 'backstroke',
    category: 'kick',
    symptoms: [
      '踢水产生过多水花',
      '腿部推进力不足',
      '身体位置不稳',
    ],
    rootCauses: [
      '从膝盖而非髋部驱动打腿',
      '踝关节灵活性差',
      '小腿和脚未作为整体推进面使用',
    ],
    correctionDrills: [
      'Pigeon Toed Kick',
      'Streamline Back Flutter Kick',
      'Vertical Flutter Kick',
      'Boiling Water',
    ],
    prevention: [
      '仰泳踢水同自由泳：脚踝是螺旋桨，不是膝盖',
      '踢水全程髋部驱动，踝关节保持放松',
    ],
    source: 'Swimming Knowledge Summary - Section 5.2；Swimming Drill Book - Section 5',
    tags: ['膝盖抬高', '水花过多', '髋驱动', '仰泳打腿'],
  },

  {
    id: 'error-backstroke-kick-002',
    name: 'Stiff Ankles in Backstroke Kick',
    nameZh: '踢水时脚踝僵硬',
    stroke: 'backstroke',
    category: 'kick',
    symptoms: [
      '踢水无推进力',
      '踝关节活动度不足',
      '踢水动作像踩水而非推进',
    ],
    rootCauses: [
      '踝关节跖屈灵活性差',
      '踝关节背屈受限',
      '未进行踝关节专项灵活性训练',
    ],
    correctionDrills: [
      'Vertical Flutter Kick',
      'Sitting Ankle Stretch',
      'Duck Feet',
      'Streamline Back Flutter Kick',
    ],
    prevention: [
      '踝关节灵活性是仰泳和自由泳打腿的基础',
      '建议每天做踝关节伸展练习',
    ],
    source: 'Swimming Drill Book - Section 5；Swimming Tech Supplementary - Section 5.3',
    tags: ['脚踝僵硬', '踝关节', '仰泳打腿', '灵活性'],
  },

  // ─────────────────────────────────────────────────────────
  // 仰泳 · 划水与入水错误 (Pull / Entry)
  // ─────────────────────────────────────────────────────────

  {
    id: 'error-backstroke-entry-001',
    name: 'Wrist Drop on Entry',
    nameZh: '手入水不正 / 腕部下塌',
    stroke: 'backstroke',
    category: 'entry',
    symptoms: [
      '手掌入水角度不正确',
      '失去初始抓水位置',
      '肩关节外旋过度',
    ],
    rootCauses: [
      '入水时手腕未锁住',
      '手掌朝向错误（小拇指应先入水）',
      '肩部外旋不足',
    ],
    correctionDrills: [
      'Puppy Ears',
      'Backstroke Recovery on Deck',
      'Backstroke L Drill',
    ],
    prevention: [
      '仰泳入水应小指先入水，掌心朝外',
      '入水点在肩宽之外，避免绕中线旋转',
    ],
    source: 'Swimming Knowledge Summary - Section 5.2；Swimming Drill Book - Section D',
    tags: ['手腕下塌', '入水角度', '小指入水', '仰泳'],
  },

  {
    id: 'error-backstroke-pull-001',
    name: 'Narrow Entry / Cross-Body Entry',
    nameZh: '手入水过窄或中线交叉',
    stroke: 'backstroke',
    category: 'pull',
    symptoms: [
      '绕中线旋转',
      '身体摇摆',
      '抓水效率降低',
    ],
    rootCauses: [
      '入水点过于靠近身体中线',
      '肩部外展不足',
      '髋部过度旋转',
    ],
    correctionDrills: [
      'Backstroke Recovery on Deck',
      'Backstroke L Drill',
      'Controlled Two-Arm Backstroke',
    ],
    prevention: [
      '仰泳入水应在外侧（肩宽范围外）',
      '避免过度旋转（>40°），保持30°左右滚动',
    ],
    source: 'Swimming Tech Supplementary - Section 5.3',
    tags: ['入水过窄', '中线交叉', '身体摇摆', '仰泳划水'],
  },

  {
    id: 'error-backstroke-pull-002',
    name: 'Too Deep Pull',
    nameZh: '划水过深',
    stroke: 'backstroke',
    category: 'pull',
    symptoms: [
      '推水效率低',
      '肩关节损伤风险增加',
      '划水节奏断裂',
    ],
    rootCauses: [
      '不理解仰泳应在浅层划水',
      '抓水位置习惯性过深',
      '肩关节活动度限制',
    ],
    correctionDrills: [
      'Up and Over',
      'Streamline Backstroke Single-Arm',
      'Continuous One-Arm Backstroke',
    ],
    prevention: [
      '仰泳划水深度：手在水下10-30厘米（4-12英寸）',
      '保持肘部高于手，形成浅层"S"形路径',
    ],
    source: 'Swimming Tech Supplementary - Section 5.3',
    tags: ['划水过深', '推水效率', '肩关节', '浅层划水'],
  },

  {
    id: 'error-backstroke-rotation-001',
    name: 'Opposite Side Uncoordinated',
    nameZh: '换边不协调',
    stroke: 'backstroke',
    category: 'rotation',
    symptoms: [
      '左右划水不对称',
      '身体平衡差',
      '节奏不连贯',
    ],
    rootCauses: [
      '无对侧翻滚感',
      '核心联动意识弱',
      '无划水-身体滚动配合',
    ],
    correctionDrills: [
      'Locked Elbow Recovery',
      'Backstroke L Drill',
      'Continuous Two-Arm Backstroke',
      'Core Linkage Training',
    ],
    prevention: [
      '仰泳的核心是身体滚动与划水的精确协调',
      '用核心力量驱动手臂，而非仅用手臂划水',
    ],
    source: 'Swimming Knowledge Summary - Section 5.2；Swimming Drill Book - Section D',
    tags: ['换边不协调', '不对称', '核心联动', '仰泳节奏'],
  },

  // ─────────────────────────────────────────────────────────
  // 蛙泳错误库 (Breaststroke Errors)
  // ─────────────────────────────────────────────────────────

  // ─────────────────────────────────────────────────────────
  // 蛙泳 · 蹬腿与脚踝错误 (Kick)
  // ─────────────────────────────────────────────────────────

  {
    id: 'error-breaststroke-kick-001',
    name: 'Knees Too Wide',
    nameZh: '膝盖过宽',
    stroke: 'breaststroke',
    category: 'kick',
    symptoms: [
      '蹬腿推进力损失',
      '膝盖外翻角度过大',
      '腿部力量无法有效传递',
    ],
    rootCauses: [
      '膝盖分开角度超过肩宽',
      '髋关节外展灵活性不足',
      '蹬腿时脚踝未正确内旋',
    ],
    correctionDrills: [
      'Inverted Breaststroke Kick',
      'Two Balance Points',
      'Duck Feet',
    ],
    prevention: [
      '蹬腿时膝盖应与髋关节同宽或略窄',
      '脚踝旋转到脚尖朝外但不超过90°',
    ],
    source: 'Swimming Drill Book - Section 5；Swimming Knowledge Summary - Section 5.3',
    tags: ['膝盖过宽', '蹬腿推进', '髋关节', '脚踝内旋'],
  },

  {
    id: 'error-breaststroke-kick-002',
    name: 'Ankles Not Rotated Out',
    nameZh: '蹬腿时脚踝未展开',
    stroke: 'breaststroke',
    category: 'kick',
    symptoms: [
      '脚踝僵硬，蹬腿面积小',
      '推进力不足',
      '像用脚尖而非脚掌蹬水',
    ],
    rootCauses: [
      '踝关节灵活性差（尤其未拉伸的游泳者）',
      '不知道脚踝应旋外形成最大蹬水面',
      '髋关节外旋不足',
    ],
    correctionDrills: [
      'Duck Feet',
      'Inverted Breaststroke Kick',
      'Streamline Breaststroke Kick',
      'Foot Awareness',
    ],
    prevention: [
      '蛙泳蹬腿面积 = 最大推进面积，脚踝旋外是关键',
      '建议每次训练前做踝关节灵活性练习',
    ],
    source: 'Swimming Knowledge Summary - Section 5.3；Swimming Drill Book - Section 5',
    tags: ['脚踝未旋外', '蹬腿面积', '推进力', '踝关节灵活性'],
  },

  {
    id: 'error-breaststroke-kick-003',
    name: 'Weak Breaststroke Kick',
    nameZh: '蹬腿无力',
    stroke: 'breaststroke',
    category: 'kick',
    symptoms: [
      '蹬腿速度慢、力量弱',
      '滑行距离短',
      '整体速度依赖划臂',
    ],
    rootCauses: [
      '膝盖弯曲角度不够（过于伸直）',
      '髋关节发力不足',
      '脚踝灵活性差导致力量传递中断',
    ],
    correctionDrills: [
      'Duck Feet',
      'Two Kicks to One Pull',
      'Vertical Breaststroke Pull',
      'Fast Heels',
    ],
    prevention: [
      '蛙泳蹬腿的力量来源是髋部内收和脚踝旋外的组合',
      '蹬腿速度要快而有力',
    ],
    source: 'Swimming Knowledge Summary - Section 5.3',
    tags: ['蹬腿无力', '力量不足', '髋部发力', '滑行距离'],
  },

  // ─────────────────────────────────────────────────────────
  // 蛙泳 · 划臂与呼吸错误 (Pull / Breathing)
  // ─────────────────────────────────────────────────────────

  {
    id: 'error-breaststroke-breathing-001',
    name: 'Head Lifting to Breathe',
    nameZh: '抬头呼吸',
    stroke: 'breaststroke',
    category: 'breathing',
    symptoms: [
      '髋部和腿部下沉',
      '身体位置丢失',
      '划臂-呼吸-蹬腿节奏混乱',
    ],
    rootCauses: [
      '不理解"眼睛向下看"原则',
      '呼吸时主动抬头',
      '身体位置意识薄弱',
    ],
    correctionDrills: [
      'Heads Up Breaststroke',
      'Corners Drill',
      'Long Float',
    ],
    prevention: [
      '蛙泳呼吸不是抬头，而是"身体抬"——通过内划和身体波将头推出水面',
      '头保持在水中，眼睛向前下方看',
    ],
    source: 'Swimming Knowledge Summary - Section 5.3；Swimming Drill Book - Section F',
    tags: ['抬头呼吸', '身体下沉', '节奏混乱', '眼睛向下'],
  },

  {
    id: 'error-breaststroke-pull-001',
    name: 'Wide or Deep Pull',
    nameZh: '划臂过宽或过深',
    stroke: 'breaststroke',
    category: 'pull',
    symptoms: [
      '身体位置丢失',
      '时机延迟（Late Timing）',
      '划臂效率低',
    ],
    rootCauses: [
      '手拉过肩部垂直面',
      '肘部未靠近体侧',
      '抓水角度不正确',
    ],
    correctionDrills: [
      'Standing Breaststroke Pulling Action',
      'Corners Drill',
      'Over the Barrel Breaststroke',
      'Quick Hands Breaststroke',
    ],
    prevention: [
      '蛙泳划臂应短而有力，不要拉过深',
      '手掌外扫（起始）→内划（加速）→收手向前',
    ],
    source: 'Swimming Drill Book - Section 5；Swimming Knowledge Summary - Section 5.3',
    tags: ['划臂过宽', '划臂过深', '时机延迟', '效率低'],
  },

  // ─────────────────────────────────────────────────────────
  // 蛙泳 · 时机与节奏错误 (Rhythm)
  // ─────────────────────────────────────────────────────────

  {
    id: 'error-breaststroke-rhythm-001',
    name: 'Incorrect Glide Timing',
    nameZh: '滑行时间不当',
    stroke: 'breaststroke',
    category: 'rhythm',
    symptoms: [
      '滑行太短：节奏过快，力量无法充分传递',
      '滑行太长：速度骤降，节奏拖沓',
    ],
    rootCauses: [
      '时机感知能力差',
      '不理解划-蹬-滑各阶段的最佳时长',
      '缺乏节奏练习',
    ],
    correctionDrills: [
      'Pull Breathe Kick Glide',
      'Double Glide Breaststroke',
      'Long Float',
      'Broken 25s',
    ],
    prevention: [
      '滑行最佳时长：约1-2秒（根据距离和强度调整）',
      '滑行目的是为下次划臂积蓄速度和位置优势',
    ],
    source: 'Swimming Knowledge Summary - Section 5.3；Swimming Drill Book - Section F',
    tags: ['滑行时间', '节奏', '划蹬滑', '时机'],
  },

  {
    id: 'error-breaststroke-rhythm-002',
    name: 'Simultaneous Pull and Kick',
    nameZh: '划蹬同时做 / 时机错位',
    stroke: 'breaststroke',
    category: 'rhythm',
    symptoms: [
      '推进力相互抵消（"Stars"现象）',
      '速度突然停顿而非平滑加速',
      '整体游进效率极低',
    ],
    rootCauses: [
      '划臂和蹬腿时机混乱',
      '不理解"划-蹬-滑"的顺序原则',
      '节奏训练不足',
    ],
    correctionDrills: [
      'No Stars',
      'Pull Breathe Kick Glide',
      'Two Kicks to One Pull',
      'Breaststroke Pull with Dolphin Kick',
    ],
    prevention: [
      '蛙泳的节奏是：划（产生推进）→ 停（滑行蓄力）→ 蹬（产生推进）→ 滑',
      '划臂和蹬腿永远是分开的两件事',
    ],
    source: 'Swimming Knowledge Summary - Section 5.3',
    tags: ['划蹬同时', '时机错位', '动力抵消', '节奏分离'],
  },

  {
    id: 'error-breaststroke-rhythm-003',
    name: 'Early Catch / Early Leg Draw',
    nameZh: '收腿时机过早',
    stroke: 'breaststroke',
    category: 'rhythm',
    symptoms: [
      '蹬腿与划水冲突',
      '身体下沉',
      '效率低',
    ],
    rootCauses: [
      '手臂尚未完全伸展就提前收腿',
      '不理解"手臂完全伸展后再收腿"的时机原则',
      '髋部力量不足导致代偿提前收腿',
    ],
    correctionDrills: [
      'Long Float',
      'Pull Breathe Kick Glide',
      'Heads Up Breaststroke',
      'Fast Heels',
    ],
    prevention: [
      '蛙泳黄金时机：手臂完全伸展后再开始收腿',
      '划臂和收腿之间的滑行是高效蛙泳的关键',
    ],
    source: 'Swimming Tech Supplementary - Section 5.4',
    tags: ['收腿过早', '时机', '滑行', '手臂伸展'],
  },

  // ─────────────────────────────────────────────────────────
  // 蝶泳错误库 (Butterfly Errors)
  // ─────────────────────────────────────────────────────────

  // ─────────────────────────────────────────────────────────
  // 蝶泳 · 身体波浪与打腿错误 (Kick)
  // ─────────────────────────────────────────────────────────

  {
    id: 'error-butterfly-kick-001',
    name: 'Kick Starting from Feet',
    nameZh: '踢腿从脚开始',
    stroke: 'butterfly',
    category: 'kick',
    symptoms: [
      '身体波浪断裂',
      '踢腿无力且滞后',
      '身体位置差，腿部下沉',
    ],
    rootCauses: [
      '未理解波浪传递顺序（头→胸→髋→脚）',
      '从末端而非中端驱动波浪',
      '核心力量不足以传导波浪',
    ],
    correctionDrills: [
      'Body Wave',
      'Superman Dolphin Kick',
      'Dolphin Kick Face Down',
      'Bowing',
    ],
    prevention: [
      '蝶泳踢腿的力量始于胸部的下压和髋部的伸展，脚只是波浪的末端',
      '踢腿时头和胸先下，髋部和脚后下——波浪传导方向',
    ],
    source: 'Swimming Drill Book - Section 5；Swimming Knowledge Summary - Section 5.4',
    tags: ['踢腿从脚', '波浪断裂', '核心驱动', '身体波浪'],
  },

  {
    id: 'error-butterfly-kick-002',
    name: 'Loss of Chest Low Position',
    nameZh: '胸低位丢失 / 身体波断裂',
    stroke: 'butterfly',
    category: 'kick',
    symptoms: [
      '身体整体抬起，阻力增大',
      '髋部不在波浪的正确位置',
      '"骑平坡"而非"骑波峰"',
    ],
    rootCauses: [
      '胸椎活动度不足',
      '核心力量无法维持胸部低位',
      '踢腿时机与身体波脱节',
    ],
    correctionDrills: [
      'Chest Balance',
      'Bowing',
      'Body Wave',
      'Superman Dolphin Kick',
    ],
    prevention: [
      '蝶泳的核心是"骑波浪"——胸部保持在波浪的低谷',
      '头和胸先下，髋部在波浪上',
    ],
    source: 'Swimming Drill Book - Section 5；Swimming Knowledge Summary - Section 4.2',
    tags: ['胸低位', '波浪断裂', '阻力增大', '骑波峰'],
  },

  // ─────────────────────────────────────────────────────────
  // 蝶泳 · 划水与恢复错误 (Pull / Recovery)
  // ─────────────────────────────────────────────────────────

  {
    id: 'error-butterfly-recovery-001',
    name: 'Recovering with Low Elbows',
    nameZh: '恢复臂拖肘',
    stroke: 'butterfly',
    category: 'recovery',
    symptoms: [
      '手臂恢复时肘部低于手',
      '身体下沉',
      '节奏断裂',
    ],
    rootCauses: [
      '肩部灵活性不足',
      '不理解垂直手臂恢复原理',
      '胸椎活动度限制',
    ],
    correctionDrills: [
      'Pinkies Up',
      'Butterfly One-Arm',
      'Power Fly',
      'Standing Butterfly Arm Action',
    ],
    prevention: [
      '蝶泳恢复臂应垂直向上，肘高于手',
      '小指出水，手掌朝向侧面',
    ],
    source: 'Swimming Drill Book - Section 5；Swimming Knowledge Summary - Section 5.4',
    tags: ['恢复拖肘', '垂直恢复', '身体下沉', '节奏断裂'],
  },

  {
    id: 'error-butterfly-pull-001',
    name: 'Arms Disconnected from Body Wave',
    nameZh: '划水与波浪脱节',
    stroke: 'butterfly',
    category: 'pull',
    symptoms: [
      '手臂动作独立于身体波浪',
      '推进力不足',
      '节奏不稳定',
    ],
    rootCauses: [
      '未将划水与身体波整合',
      '抓水时机与踢腿时机不同步',
      '核心力量不足',
    ],
    correctionDrills: [
      '2 Plus 2 Plus 2',
      'Butterfly Body Wave',
      'Butterfly One-Arm',
      'One-Arm and Breath',
    ],
    prevention: [
      '蝶泳划水时机：每两次海豚踢完成一次完整划水',
      '手臂下压与海豚踢下打同步（力量相位）',
    ],
    source: 'Swimming Drill Book - Section G；Swimming Knowledge Summary - Section 5.4',
    tags: ['划水脱节', '波浪整合', '时机同步', '核心力量'],
  },

  // ─────────────────────────────────────────────────────────
  // 蝶泳 · 节奏与呼吸错误 (Rhythm / Breathing)
  // ─────────────────────────────────────────────────────────

  {
    id: 'error-butterfly-rhythm-001',
    name: 'Rhythm Break',
    nameZh: '节奏断裂',
    stroke: 'butterfly',
    category: 'rhythm',
    symptoms: [
      '动作不连贯',
      '划水阶段与踢腿阶段脱节',
      '蝶泳变成两个独立动作',
    ],
    rootCauses: [
      '抓水-推水之间存在停顿',
      '不理解蝶泳"2次踢腿+1次划臂"的自然节奏',
      '呼吸打乱节奏',
    ],
    correctionDrills: [
      'Grab and Go',
      'Short Long Balance',
      'Continuous Butterfly',
      'Butterfly Body Wave',
    ],
    prevention: [
      '蝶泳节奏：每一次呼吸都应跟随完整的波浪节奏，不改变滚动量',
      '录视频观察自己是否存在停顿',
    ],
    source: 'Swimming Drill Book - Section 5；Swimming Knowledge Summary - Section 4.2',
    tags: ['节奏断裂', '停顿', '蝶泳节奏', '2踢1划'],
  },

  {
    id: 'error-butterfly-breathing-001',
    name: 'Body Rising Too High When Breathing',
    nameZh: '呼吸时身体过度抬起',
    stroke: 'butterfly',
    category: 'breathing',
    symptoms: [
      '呼吸时头部抬出水面过高',
      '髋部下沉',
      '阻力急剧增大',
    ],
    rootCauses: [
      '呼吸时用力抬头',
      '压头时机不正确（过早压头）',
      '胸椎活动度不足',
    ],
    correctionDrills: [
      'Butterfly Body Wave',
      'Eyes on Water',
      'Heads Up Breaststroke',
      'Short Long Balance',
    ],
    prevention: [
      '蝶泳呼吸是"嵌入"波浪中，不是"冲出"波浪',
      '转头呼吸时眼睛向下看，保持低姿态',
    ],
    source: 'Swimming Tech Supplementary - Section 5.2',
    tags: ['呼吸抬身', '髋部下沉', '波浪呼吸', '低姿态'],
  },

  {
    id: 'error-butterfly-entry-001',
    name: 'Head Enters Water Too Early',
    nameZh: '头部入水时机过早',
    stroke: 'butterfly',
    category: 'entry',
    symptoms: [
      '身体入水过深',
      '破坏下一次踢腿的时机',
      '节奏不连贯',
    ],
    rootCauses: [
      '头应与手同时入水，但实际时机过早',
      '压头动作与划水阶段不协调',
      '髋部伸展力量不足',
    ],
    correctionDrills: [
      'Butterfly Body Wave',
      'Superman Dolphin Kick',
      'Butterfly Breakout Drill',
    ],
    prevention: [
      '蝶泳入水时头应与手同时入水，头不是第一个入水的部分',
      '头和手一起入水后，胸部再下压',
    ],
    source: 'Swimming Tech Supplementary - Section 5.2',
    tags: ['头入水过早', '时机', '节奏', '波浪传导'],
  },

  // ─────────────────────────────────────────────────────────
  // 通用错误库 (General Errors)
  // ─────────────────────────────────────────────────────────

  // ─────────────────────────────────────────────────────────
  // 通用 · 出发错误 (Start)
  // ─────────────────────────────────────────────────────────

  {
    id: 'error-general-start-001',
    name: 'Deceleration Before Start',
    nameZh: '出发减速滑行',
    stroke: 'general',
    category: 'start',
    symptoms: [
      '接近出发台时主动减速',
      '蹬离后无动力感',
      '出发时间损失',
    ],
    rootCauses: [
      '恐惧入水或水花',
      '出发技术不熟练',
      '垂直弹跳力不足',
    ],
    correctionDrills: [
      'Jumping from the Blocks',
      'Streamline Jump from the Blocks',
      'Standing Streamline Jump',
      'Dive from the Blocks',
    ],
    prevention: [
      '出发台是速度的起点，蹬离后立即开始海豚踢',
      '流线型是出发后最重要的姿态',
    ],
    source: 'The Swim Coaching Bible - Chapter 15；Swimming Drill Book - Section H',
    tags: ['出发减速', '出发台', '流线型', '弹跳力'],
  },

  {
    id: 'error-general-start-002',
    name: 'Incorrect Entry Angle',
    nameZh: '入水角度过大或过小',
    stroke: 'general',
    category: 'start',
    symptoms: [
      '入水过平：产生巨大水花，速度骤降',
      '入水过深：浪费时间在水下',
      '身体与水面不协调',
    ],
    rootCauses: [
      '对入水角度缺乏控制',
      '出发台技术不熟练',
      '缺乏身体感知',
    ],
    correctionDrills: [
      'Streamline Diving',
      'Butterfly Start',
      'Freestyle Start',
      'Relay Starts',
      'Track Start',
    ],
    prevention: [
      '出发入水角度约30-45°最佳',
      '入水后身体保持紧张流线型',
    ],
    source: 'The Swim Coaching Bible - Chapter 15；Swimming Drill Book - Section H',
    tags: ['入水角度', '水花', '速度', '流线型'],
  },

  {
    id: 'error-general-start-003',
    name: 'Late / No Dolphin Kick',
    nameZh: '水下海豚踢不启动或时机延迟',
    stroke: 'general',
    category: 'start',
    symptoms: [
      '蹬壁后滑行太久（超过3米）',
      '水下踢腿无力',
      '失去推进力',
    ],
    rootCauses: [
      '不理解蹬壁后应"立即"开始海豚踢',
      '髋关节伸展力量不足',
      '踝关节灵活性差',
    ],
    correctionDrills: [
      'Streamline Dolphin Kick',
      'Superman Dolphin Kick',
      'Dolphin Kick Face Down',
      'Push-off and Somersault',
    ],
    prevention: [
      '蹬壁后立即开始海豚踢，不要滑行',
      '水下海豚踢是出发和转身的关键推进段（15米限制）',
    ],
    source: 'Swimming Knowledge Summary - Section 2.3；Swimming Tech Supplementary - Section 8.8',
    tags: ['水下海豚踢', '时机延迟', '蹬壁', '滑行'],
  },

  // ─────────────────────────────────────────────────────────
  // 通用 · 转身错误 (Turn)
  // ─────────────────────────────────────────────────────────

  {
    id: 'error-general-turn-001',
    name: 'Coasting Too Long Before Flip',
    nameZh: '自由泳翻转时减速滑行',
    stroke: 'general',
    category: 'turn',
    symptoms: [
      '接近墙壁时主动滑行',
      '失去翻转动力',
      '转身时间增加',
    ],
    rootCauses: [
      '提前准备翻转动作，减速等待',
      '对翻转时机缺乏信心',
      '头部抬起过高',
    ],
    correctionDrills: [
      'Freestyle Turn',
      'One-Arm Extension and Flip',
      'Jump and Somersault',
      'Push-off and Somersault',
    ],
    prevention: [
      '保持划水到最后一刻，转身的节奏感来自练习',
      '头部保持低位，眼睛只看池底黑色十字底部',
    ],
    source: 'Swimming Drill Book - Section I；Swimming Tech Supplementary - Section 5.5',
    tags: ['翻转减速', '翻转时机', '滑行', '自由泳转身'],
  },

  {
    id: 'error-general-turn-002',
    name: 'Head Lifting During Flip',
    nameZh: '翻转时头部抬起',
    stroke: 'general',
    category: 'turn',
    symptoms: [
      '翻转时机混乱',
      '身体位置丢失',
      '旋转受阻',
    ],
    rootCauses: [
      '怕碰到墙壁，紧张抬头',
      '不理解低视角翻转原理',
      '翻转时身体未收紧',
    ],
    correctionDrills: [
      'Corkscrew Swimming',
      'Freestyle Turn with Flag',
      'Push-off and Somersault',
    ],
    prevention: [
      '翻转时头低下，只看池底',
      '翻转轴心是身体中线，头部跟随旋转',
    ],
    source: 'Swimming Tech Supplementary - Section 5.5',
    tags: ['翻转抬头', '头部抬起', '旋转受阻', '紧张'],
  },

  {
    id: 'error-general-turn-003',
    name: 'Arms Bending During Flip',
    nameZh: '翻转时手臂弯曲',
    stroke: 'general',
    category: 'turn',
    symptoms: [
      '入水后流线型不完整',
      '蹬壁力量损失',
      '手臂在翻转中产生额外阻力',
    ],
    rootCauses: [
      '翻转时紧张导致手臂弯曲',
      '不理解"翻转时手臂伸直"原则',
      '翻转技术不熟练',
    ],
    correctionDrills: [
      'One-Arm Extension and Flip',
      'Plus Kicking',
      'Push-off and Somersault',
    ],
    prevention: [
      '翻转时手臂保持伸直——入水时手臂应已在流线型位置',
      '膝盖收到胸部的瞬间，手臂已经完成过头伸直',
    ],
    source: 'Swimming Drill Book - Section I；Swimming Tech Supplementary - Section 5.5',
    tags: ['手臂弯曲', '流线型', '蹬壁力量', '翻转'],
  },

  {
    id: 'error-general-turn-004',
    name: 'Coasting Too Long After Push-off',
    nameZh: '蹬壁后滑行太久',
    stroke: 'general',
    category: 'turn',
    symptoms: [
      '蹬壁后速度骤降',
      '未及时开始海豚踢或划水',
      '转身时间浪费',
    ],
    rootCauses: [
      '蹬壁后习惯性等待滑行',
      '蹬壁角度不佳',
      '核心稳定性差',
    ],
    correctionDrills: [
      'Streamline Jumps',
      'Plus Kicking',
      'Plus Three Strokes',
    ],
    prevention: [
      '蹬壁后立即开始海豚踢（或蝶泳/自由泳）',
      '膝盖弯曲角度保持在55-70°最佳流线型',
    ],
    source: 'Swimming Drill Book - Section I；Swimming Tech Supplementary - Section 5.5',
    tags: ['蹬壁滑行', '海豚踢', '流线型', '速度'],
  },

  {
    id: 'error-general-turn-005',
    name: 'Feet Breaking Streamline',
    nameZh: '蹬壁后脚超出滑流',
    stroke: 'general',
    category: 'turn',
    symptoms: [
      '膝盖弯曲角度过大',
      '身体形成"V"形',
      '阻力急剧增加',
    ],
    rootCauses: [
      '蹬壁时身体未收紧',
      '膝盖弯曲角度超过70°',
      '踝关节灵活性差',
    ],
    correctionDrills: [
      'Streamline Jumps',
      'Plus Kicking',
    ],
    prevention: [
      '蹬壁后身体像一支箭（Arrow），脚不能露出水面',
      '膝盖弯曲55-70°最佳',
    ],
    source: 'Swimming Tech Supplementary - Section 5.5',
    tags: ['脚超出', 'V形', '膝盖弯曲', '流线型'],
  },

  {
    id: 'error-general-turn-006',
    name: 'Improper Backstroke Turn Timing',
    nameZh: '仰泳翻转时机不当',
    stroke: 'general',
    category: 'turn',
    symptoms: [
      '翻转过早或过晚',
      '错过最佳旋转时机',
      '触壁不精确',
    ],
    rootCauses: [
      '不利用仰泳旗判断旋转时机',
      '头部过度前伸',
      '双臂同时划水接近墙壁',
    ],
    correctionDrills: [
      'Backstroke Turn',
      'Backstroke Turn with Flag',
      'Backstroke to Breaststroke Turn',
      'Freestyle Turn',
    ],
    prevention: [
      '仰泳翻转时机：看到仰泳旗时开始旋转',
      '旋转至俯卧做一个自由泳划臂，再翻转踢壁',
    ],
    source: 'Swimming Drill Book - Section I；Swimming Tech Supplementary - Section 5.5',
    tags: ['仰泳翻转', '翻转时机', '仰泳旗', '触壁'],
  },

  {
    id: 'error-general-turn-007',
    name: 'Head Lifting in Open Turn',
    nameZh: '蝶/蛙泳开放转身头部抬高',
    stroke: 'general',
    category: 'turn',
    symptoms: [
      '转头吸气时头部抬出水面',
      '膝盖未收紧，旋转半径大',
      '脚部垂直位置不佳',
    ],
    rootCauses: [
      '转头吸气时耳朵未贴近水面',
      '膝盖未收紧缩小旋转半径',
      '髋部未贴近身体旋转',
    ],
    correctionDrills: [
      'Butterfly Turn',
      'Breaststroke Turn',
      'Two-Hand Open Turn',
      'Spin Turn',
    ],
    prevention: [
      '开放转身时头低下，耳朵贴近水面',
      '膝盖踢水时贴近身体，缩小旋转半径',
    ],
    source: 'Swimming Drill Book - Section I；Swimming Tech Supplementary - Section 5.5',
    tags: ['开放转身', '头部抬高', '旋转半径', '蝶泳', '蛙泳'],
  },

  // ─────────────────────────────────────────────────────────
  // 通用 · 体能错误 (General)
  // ─────────────────────────────────────────────────────────

  {
    id: 'error-general-general-001',
    name: 'Front/Back Chain Imbalance',
    nameZh: '前后链力量不平衡',
    stroke: 'general',
    category: 'general',
    symptoms: [
      '肩部稳定性差',
      '划水效率低',
      '肩关节受伤风险高',
    ],
    rootCauses: [
      '前链（胸肌、肩屈肌）过紧有力',
      '后链（臀肌、腘绳肌、菱形肌）过弱',
      '陆上训练忽视后链',
    ],
    correctionDrills: [
      'Seated Row',
      'Bent-Over Row',
      'Shoulder Retraction with External Rotation',
      'Standing External Rotation',
    ],
    prevention: [
      '前链（卧推）与后链（划船）力量比应平衡',
      '游泳者需要更多后链力量',
    ],
    source: 'Swimming Tech Supplementary - Section 6；Swimming Knowledge Summary - Section 6.1',
    tags: ['前后链', '力量不平衡', '肩关节', '后链训练'],
  },

  {
    id: 'error-general-general-002',
    name: 'Ankle Mobility Deficiency',
    nameZh: '踝关节灵活性不足',
    stroke: 'general',
    category: 'general',
    symptoms: [
      '打腿效率低',
      '脚踝僵硬像"木桨"',
      '推进力损失',
    ],
    rootCauses: [
      '缺乏踝关节专项伸展',
      '跑步/骑行背景导致踝关节习惯性僵硬',
      '忽视泳前踝关节激活',
    ],
    correctionDrills: [
      'Sitting Ankle Stretch',
      'Duck Feet',
      'Vertical Flutter Kick',
    ],
    prevention: [
      '踝关节灵活性对所有泳姿的打腿都至关重要',
      '建议每周多次练习踝关节伸展',
    ],
    source: 'Swim Smooth - Chapter 29；Swimming Tech Supplementary - Section 6.5',
    tags: ['踝关节', '灵活性不足', '打腿效率', '推进力'],
  },

  {
    id: 'error-general-general-003',
    name: 'Hip Mobility Deficiency',
    nameZh: '髋关节灵活性不足',
    stroke: 'general',
    category: 'general',
    symptoms: [
      '身体滚动范围受限',
      '自由泳/蝶泳身体波受阻',
      '划水效率低',
    ],
    rootCauses: [
      '久坐导致髋屈肌紧张',
      '骑行背景导致髋关节后侧僵硬',
      '忽视髋关节伸展',
    ],
    correctionDrills: [
      'Hip Flexor Stretch',
      'Cat-Cow',
      'Hip Opener',
    ],
    prevention: [
      '髋关节灵活性是游泳身体滚动的基础',
      '建议每周多次髋关节伸展训练',
    ],
    source: 'Swim Smooth - Chapter 29；Swimming Knowledge Summary - Section 6.2',
    tags: ['髋关节', '灵活性不足', '身体滚动', '自由泳', '蝶泳'],
  },

  {
    id: 'error-general-general-004',
    name: 'Core Stability Deficiency',
    nameZh: '核心稳定性不足',
    stroke: 'general',
    category: 'general',
    symptoms: [
      '无法保持身体水平位置',
      '游泳时身体左右摆动',
      '划水效率降低',
    ],
    rootCauses: [
      '核心肌群力量不足',
      '髋部-肩部核心连接弱',
      '未进行核心专项训练',
    ],
    correctionDrills: [
      'Plank Hold',
      'Back Plank',
      'Log Roll',
      'Power Zone Training',
      'Bum Cheek Squeeze',
    ],
    prevention: [
      '核心是游泳的"动力传输带"——连接上肢和下肢',
      '大多数游泳者已有足够的核心力量，关键是协调和激活',
    ],
    source: 'Swim Smooth - Chapter 10；Swimming Tech Supplementary - Section 6.3',
    tags: ['核心稳定性', '身体摆动', '水平位置', '核心训练'],
  },

  {
    id: 'error-general-general-005',
    name: 'Shoulder Stability Deficiency',
    nameZh: '肩关节稳定性不足',
    stroke: 'general',
    category: 'general',
    symptoms: [
      '划水时肩关节疼痛',
      '肩袖肌群过劳',
      '划水效率不稳定',
    ],
    rootCauses: [
      '肩袖肌群力量不足',
      '内旋/外旋力量不平衡',
      '过度训练未充分恢复',
    ],
    correctionDrills: [
      'Standing Internal Rotation',
      'Standing External Rotation',
      'Full Can',
      'Shoulder Retraction with External Rotation',
      'Catch Position External Rotation',
    ],
    prevention: [
      '肩部损伤在游泳中非常普遍（大学女子游泳者>50%有过此经历）',
      '肩袖内外旋力量平衡是预防肩伤的关键',
    ],
    source: 'Swim Smooth - Chapter 30；Swimming Tech Supplementary - Section 6',
    tags: ['肩关节', '稳定性不足', '肩袖', '肩伤预防'],
  },

];
