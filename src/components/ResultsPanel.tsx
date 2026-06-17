import type { ReactNode } from 'react'
import { Activity, ClipboardCopy, Dumbbell, MessageCircle, RefreshCcw, Shield, Sparkles, Target, ThumbsDown, ThumbsUp, Waves } from 'lucide-react'
import type { PlanFormState, TrainingPlanResult, TrainingSet } from '@/lib/types'
import { toPlainText } from '@/lib/mockPlan'
import { getFeedbackUrl } from '@/lib/feedback'

function fmtMeters(m: number) {
  return `${m.toLocaleString('zh-CN')}m`
}

function renderSetLabel(set: TrainingPlanResult['weeklyTrainingPlan'][number]['blocks'][number]['sets'][number]) {
  const s = set as TrainingSet
  return {
    title: `${s.repetitions}×${s.distanceMeters}m ${s.stroke}`,
    meta: [`Drill：${s.drillName}`, `Zone ${s.zone}`, `心率 ${s.heartRateRange}`, `出发间隔 ${s.sendOffIntervalSeconds}秒`].join('｜'),
    subMeta: [`配速 ${s.paceTarget}`, `间歇 ${s.restSeconds}秒`, `预计训练时长 ${Math.round(s.estimatedDurationSeconds / 60)} 分钟`, `RPE ${s.rpe}`].join('｜'),
    note: s.note ?? s.techniqueCues[0] ?? null,
  }
}

function ResultBlock({
  title,
  icon,
  children,
}: {
  title: string
  icon: ReactNode
  children: ReactNode
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-abyss-950/40 backdrop-blur">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10">
            {icon}
          </div>
          <div className="font-display text-sm text-white/92">{title}</div>
        </div>
      </div>
      <div className="p-4">{children}</div>
    </div>
  )
}

export function ResultsPanel({
  form,
  result,
  lastCopied,
  isGenerating,
  onBackToForm,
  onRegenerate,
  onReset,
  onCopied,
}: {
  form: PlanFormState
  result: TrainingPlanResult | null
  lastCopied: boolean
  isGenerating: boolean
  onBackToForm: () => void
  onRegenerate: () => void
  onReset: () => void
  onCopied: () => void
}) {
  async function onCopy() {
    if (!result) return
    await navigator.clipboard.writeText(toPlainText(form, result))
    onCopied()
  }

  if (!result) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/5 px-5 py-6">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10">
            <Sparkles className="h-5 w-5 text-neon-cyan/80" />
          </div>
          <div>
            <div className="font-display text-sm text-white/90">等待生成</div>
            <div className="mt-1 text-sm text-white/55">填写左侧信息后点击“生成训练计划”。当前版本仅展示 Mock 结果结构。</div>
          </div>
        </div>
        <div className="mt-4 rounded-2xl border border-white/10 bg-abyss-900/20 px-4 py-3 text-xs text-white/60">
          成绩输入支持：1分15秒 / 1:15 / 75秒 / 1:15.20
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
        <button
          type="button"
          onClick={onBackToForm}
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white/80 transition hover:bg-white/7 hover:text-white"
        >
          <Target className="h-4 w-4 text-neon-blue/80" />
          返回修改
        </button>
        <button
          type="button"
          onClick={onRegenerate}
          disabled={isGenerating}
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white/80 transition hover:bg-white/7 hover:text-white disabled:opacity-70"
        >
          <RefreshCcw className="h-4 w-4 text-neon-cyan/80" />
          {isGenerating ? '生成中…' : '重新生成'}
        </button>
        <button
          type="button"
          onClick={onCopy}
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white/80 transition hover:bg-white/7 hover:text-white"
        >
          <ClipboardCopy className="h-4 w-4 text-neon-cyan/80" />
          {lastCopied ? '已复制' : '复制训练计划'}
        </button>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white/70 transition hover:bg-white/7 hover:text-white"
        >
          <RefreshCcw className="h-4 w-4 text-white/70" />
          清空结果
        </button>
      </div>

      <div className="grid gap-3">
        <ResultBlock title="训练概览" icon={<Activity className="h-4 w-4 text-neon-cyan/80" />}>
          <ul className="space-y-2 text-sm text-white/78">
            {result.trainingSummary.map((x) => (
              <li key={x} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-neon-cyan/70" />
                <span>{x}</span>
              </li>
            ))}
          </ul>
        </ResultBlock>

        <ResultBlock title="推荐周量" icon={<Target className="h-4 w-4 text-neon-mint/80" />}>
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="text-xs text-white/55">Recommended Weekly Volume</div>
              <div className="mt-1 font-display text-2xl text-white">{fmtMeters(result.recommendedWeeklyVolumeMeters)}</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/60">
              当前为 Mock 结果，后续由规则引擎精细化计算
            </div>
          </div>
        </ResultBlock>

        <ResultBlock title="训练分区（Zone 1–6）" icon={<Shield className="h-4 w-4 text-neon-blue/80" />}>
          <div className="space-y-3">
            {result.trainingZones.map((z) => (
              <div key={z.zoneId} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="font-display text-sm text-white/95">
                    Zone {z.zoneId}｜{z.nameZh}
                  </div>
                  <div className="text-[11px] text-white/45">{z.nameEn}</div>
                </div>
                <div className="mt-1 text-xs text-white/60">{z.purpose}</div>
                <div className="mt-2 text-xs text-white/70">{z.intensityHint}</div>
                <div className="mt-2 grid gap-2 text-[11px] text-white/58 md:grid-cols-2">
                  <div>建议心率：{z.hrHint}</div>
                  <div>建议休息：{z.restSuggestion}</div>
                  <div>配速建议：{z.paceSuggestion}</div>
                  <div>预计训练时间：{z.estimatedDurationHint}</div>
                </div>
              </div>
            ))}
          </div>
        </ResultBlock>

        <ResultBlock title="周训练计划" icon={<Waves className="h-4 w-4 text-neon-cyan/80" />}>
          <div className="space-y-3">
            {result.weeklyTrainingPlan.map((s) => (
              <div key={s.dayIndex} className="rounded-3xl border border-white/10 bg-white/5 px-4 py-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="font-display text-sm text-white/95">{s.title}</div>
                    <div className="mt-0.5 text-xs text-white/55">{s.focus}</div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/75">
                      总量 {fmtMeters(s.totalMeters)}
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/75">
                      预计训练时长 {s.estimatedDurationMinutes} 分钟
                    </div>
                  </div>
                </div>
                <div className="mt-3 space-y-3">
                  {s.blocks.map((b) => (
                    <div key={b.label} className="rounded-2xl border border-white/10 bg-abyss-900/25 px-3 py-3">
                      <div className="text-xs text-white/80">
                        {b.label}
                        {b.zone ? <span className="ml-2 text-white/40">Zone {b.zone}</span> : null}
                      </div>
                      <ul className="mt-2 space-y-1.5 text-xs text-white/65">
                        {b.sets.map((x, index) => {
                          const rendered = renderSetLabel(x)
                          return (
                            <li key={`${b.label}-${index}`} className="flex items-start gap-2">
                              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/35" />
                              <div className="min-w-0">
                                <div className="text-sm text-white/82">{rendered.title}</div>
                                <div className="mt-1 text-[11px] leading-5 text-white/58">{rendered.meta}</div>
                                <div className="mt-1 text-[11px] leading-5 text-white/50">{rendered.subMeta}</div>
                                {rendered.note ? (
                                  <div className="mt-1 text-[11px] leading-5 text-neon-cyan/72">{rendered.note}</div>
                                ) : null}
                              </div>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ResultBlock>

        <ResultBlock title="技术重点" icon={<Target className="h-4 w-4 text-neon-cyan/80" />}>
          <ul className="space-y-2 text-sm text-white/78">
            {result.technicalFocus.map((x) => (
              <li key={x} className="flex items-start gap-2">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-neon-cyan/70" />
                <span>{x}</span>
              </li>
            ))}
          </ul>
        </ResultBlock>

        <ResultBlock title="陆上力量训练" icon={<Dumbbell className="h-4 w-4 text-neon-mint/80" />}>
          <ul className="space-y-2 text-sm text-white/78">
            {result.drylandTrainingAdvice.map((x) => (
              <li key={x} className="flex items-start gap-2">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-neon-mint/70" />
                <span>{x}</span>
              </li>
            ))}
          </ul>
        </ResultBlock>

        <ResultBlock title="恢复建议" icon={<Shield className="h-4 w-4 text-neon-blue/80" />}>
          <ul className="space-y-2 text-sm text-white/78">
            {result.recoveryAdvice.map((x) => (
              <li key={x} className="flex items-start gap-2">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-neon-blue/70" />
                <span>{x}</span>
              </li>
            ))}
          </ul>
        </ResultBlock>

        <ResultBlock title="为什么这样安排" icon={<Shield className="h-4 w-4 text-neon-cyan/80" />}>
          <ul className="space-y-2 text-sm text-white/78">
            {result.whyThisPlan.map((x) => (
              <li key={x} className="flex items-start gap-2">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-white/45" />
                <span>{x}</span>
              </li>
            ))}
          </ul>
        </ResultBlock>
      </div>

      <div className="rounded-3xl border border-white/10 bg-abyss-950/40 p-4 backdrop-blur">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10">
              <MessageCircle className="h-5 w-5 text-neon-cyan/80" />
            </div>
            <div>
              <div className="font-display text-sm text-white/92">帮助我们优化 AI 教练</div>
              <div className="mt-1 text-xs text-white/55">你的反馈会帮助我们更快迭代训练模板与解释模块。</div>
            </div>
          </div>
          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
            <a
              href={getFeedbackUrl('helpful')}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white/80 transition hover:bg-white/7 hover:text-white sm:w-auto"
            >
              <ThumbsUp className="h-4 w-4 text-neon-mint/80" />
              👍 很有帮助
            </a>
            <a
              href={getFeedbackUrl('improve')}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white/80 transition hover:bg-white/7 hover:text-white sm:w-auto"
            >
              <ThumbsDown className="h-4 w-4 text-neon-blue/80" />
              👎 需要改进
            </a>
            <a
              href={getFeedbackUrl('suggestion')}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white/80 transition hover:bg-white/7 hover:text-white sm:w-auto"
            >
              <MessageCircle className="h-4 w-4 text-neon-cyan/80" />
              💬 提交建议
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
