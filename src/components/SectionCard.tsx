import type { ReactNode } from 'react'

export function SectionCard({
  title,
  subtitle,
  icon,
  children,
}: {
  title: string
  subtitle?: string
  icon?: ReactNode
  children: ReactNode
}) {
  return (
    <section className="rounded-3xl border border-white/10 bg-abyss-950/55 backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_25px_80px_rgba(0,0,0,0.55)]">
      <div className="flex items-start gap-3 px-5 py-4 border-b border-white/10">
        <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10">
          {icon}
        </div>
        <div className="min-w-0">
          <h2 className="font-display text-base tracking-wide text-white/95">{title}</h2>
          {subtitle ? <p className="mt-0.5 text-xs text-white/55">{subtitle}</p> : null}
        </div>
      </div>
      <div className="p-5">{children}</div>
    </section>
  )
}

