import { RecoveryEntry } from './REGISTRY_SCHEMA';

/**
 * Recovery Registry - 恢复方案注册表
 *
 * 涵盖热身(warmup)、冷身(cooldown)、主动恢复(active)、被动恢复(passive)和营养恢复(nutrition)。
 *
 * 来源: 营养与恢复.md, 错误库.md, 铁三训练.md, 青少年游泳.md
 * 核心参考: Dave Salo - Complete Conditioning for Swimming,
 *          Paul Newsome - Swim Smooth,
 *          Science of Swimming 训练系列
 */

export const recoveryRegistry: RecoveryEntry[] = [
  // =============================================================
  // === 热身 (warmup) ===
  // =============================================================
  {
    id: 'recovery-warmup-standard',
    name: 'Standard Warmup',
    nameZh: '标准热身流程',
    type: 'warmup',
    duration: '15-20分钟',
    steps: [
      '轻松游 200-400m (Z1)，保持流线型和良好身体位置',
      '技术Drill 100-200m（如4×50，每50含1个Drill + 游泳交替）',
      '逐步提速 4×50m (65% → 75% → 85% → 90%配速)',
      '辅助动态拉伸（岸上3-5分钟：肩部绕环、髋部绕环、踝关节灵活性、脊椎旋转）',
      '呼吸调整 100m 轻松游',
    ],
    useCases: ['日常训练前', '比赛前（预热池可用）'],
    cautions: ['水温低时延长热身至20-25分钟', '热身循序渐进，不跳过热身阶段', '个性化——根据自身感受调整强度'],
    source: 'Dave Salo - Complete Conditioning for Swimming / USC Irvine Novaquatics体系',
  },

  {
    id: 'recovery-warmup-race',
    name: 'Race Day Warmup',
    nameZh: '比赛日热身方案',
    type: 'warmup',
    duration: '20-30分钟',
    steps: [
      '400m 慢速游，中等配速——专注保持流线型、良好身体位置',
      '技术Drill：专注本次比赛的技术重点（如高肘入水、爆发性抓水等）',
      '4×50m 逐步提速（65% → 75% → 85% → 90%）',
      '4×25m 比赛配速模拟（1-2组，包含出发和/或转身）',
      '1-2个15-25m 比赛配速冲刺',
      '慢游 100m 调整呼吸',
    ],
    useCases: ['重大比赛日', '预赛/决赛前', '锦标赛'],
    cautions: [
      '早场比赛（8点前）热身减至15-20分钟，以维持状态为主勿过度消耗',
      '决赛前热身10-15分钟，维持热身后状态即可',
      '赛前4-3小时完成主要热身，不要热身距比赛太近',
      '避免尝试从未做过的热身动作',
    ],
    source: 'Dave Salo - Complete Conditioning for Swimming; The Swim Coaching Bible',
  },

  {
    id: 'recovery-warmup-cold',
    name: 'Cold Water Warmup',
    nameZh: '寒冷天气/低温水域热身方案',
    type: 'warmup',
    duration: '20-25分钟',
    steps: [
      '岸上动态热身5分钟（原地高抬腿、手臂绕环、髋部打开、踝关节灵活性练习）',
      '渐进下水——先拍水适应水温',
      '轻松游 300-500m (Z1)，着重保持体温',
      '打腿 4×50m (Z1-Z2)，使用脚蹼加速升温',
      '技术Drill 4×50m',
      '逐步提速 4×50m (65% → 75% → 85% → 90%)',
      '持续性低速运动保持体温至主项开始',
    ],
    useCases: ['冬季室外训练', '冷水开放水域', '赛前体温过低风险时', '防寒泳衣训练'],
    cautions: [
      '水温低于20°C时必须穿防寒泳衣',
      '体温过低时不要做激烈动作——可能引发抽筋',
      '热身期间持续轻度活动，不要长时间静止',
      '注意头部保暖（泳帽）',
    ],
    source: 'Swim Smooth - Chapter 38（防寒泳衣游泳调整）; Complete Conditioning for Swimming',
  },

  {
    id: 'recovery-warmup-shoulder',
    name: 'Shoulder-Safe Warmup',
    nameZh: '肩伤者热身变体',
    type: 'warmup',
    duration: '20-25分钟',
    steps: [
      '弹力带肩部激活（岸上5分钟：肩袖外旋、肩胛后收、YTWL训练）',
      '水中极轻松游 200-300m (Z1)，以小幅度划水为主',
      '浮板打腿 4×50m (Z1)，减少肩部负载',
      '分解划水 4×50m (Z1-Z2)，专注高肘入水而非用力',
      '加速游 4×25m (Z2)，感受肩部无痛范围',
      '如有疼痛立即停止转为打腿或侧身浮板练习',
    ],
    useCases: ['肩袖损伤恢复期训练', '肩关节慢性不适训练前', '肩伤康复训练'],
    cautions: [
      '任何肩部疼痛动作立即停止',
      '避免拇指先入水和高强度划水',
      '使用指尖或小指入水以减少肩内旋压力',
      '热身结束后肩部应有暖感而非疼痛感',
    ],
    source: 'Swim Smooth - Chapter 30（损伤预防）; Complete Conditioning for Swimming; Foundations of Strength Training for Swimmers',
  },

  // =============================================================
  // === 冷身 (cooldown) ===
  // =============================================================
  {
    id: 'recovery-cooldown-standard',
    name: 'Standard Cooldown',
    nameZh: '标准冷身流程',
    type: 'cooldown',
    duration: '15-20分钟',
    steps: [
      '轻松游 200-400m (Z1, 50-60%配速)，保持流线型',
      '技术游 100-200m，专注动作质量而非速度',
      'Drill 100m（缓慢，专注灵活性）',
      '50-100m 漂浮放松（主动伸展四肢）',
      '静态拉伸 5-10分钟（岸上：肩、背阔肌、髋屈肌、股四头肌、小腿、髋部展开肌）',
    ],
    useCases: ['高强度训练后', '比赛后', '日常训练冷身'],
    cautions: [
      '冷身后补充水分和电解质',
      '不要立即停止运动——至少进行5分钟主动冷身',
      '充分冷身需要10-20分钟，而非100-200m轻松游（多数运动员严重不足）',
      '组间冷身同样重要——高强度组间进行3-5分钟轻松游',
    ],
    source: 'Dave Salo - Complete Conditioning for Swimming; Swim Smooth',
  },

  {
    id: 'recovery-cooldown-race',
    name: 'Post-Race Cooldown',
    nameZh: '比赛后冷身方案',
    type: 'cooldown',
    duration: '15-25分钟',
    steps: [
      '立刻进行200-400m 极轻松游（Z1，50%配速），促进乳酸清除',
      '100-200m 技术游，专注呼吸节奏调整',
      '50-100m 慢速打腿或Drill',
      '50-100m 漂浮放松',
      '静态拉伸 10分钟（重点：肩部、上背部、髋屈肌、股四头肌、小腿）',
      '上岸后立即补充营养（30分钟黄金窗口）',
    ],
    useCases: ['预赛/决赛后', '多轮次比赛的轮次之间', '高强度测试后'],
    cautions: [
      '预赛-决赛之间不要做过度冷身——维持热身状态为主',
      '比赛后冷身不宜过长，避免消耗过多恢复能量',
      '注意补充电解质——比赛中的脱水程度可能超出预期',
      '冷身后尽快补充碳水和蛋白质（详见营养恢复方案）',
    ],
    source: 'Dave Salo - Complete Conditioning for Swimming; Eat Right, Swim Faster (Abby Knox)',
  },

  // =============================================================
  // === 主动恢复 (active) ===
  // =============================================================
  {
    id: 'recovery-active-swim',
    name: 'Active Recovery Swim',
    nameZh: '主动恢复——轻松游',
    type: 'active',
    duration: '20-30分钟',
    steps: [
      '200-400m 极轻松游（配速低于训练配速30-40秒/100米，Z1）',
      '100-200m 技术游（专注动作质量，非速度）',
      '100m Drills（缓慢，放松）',
      '100m 交替漂浮与慢速游',
    ],
    useCases: ['高强度训练次日', '训练日的休息日', '比赛后第二天', '赛季中的恢复日训练'],
    cautions: [
      '说话测试——能完整说句子而不喘，确保强度不超标',
      '高强度训练后不要完全静止——主动恢复乳酸的清除比被动快20-30%',
      '如感到疲劳加重，应进一步降低强度或转为完全休息',
    ],
    source: 'Complete Conditioning for Swimming; Science of Swimming 训练系列',
  },

  {
    id: 'recovery-active-stretch',
    name: 'Active Recovery - Stretch & Yoga',
    nameZh: '主动恢复——拉伸与瑜伽',
    type: 'active',
    duration: '20-40分钟',
    steps: [
      '轻度全身动态拉伸 5分钟（肩部绕环、髋部绕环、脊椎扭转、踝关节画圈）',
      '游泳专项静态拉伸 10-15分钟（门框拉伸、单阔肌伸展、弓箭步压腿、坐姿蝴蝶式、站姿跟腱拉伸）',
      '核心激活 5分钟（猫牛式、平板支撑30秒×3组、侧桥30秒/侧）',
      '呼吸放松 5分钟（腹式深呼吸，2-10分钟专注呼吸节奏）',
    ],
    useCases: ['训练后延长冷身', '恢复日替代水中训练', '肩部/髋部灵活性改善', '赛前期心理放松'],
    cautions: [
      '训练前不要过度静态拉伸（降低力量输出约5-30%），训练后才是静态拉伸的最佳时机',
      '拉伸到有轻微张力感即可，避免疼痛',
      '每个拉伸姿势保持至少30秒才有效果',
    ],
    source: 'Swim Smooth - Chapter 29（柔韧性训练）; Complete Conditioning for Swimming',
  },

  // =============================================================
  // === 被动恢复 (passive) ===
  // =============================================================
  {
    id: 'recovery-passive-cold-bath',
    name: 'Cold Water Immersion',
    nameZh: '冷水浴/冰浴',
    type: 'passive',
    duration: '10-15分钟',
    steps: [
      '准备冷水：10-15°C水温（加入冰袋降至目标温度）',
      '上身浸泡至腰部（或全身浸泡，颈部以上保持水面外）',
      '保持静止浸泡10-15分钟',
      '出水后用毛巾擦干，穿上保暖衣物（不要再做剧烈活动）',
      '间隔至少2小时后可进行热敷或热水浴',
    ],
    useCases: ['高强度比赛后30分钟内', '训练课后肌肉严重炎症反应', '炎热天气训练后降温'],
    cautions: [
      '过度使用可能影响训练适应——减少肌肉对训练的合成代谢反应',
      '不宜在训练后立即长期使用（建议高强度训练后24小时内使用1次）',
      '有心血管疾病者慎用',
      '浸泡时间不宜超过15分钟，避免低温损伤',
      '低水温(<10°C)需缩短时间至5-8分钟',
    ],
    source: 'Science of Swimming 训练系列; Swimming Science (G. John Muller)',
  },

  {
    id: 'recovery-passive-compression',
    name: 'Compression Recovery',
    nameZh: '压缩衣恢复',
    type: 'passive',
    duration: '数小时（可穿戴过夜）',
    steps: [
      '训练/比赛后淋浴，擦干身体',
      '穿戴压缩袜/压缩裤/压缩上衣（从远端向近心端穿戴）',
      '保持穿戴至少1-2小时，过夜效果更佳',
      '配合腿抬高休息（高于心脏水平）',
    ],
    useCases: ['长距离比赛后（1500米/开放水域）', '高强度训练课后', '长途旅行/赛前长途飞行后', '站立时间长的比赛日'],
    cautions: [
      '压缩服装的主观恢复感较强，但客观证据强度仅为"弱"至"中"',
      '不宜过紧——影响血液循环',
      '睡眠时穿戴确保松紧适中',
      '不能替代主动恢复和营养支持',
    ],
    source: 'Science of Swimming 训练系列（被动恢复功效表）',
  },

  // =============================================================
  // === 营养恢复 (nutrition) ===
  // =============================================================
  {
    id: 'recovery-nutrition-30min',
    name: 'Post-Exercise Nutrition (Golden Window)',
    nameZh: '赛后30分钟营养恢复（黄金窗口）',
    type: 'nutrition',
    duration: '训练/比赛后30分钟内',
    steps: [
      '立即补充碳水化合物：每公斤体重1.0-1.2克碳水（高血糖指数优先——白米饭、土豆、白面包、运动饮料、香蕉）',
      '补充优质蛋白质：20-40克（乳清蛋白粉25-30g优于固体食物——吸收快）',
      '碳水和蛋白质同时摄入促进胰岛素分泌，加速糖原回补和肌肉修复',
      '补充水分：每丢失1公斤体重补充1.0-1.5升液体（含电解质）',
      '示例：乳清蛋白粉（25-30g）+ 香蕉1根 + 白面包2片',
    ],
    useCases: ['高强度训练后立即', '比赛/预赛结束后', '上午训练后'],
    cautions: [
      '黄金窗口（30分钟内）肌肉对胰岛素敏感性最高，不应错过',
      '优先液体补给（吸收快于固体食物），尤其训练后胃口不佳时',
      '运动饮料补充碳水的同时也补充电解质',
      'Vitargo（麦芽糊精）吸收比葡萄糖更快，适合训练后快速补充',
    ],
    source: 'Eat Right, Swim Faster (Abby Knox); Science of Swimming 训练系列',
  },

  {
    id: 'recovery-nutrition-2hr',
    name: 'Post-Exercise Meal (2-Hour Window)',
    nameZh: '赛后2小时内正餐恢复',
    type: 'nutrition',
    duration: '训练/比赛后1-2小时内',
    steps: [
      '正餐主食：复合碳水为主（糙米、全麦面包、燕麦、土豆）200-300g',
      '优质蛋白来源：鸡胸肉/鱼150-200g，或鸡蛋3-4个，或豆腐200g',
      '蔬菜类：深绿色蔬菜（补充镁、钾、维生素C）',
      '健康脂肪：橄榄油、牛油果、坚果（少量，避免影响消化）',
      '充分饮水至尿液呈淡黄色',
    ],
    useCases: ['训练后第一顿正餐', '上午训练后的午餐', '下午训练后的晚餐'],
    cautions: [
      '避免高脂高纤维食物（消化慢，影响恢复效率）',
      '训练后第一份碳水补充后，逐步过渡到复合碳水',
      '完全恢复时间：中等强度训练后约需24小时；高强度或长训练后可能需要48小时以上',
      '注意补充亮氨酸（每餐2-3g，约25-30g优质蛋白）以最大化肌肉合成',
    ],
    source: 'Eat Right, Swim Faster (Abby Knox); Science of Swimming 训练系列',
  },

  {
    id: 'recovery-nutrition-hydration',
    name: 'Hydration Recovery',
    nameZh: '补水恢复方案',
    type: 'nutrition',
    duration: '训练后2-4小时内逐步完成',
    steps: [
      '评估脱水程度：训练前后称重（排空膀胱后），体重每下降1%补充600-700ml液体',
      '分次补充：每次200-300ml（少量多次更有助于水合恢复）',
      '含钠运动饮料优先——补充电解质并促进口渴感',
      '监测尿液颜色——保持淡黄色为理想目标',
      '后续饮食中补充含钾食物（香蕉、椰子水）和含镁食物（深绿色蔬菜、坚果）',
    ],
    useCases: ['所有训练/比赛后', '炎热环境训练后', '长距离训练后', '有脱水迹象时'],
    cautions: [
      '不要一次大量饮水（500ml以上），反而增加排尿量，降低补水效率',
      '口渴是滞后的脱水信号——出现口渴时已丢失约1-2%体重水分',
      '大量饮水（尤其纯净水）而未补充钠，可能导致低钠血症（水中毒）',
      '炎热环境出汗率可达1.5升/小时，需增加补水频率',
    ],
    source: 'Swimming Science (G. John Muller); Eat Right, Swim Faster (Abby Knox)',
  },

  {
    id: 'recovery-nutrition-taper',
    name: 'Tapering Nutrition',
    nameZh: '减量期营养策略',
    type: 'nutrition',
    duration: '赛前7天至比赛日',
    steps: [
      '赛前5-7天：碳水摄入5-6g/kg体重，蛋白质1.8g/kg体重（训练量降至60-70%）',
      '赛前3-4天：碳水6-7g/kg体重，蛋白质2.0g/kg体重（训练量降至40%，维持强度）',
      '赛前1-2天：碳水8-10g/kg体重（选择性糖原装载），蛋白质2.0g/kg体重（训练量20-30%）',
      '比赛日早餐（赛前3-4小时）：复合碳水+少量蛋白质，低脂低纤维（燕麦粥+香蕉）',
      '比赛日热身期间：少量饮水，可补充运动饮料',
    ],
    useCases: ['重大比赛前减量期', '锦标赛准备期', '赛季末高峰赛事'],
    cautions: [
      '减量期训练量下降时应适度下调碳水摄入（约减少20-30%），避免体脂增加',
      '不要从未吃过的新食物',
      '早场比赛提前测试进食时间（部分运动员对赛前3小时进食反应不同）',
      '比赛前1-2天碳水装载对短距离项目（50-100m）意义不大',
    ],
    source: 'Science of Swimming 训练系列; Eat Right, Swim Faster (Abby Knox); Complete Conditioning for Swimming',
  },
];
