import type { ChangeEventHandler, ReactNode } from 'react'

function mergeClasses(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(' ')
}

export function Label({ children }: { children: ReactNode }) {
  return <span className="text-xs text-white/65">{children}</span>
}

export function TextInput({
  value,
  onChange,
  onBlur,
  placeholder,
  inputMode,
  className,
}: {
  value: string
  onChange: ChangeEventHandler<HTMLInputElement>
  onBlur?: ChangeEventHandler<HTMLInputElement>
  placeholder?: string
  inputMode?: 'text' | 'numeric' | 'decimal'
  className?: string
}) {
  return (
    <input
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      inputMode={inputMode}
      className={mergeClasses(
        'w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/90 placeholder:text-white/30 outline-none ring-0 transition focus:border-neon-cyan/40 focus:bg-white/7',
        className
      )}
    />
  )
}

export function NumberInput({
  value,
  onChange,
  onBlur,
  placeholder,
  min,
  max,
  className,
}: {
  value: number | ''
  onChange: ChangeEventHandler<HTMLInputElement>
  onBlur?: ChangeEventHandler<HTMLInputElement>
  placeholder?: string
  min?: number
  max?: number
  className?: string
}) {
  return (
    <input
      type="number"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      min={min}
      max={max}
      className={mergeClasses(
        'w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/90 placeholder:text-white/30 outline-none ring-0 transition focus:border-neon-cyan/40 focus:bg-white/7',
        className
      )}
    />
  )
}

export function Select({
  value,
  onChange,
  onBlur,
  children,
  className,
}: {
  value: string
  onChange: ChangeEventHandler<HTMLSelectElement>
  onBlur?: ChangeEventHandler<HTMLSelectElement>
  children: ReactNode
  className?: string
}) {
  return (
    <select
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      className={mergeClasses(
        'w-full appearance-none rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/90 outline-none transition focus:border-neon-cyan/40 focus:bg-white/7',
        className
      )}
    >
      {children}
    </select>
  )
}

export function FieldRow({
  label,
  hint,
  children,
}: {
  label: string
  hint?: string
  children: ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-start justify-between gap-3">
        <Label>{label}</Label>
        {hint ? <span className="text-[11px] text-white/40">{hint}</span> : null}
      </div>
      {children}
    </div>
  )
}
