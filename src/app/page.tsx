'use client'

import { useMemo, useState } from 'react'
import { Activity, Compass, Shield, Sparkles, Target } from 'lucide-react'
import { AppHeader } from '@/components/AppHeader'
import { ChipMultiSelect } from '@/components/ChipMultiSelect'
import { FieldRow, NumberInput, Select, TextInput } from '@/components/FormControls'
import { ResultsPanel } from '@/components/ResultsPanel'
import { SectionCard } from '@/components/SectionCard'
import { generateMockPlan } from '@/lib/mockPlan'
import { LEVEL_LABEL, type Equipment, type GoalType, type PlanFormState, type SwimmingEvent } from '@/lib/types'
import { parseTimeInput } from '@/lib/time'
import { type FieldValidationState, type ValidatedField, validatePlanForm } from '@/lib/validation'

const equipmentOptions: Equipment[] = ['浮板', '划手掌', '浮腿夹', '脚蹼', '呼吸管', 'Tempo Trainer']

const eventOptions: Array<{ value: SwimmingEvent; label: string }> = [
  { value: '50 Free', label: '50 Free（自由泳）' },
  { value: '100 Free', label: '100 Free（自由泳）' },
  { value: '200 Free', label: '200 Free（自由泳）' },
  { value: '400 Free', label: '400 Free（自由泳）' },
  { value: '800 Free', label: '800 Free（自由泳）' },
  { value: '1500 Free', label: '1500 Free（自由泳）' },
  { value: '100 Back', label: '100 Back（仰泳）' },
  { value: '200 Back', label: '200 Back（仰泳）' },
  { value: '100 Breast', label: '100 Breast（蛙泳）' },
  { value: '200 Breast', label: '200 Breast（蛙泳）' },
  { value: '100 Fly', label: '100 Fly（蝶泳）' },
  { value: '200 Fly', label: '200 Fly（蝶泳）' },
  { value: '200 IM', label: '200 IM（混合泳）' },
  { value: '400 IM', label: '400 IM（混合泳）' },
]

const goalTypeOptions: GoalType[] = ['成绩提升', '技术优化', '耐力发展', '速度提升', '比赛备战', '铁人三项专项']

function inputTone(validation: FieldValidationState | undefined) {
  if (validation?.error) {
    return 'border-red-400/70 bg-red-500/10 focus:border-red-300/80'
  }
  if (validation?.warning) {
    return 'border-amber-400/60 bg-amber-500/10 focus:border-amber-300/80'
  }
  return undefined
}

function FieldMessage({ validation }: { validation?: FieldValidationState }) {
  if (!validation?.error && !validation?.warning) return null

  return (
    <div className="space-y-1">
      {validation.error ? <p className="text-xs leading-5 text-red-300">{validation.error}</p> : null}
      {validation.warning ? <p className="text-xs leading-5 text-amber-200">{validation.warning}</p> : null}
    </div>
  )
}

export default function Home() {
  const [form, setForm] = useState<PlanFormState>({
    age: '',
    gender: '男',
    trainingExperienceMonths: '',
    level: 'L2',
    event: '100 Free',
    goalType: '成绩提升',
    currentTimeInput: '',
    goalTimeInput: '',
    targetDate: '',
    poolLength: '25m',
    weeklyDistanceMeters: '',
    trainingDaysPerWeek: 3,
    trainingDurationPerSessionMinutes: 60,
    availableEquipment: ['浮板', '浮腿夹'],
    injury: '无',
  })

  const [result, setResult] = useState<ReturnType<typeof generateMockPlan> | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [lastCopied, setLastCopied] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [submitAttempted, setSubmitAttempted] = useState(false)
  const [touchedFields, setTouchedFields] = useState<Partial<Record<ValidatedField, boolean>>>({})

  const normalizedPreview = useMemo(() => {
    const current = parseTimeInput(form.currentTimeInput)
    const goal = parseTimeInput(form.goalTimeInput)
    return {
      current: current?.displayFormat ?? null,
      goal: goal?.displayFormat ?? null,
      currentOk: !form.currentTimeInput.trim() || Boolean(current),
      goalOk: !form.goalTimeInput.trim() || Boolean(goal),
      currentSeconds: current?.secondsTotal ?? null,
      goalSeconds: goal?.secondsTotal ?? null,
    }
  }, [form.currentTimeInput, form.goalTimeInput])

  const headerStats = useMemo(() => {
    const ratio =
      normalizedPreview.currentSeconds && normalizedPreview.goalSeconds && normalizedPreview.currentSeconds > 0
        ? (normalizedPreview.currentSeconds - normalizedPreview.goalSeconds) / normalizedPreview.currentSeconds
        : null
    return {
      current: normalizedPreview.current ?? '—',
      goal: normalizedPreview.goal ?? '—',
      ratio: ratio === null ? '—' : `${(ratio * 100).toFixed(1)}%`,
    }
  }, [normalizedPreview])

  const validation = useMemo(() => validatePlanForm(form), [form])

  function markTouched(field: ValidatedField) {
    setTouchedFields((prev) => (prev[field] ? prev : { ...prev, [field]: true }))
  }

  function visibleValidation(field: ValidatedField) {
    return submitAttempted || touchedFields[field] ? validation.fields[field] : undefined
  }

  async function onGenerate() {
    setSubmitAttempted(true)
    setError(null)
    setLastCopied(false)

    if (validation.hasErrors) {
      setError('请先修正表单中的红色错误，再生成训练计划。')
      return
    }

    setIsGenerating(true)
    await new Promise((r) => setTimeout(r, 450))
    setResult(generateMockPlan(form))
    setIsGenerating(false)
  }

  function onReset() {
    setResult(null)
    setError(null)
    setLastCopied(false)
  }

  return (
    <div className="min-h-screen bg-abyss-gradient">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute -top-32 left-1/2 h-[520px] w-[980px] -translate-x-1/2 rounded-full bg-gradient-radial from-neon-cyan/25 via-neon-blue/10 to-transparent blur-3xl" />
        <div className="absolute bottom-[-240px] right-[-140px] h-[520px] w-[520px] rounded-full bg-gradient-radial from-neon-mint/12 via-neon-cyan/8 to-transparent blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_66%)]" />
      </div>

      <div className="relative mx-auto max-w-[1180px] px-4 py-10 lg:px-6">
        <AppHeader
          current={headerStats.current}
          goal={headerStats.goal}
          ratio={headerStats.ratio}
          error={error}
          isGenerating={isGenerating}
          onGenerate={onGenerate}
        />

        <main className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-6">
            <SectionCard
              title="训练信息输入区"
              subtitle="用于定位你的训练背景与当前水平（Level 5 在 MVP 隐藏）"
              icon={<Activity className="h-5 w-5 text-neon-cyan/90" />}
            >
              <div className="grid gap-4 md:grid-cols-2">
                <FieldRow label="年龄" hint="岁">
                  <NumberInput
                    value={form.age}
                    min={5}
                    max={80}
                    placeholder="例如：12"
                    className={inputTone(visibleValidation('age'))}
                    onBlur={() => markTouched('age')}
                    onChange={(e) => {
                      markTouched('age')
                      setForm((p) => ({ ...p, age: e.target.value === '' ? '' : Number(e.target.value) }))
                    }}
                  />
                  <FieldMessage validation={visibleValidation('age')} />
                </FieldRow>
                <FieldRow label="性别">
                  <Select value={form.gender} onChange={(e) => setForm((p) => ({ ...p, gender: e.target.value as PlanFormState['gender'] }))}>
                    <option value="男">男</option>
                    <option value="女">女</option>
                    <option value="其他">其他</option>
                  </Select>
                </FieldRow>
                <FieldRow label="训练经验" hint="个月">
                  <NumberInput
                    value={form.trainingExperienceMonths}
                    min={0}
                    max={360}
                    placeholder="例如：18"
                    className={inputTone(visibleValidation('trainingExperienceMonths'))}
                    onBlur={() => markTouched('trainingExperienceMonths')}
                    onChange={(e) => {
                      markTouched('trainingExperienceMonths')
                      setForm((p) => ({
                        ...p,
                        trainingExperienceMonths: e.target.value === '' ? '' : Number(e.target.value),
                      }))
                    }}
                  />
                  <FieldMessage validation={visibleValidation('trainingExperienceMonths')} />
                </FieldRow>
                <FieldRow label="游泳水平（Level）">
                  <Select value={form.level} onChange={(e) => setForm((p) => ({ ...p, level: e.target.value as PlanFormState['level'] }))}>
                    <option value="L1">{LEVEL_LABEL.L1}</option>
                    <option value="L2">{LEVEL_LABEL.L2}</option>
                    <option value="L3">{LEVEL_LABEL.L3}</option>
                    <option value="L4">{LEVEL_LABEL.L4}</option>
                  </Select>
                </FieldRow>
              </div>
            </SectionCard>

            <SectionCard
              title="训练目标区"
              subtitle="用于确定专项与目标方向（当前不接入规则引擎）"
              icon={<Target className="h-5 w-5 text-neon-mint/90" />}
            >
              <div className="grid gap-4 md:grid-cols-2">
                <FieldRow label="专项项目">
                  <Select value={form.event} onChange={(e) => setForm((p) => ({ ...p, event: e.target.value as PlanFormState['event'] }))}>
                    {eventOptions.map((x) => (
                      <option key={x.value} value={x.value}>
                        {x.label}
                      </option>
                    ))}
                  </Select>
                </FieldRow>
                <FieldRow label="目标类型（Goal Type）">
                  <Select value={form.goalType} onChange={(e) => setForm((p) => ({ ...p, goalType: e.target.value as GoalType }))}>
                    {goalTypeOptions.map((x) => (
                      <option key={x} value={x}>
                        {x}
                      </option>
                    ))}
                  </Select>
                </FieldRow>
                <FieldRow label="当前成绩" hint={normalizedPreview.current ? `识别为 ${normalizedPreview.current}` : '支持：1分15秒 / 1:15 / 75秒'}>
                  <TextInput
                    value={form.currentTimeInput}
                    className={inputTone(visibleValidation('currentTimeInput'))}
                    onBlur={() => markTouched('currentTimeInput')}
                    onChange={(e) => {
                      markTouched('currentTimeInput')
                      setForm((p) => ({ ...p, currentTimeInput: e.target.value }))
                    }}
                    placeholder="例如：1分15秒"
                  />
                  <FieldMessage validation={visibleValidation('currentTimeInput')} />
                </FieldRow>
                <FieldRow label="目标成绩" hint={normalizedPreview.goal ? `识别为 ${normalizedPreview.goal}` : '支持：1分15秒 / 1:15 / 75秒'}>
                  <TextInput
                    value={form.goalTimeInput}
                    className={inputTone(visibleValidation('goalTimeInput'))}
                    onBlur={() => markTouched('goalTimeInput')}
                    onChange={(e) => {
                      markTouched('goalTimeInput')
                      setForm((p) => ({ ...p, goalTimeInput: e.target.value }))
                    }}
                    placeholder="例如：1:12.50"
                  />
                  <FieldMessage validation={visibleValidation('goalTimeInput')} />
                </FieldRow>
                <FieldRow label="目标日期（Target Date）" hint="YYYY-MM-DD">
                  <input
                    type="date"
                    value={form.targetDate}
                    onBlur={() => markTouched('targetDate')}
                    onChange={(e) => {
                      markTouched('targetDate')
                      setForm((p) => ({ ...p, targetDate: e.target.value }))
                    }}
                    className={`w-full rounded-2xl border bg-white/5 px-4 py-3 text-sm text-white/90 outline-none transition focus:bg-white/7 ${inputTone(visibleValidation('targetDate')) ?? 'border-white/10 focus:border-neon-cyan/40'}`}
                  />
                  <FieldMessage validation={visibleValidation('targetDate')} />
                </FieldRow>
              </div>
            </SectionCard>

            <SectionCard
              title="训练约束区"
              subtitle="用于让训练计划可执行（池长/周量/器材/伤病限制）"
              icon={<Compass className="h-5 w-5 text-neon-blue/90" />}
            >
              <div className="grid gap-4 md:grid-cols-2">
                <FieldRow label="泳池长度">
                  <Select value={form.poolLength} onChange={(e) => setForm((p) => ({ ...p, poolLength: e.target.value as PlanFormState['poolLength'] }))}>
                    <option value="25m">25米池</option>
                    <option value="50m">50米池</option>
                    <option value="25y">25码池</option>
                  </Select>
                </FieldRow>
                <FieldRow label="每周训练量" hint="米">
                  <NumberInput
                    value={form.weeklyDistanceMeters}
                    min={0}
                    max={100000}
                    placeholder="例如：8000"
                    className={inputTone(visibleValidation('weeklyDistanceMeters'))}
                    onBlur={() => markTouched('weeklyDistanceMeters')}
                    onChange={(e) => {
                      markTouched('weeklyDistanceMeters')
                      setForm((p) => ({ ...p, weeklyDistanceMeters: e.target.value === '' ? '' : Number(e.target.value) }))
                    }}
                  />
                  <FieldMessage validation={visibleValidation('weeklyDistanceMeters')} />
                </FieldRow>
                <FieldRow label="每周训练天数" hint="1–7">
                  <NumberInput
                    value={form.trainingDaysPerWeek}
                    min={1}
                    max={7}
                    className={inputTone(visibleValidation('trainingDaysPerWeek'))}
                    onBlur={() => markTouched('trainingDaysPerWeek')}
                    onChange={(e) => {
                      markTouched('trainingDaysPerWeek')
                      setForm((p) => ({ ...p, trainingDaysPerWeek: e.target.value === '' ? '' : Number(e.target.value) }))
                    }}
                  />
                  <FieldMessage validation={visibleValidation('trainingDaysPerWeek')} />
                </FieldRow>
                <FieldRow label="单次训练时间" hint="分钟">
                  <NumberInput
                    value={form.trainingDurationPerSessionMinutes}
                    min={15}
                    max={300}
                    className={inputTone(visibleValidation('trainingDurationPerSessionMinutes'))}
                    onBlur={() => markTouched('trainingDurationPerSessionMinutes')}
                    onChange={(e) => {
                      markTouched('trainingDurationPerSessionMinutes')
                      setForm((p) => ({ ...p, trainingDurationPerSessionMinutes: e.target.value === '' ? '' : Number(e.target.value) }))
                    }}
                  />
                  <FieldMessage validation={visibleValidation('trainingDurationPerSessionMinutes')} />
                </FieldRow>
                <div className="md:col-span-2 space-y-1.5">
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-xs text-white/65">训练器材</span>
                    <span className="text-[11px] text-white/40">可多选</span>
                  </div>
                  <ChipMultiSelect value={form.availableEquipment} options={equipmentOptions} onChange={(next) => setForm((p) => ({ ...p, availableEquipment: next }))} />
                </div>
                <FieldRow label="伤病情况">
                  <Select value={form.injury} onChange={(e) => setForm((p) => ({ ...p, injury: e.target.value as PlanFormState['injury'] }))}>
                    <option value="无">无</option>
                    <option value="肩部">肩部</option>
                    <option value="腰部">腰部</option>
                    <option value="膝关节">膝关节</option>
                    <option value="踝关节">踝关节</option>
                    <option value="其他">其他</option>
                  </Select>
                </FieldRow>
              </div>
            </SectionCard>
          </div>

          <div className="space-y-6">
            <SectionCard title="结果展示区" subtitle="点击“生成训练计划”后显示 Mock 结果（下一阶段接入规则引擎）" icon={<Sparkles className="h-5 w-5 text-neon-cyan/90" />}>
              <ResultsPanel
                form={form}
                result={result}
                lastCopied={lastCopied}
                onReset={onReset}
                onCopied={() => {
                  setLastCopied(true)
                  setTimeout(() => setLastCopied(false), 1400)
                }}
              />
            </SectionCard>

            {validation.hasWarnings ? (
              <div className="rounded-3xl border border-amber-400/30 bg-amber-500/10 px-5 py-4 text-xs leading-6 text-amber-100">
                时间预算提示：请关注表单中的黄色提示。Warning 不会阻止生成训练计划，但建议先确认周量与训练时间是否匹配。
              </div>
            ) : null}

            <div className="rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-xs text-white/55">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-white/45" />
                前端界面阶段不接入规则引擎与 OpenRouter。Mock 结果用于验证信息结构与展示体验。
              </div>
            </div>
          </div>
        </main>

        <footer className="mt-10 flex flex-col gap-2 text-center text-xs text-white/40">
          <div>© {new Date().getFullYear()} 口袋游泳教练 · Pocket Swimming Coach</div>
          <div className="inline-flex items-center justify-center gap-2">
            <span className="inline-flex items-center gap-1">
              <Shield className="h-3.5 w-3.5 text-white/35" />
              专业体系 · 可解释 · 可复制
            </span>
          </div>
        </footer>
      </div>
    </div>
  )
}
