import Link from 'next/link'
import { ArrowRight, Shield, Waves } from 'lucide-react'

export function AppHeader({
  current,
  goal,
  ratio,
}: {
  current: string
  goal: string
  ratio: string
}) {
  return (
    <header className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/5 px-6 py-6 backdrop-blur-xl">
      <div className="flex items-center justify-end">
        <Link
          href="/about"
          className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/72 transition hover:bg-white/8 hover:text-white"
        >
          关于我们
          <ArrowRight className="h-4 w-4 text-neon-cyan/80" />
        </Link>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-[linear-gradient(135deg,rgba(0,229,255,0.30),rgba(59,130,246,0.18))] ring-1 ring-white/10 shadow-[0_0_0_1px_rgba(0,229,255,0.20),0_35px_120px_rgba(0,229,255,0.12)]">
            <Waves className="h-7 w-7 text-white/90" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <h1 className="font-display text-2xl tracking-wide text-white">口袋游泳教练</h1>
              <span className="text-xs text-white/45">Pocket Swimming Coach</span>
            </div>
            <p className="mt-1 text-sm text-white/60">你的随身 AI 游泳训练顾问（前端界面阶段：Mock 结果展示）</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
            <div className="text-[11px] text-white/45">当前成绩</div>
            <div className="mt-0.5 font-display text-sm text-white/90">{current}</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
            <div className="text-[11px] text-white/45">目标成绩</div>
            <div className="mt-0.5 font-display text-sm text-white/90">{goal}</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
            <div className="text-[11px] text-white/45">差距</div>
            <div className="mt-0.5 font-display text-sm text-white/90">{ratio}</div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs text-white/55">
        <Shield className="h-4 w-4 text-neon-cyan/80" />
        训练计划仅供参考，请结合个人健康状况与教练指导调整。
      </div>
    </header>
  )
}
