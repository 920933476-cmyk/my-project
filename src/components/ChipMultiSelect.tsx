import type { ReactNode } from 'react'

export function ChipMultiSelect<T extends string>({
  value,
  options,
  onChange,
  renderLabel,
}: {
  value: T[]
  options: T[]
  onChange: (next: T[]) => void
  renderLabel?: (v: T) => ReactNode
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const active = value.includes(opt)
        return (
          <button
            key={opt}
            type="button"
            onClick={() => {
              if (active) onChange(value.filter((x) => x !== opt))
              else onChange([...value, opt])
            }}
            className={[
              'rounded-2xl px-3 py-2 text-xs transition',
              active
                ? 'bg-[linear-gradient(90deg,rgba(0,229,255,0.22),rgba(59,130,246,0.18))] text-white ring-1 ring-neon-cyan/30 shadow-[0_0_0_1px_rgba(0,229,255,0.18)]'
                : 'bg-white/5 text-white/65 ring-1 ring-white/10 hover:bg-white/7 hover:text-white/80',
            ].join(' ')}
          >
            {renderLabel ? renderLabel(opt) : opt}
          </button>
        )
      })}
    </div>
  )
}

