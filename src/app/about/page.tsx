import Link from 'next/link'
import type { Metadata } from 'next'
import {
  ArrowLeft,
  Gauge,
  Info,
  Layers3,
  Shield,
  Target,
  Waves,
} from 'lucide-react'
import { SectionCard } from '@/components/SectionCard'

export const metadata: Metadata = {
  title: '关于我们 | 口袋游泳教练',
  description: '了解 Pocket Swimming Coach 的训练理念、训练分区、训练阶段与版本信息。',
}

const trainingZones = [
  {
    name: 'Zone 1 恢复 Recovery',
    detail: '低强度恢复与放松，帮助消除疲劳并保持动作质量。',
  },
  {
    name: 'Zone 2 有氧 Aerobic',
    detail: '建立基础耐力与稳定配速，是大多数泳者最重要的基础训练区间。',
  },
  {
    name: 'Zone 3 阈值 Threshold',
    detail: '提高持续输出能力与乳酸耐受，强化中后程能力。',
  },
  {
    name: 'Zone 4 VO2 Max',
    detail: '提高高强度维持能力与最大摄氧，是专项能力升级的重要刺激。',
  },
  {
    name: 'Zone 5 比赛配速 Race Pace',
    detail: '贴近目标项目比赛节奏，帮助适应目标速度与分段策略。',
  },
  {
    name: 'Zone 6 冲刺 Sprint',
    detail: '强调神经速度、爆发力与高速动作控制，适用于短距离与冲刺能力发展。',
  },
]

const trainingPhases = [
  {
    title: 'Base 基础期',
    range: '16 周以上',
    detail: '优先建立有氧能力、动作稳定性与训练节奏，为后续专项提升打基础。',
  },
  {
    title: 'Build 提升期',
    range: '8–16 周',
    detail: '逐步提高关键能力与训练负荷，强化阈值、速度耐力和专项能力储备。',
  },
  {
    title: 'Specific 专项期',
    range: '4–8 周',
    detail: '训练更贴近比赛项目与配速需求，强调专项能力、配速控制与赛段表现。',
  },
  {
    title: 'Taper 调整期',
    range: '4 周以内',
    detail: '降低总量、保留关键刺激，让身体在保持速度感的同时获得恢复与峰值表现。',
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-abyss-gradient">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute -top-32 left-1/2 h-[520px] w-[980px] -translate-x-1/2 rounded-full bg-gradient-radial from-neon-cyan/25 via-neon-blue/10 to-transparent blur-3xl" />
        <div className="absolute bottom-[-240px] left-[-120px] h-[520px] w-[520px] rounded-full bg-gradient-radial from-neon-mint/12 via-neon-cyan/8 to-transparent blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_66%)]" />
      </div>

      <div className="relative mx-auto max-w-[1180px] px-4 py-10 lg:px-6">
        <header className="rounded-3xl border border-white/10 bg-white/5 px-6 py-6 backdrop-blur-xl">
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75 transition hover:bg-white/8 hover:text-white"
              >
                <ArrowLeft className="h-4 w-4 text-neon-cyan/80" />
                返回首页
              </Link>
              <div className="rounded-2xl border border-neon-cyan/20 bg-neon-sheen px-4 py-2 text-xs tracking-[0.2em] text-white/70">
                ABOUT POCKET SWIMMING COACH
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-[linear-gradient(135deg,rgba(0,229,255,0.30),rgba(59,130,246,0.18))] ring-1 ring-white/10 shadow-[0_0_0_1px_rgba(0,229,255,0.20),0_35px_120px_rgba(0,229,255,0.12)]">
                    <Waves className="h-7 w-7 text-white/90" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <h1 className="font-display text-3xl tracking-wide text-white md:text-4xl">口袋游泳教练</h1>
                      <span className="text-xs text-white/45 md:text-sm">Pocket Swimming Coach</span>
                    </div>
                    <p className="mt-1 text-sm text-white/62 md:text-base">你的随身 AI 游泳训练顾问</p>
                  </div>
                </div>

                <p className="max-w-3xl text-sm leading-7 text-white/72 md:text-base">
                  Pocket Swimming Coach 不是随机生成训练内容的通用 AI 工具，而是一套由专业游泳教练思路驱动的、
                  可解释、可复制、可扩展的智能训练规划系统。我们希望让普通游泳爱好者、家长、俱乐部学员和长期训练者，
                  也能获得接近专业教练视角的训练指导。
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-3xl border border-white/10 bg-white/5 px-4 py-4">
                  <div className="text-[11px] uppercase tracking-[0.22em] text-white/42">System</div>
                  <div className="mt-1 font-display text-lg text-white/92">Rule-Based</div>
                  <div className="mt-1 text-xs text-white/56">确定性训练生成逻辑</div>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 px-4 py-4">
                  <div className="text-[11px] uppercase tracking-[0.22em] text-white/42">Knowledge</div>
                  <div className="mt-1 font-display text-lg text-white/92">Zones + Phases</div>
                  <div className="mt-1 text-xs text-white/56">基于标准化训练体系</div>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 px-4 py-4">
                  <div className="text-[11px] uppercase tracking-[0.22em] text-white/42">Vision</div>
                  <div className="mt-1 font-display text-lg text-white/92">Coach in Pocket</div>
                  <div className="mt-1 text-xs text-white/56">面向真实训练场景持续演进</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="mt-8 grid gap-6 lg:grid-cols-[1fr_1fr]">
          <SectionCard
            title="产品理念"
            subtitle="从随机内容生成，升级为专业训练体系构建"
            icon={<Target className="h-5 w-5 text-neon-cyan/90" />}
          >
            <div className="space-y-4 text-sm leading-7 text-white/72">
              <p>
                我们相信，一份真正有价值的训练计划，不只是写出“今天游什么”，而是要建立在项目特点、能力层级、
                周期阶段、训练目标和执行约束之上的专业判断。
              </p>
              <p>
                因此 Pocket Swimming Coach 的核心不是“会生成文本”，而是“会组织训练逻辑”。
                训练分区、训练阶段、模板库、Drill Registry、Error Registry 都会逐步组成一套完整的游泳知识引擎。
              </p>
            </div>
          </SectionCard>

          <SectionCard
            title="Training Zones"
            subtitle="统一的 Zone 1–6 框架，保证计划输出标准化"
            icon={<Gauge className="h-5 w-5 text-neon-mint/90" />}
          >
            <div className="grid gap-3">
              {trainingZones.map((zone) => (
                <div key={zone.name} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <div className="font-display text-sm text-white/92">{zone.name}</div>
                  <p className="mt-1 text-xs leading-6 text-white/62">{zone.detail}</p>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard
            title="Training Phases"
            subtitle="目标日期会驱动周期阶段识别与训练重点变化"
            icon={<Layers3 className="h-5 w-5 text-neon-blue/90" />}
          >
            <div className="grid gap-3">
              {trainingPhases.map((phase) => (
                <div key={phase.title} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="font-display text-sm text-white/92">{phase.title}</div>
                    <div className="rounded-xl border border-white/10 bg-abyss-900/35 px-2.5 py-1 text-[11px] text-white/58">
                      {phase.range}
                    </div>
                  </div>
                  <p className="mt-1 text-xs leading-6 text-white/62">{phase.detail}</p>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard
            title="Disclaimer"
            subtitle="训练计划是参考建议，不替代线下教练与医疗判断"
            icon={<Shield className="h-5 w-5 text-neon-cyan/90" />}
          >
            <div className="space-y-3 text-sm leading-7 text-white/72">
              <p>
                本产品输出的训练计划、技术建议与训练解释，适合作为训练参考与结构化思路支持，
                不构成医疗诊断、康复建议或完整线下执教替代。
              </p>
              <p>
                如存在肩部、腰部、膝关节、踝关节等伤病限制，或正在进行高强度备赛，
                请优先结合专业游泳教练、队医或康复师意见进行调整。
              </p>
            </div>
          </SectionCard>

          <SectionCard
            title="Version Info"
            subtitle="当前 MVP 的能力边界与演进方向"
            icon={<Info className="h-5 w-5 text-neon-mint/90" />}
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <div className="text-[11px] uppercase tracking-[0.22em] text-white/42">Current</div>
                <div className="mt-1 font-display text-base text-white/92">MVP Frontend + Rule-Based V1</div>
                <div className="mt-1 text-xs leading-6 text-white/60">
                  已具备表单输入、结果展示、训练阶段、项目分类、规则生成、Drill Registry 与 Error Registry 基础能力。
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <div className="text-[11px] uppercase tracking-[0.22em] text-white/42">Next</div>
                <div className="mt-1 font-display text-base text-white/92">Explainable Coaching System</div>
                <div className="mt-1 text-xs leading-6 text-white/60">
                  后续将继续接入 Recommended Drills、Common Errors、训练解释增强、视频动作分析与更完整的训练日志系统。
                </div>
              </div>
            </div>
          </SectionCard>
        </main>
      </div>
    </div>
  )
}

