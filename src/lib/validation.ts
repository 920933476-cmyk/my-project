import type { PlanFormState } from './types'
import { parseTimeInput } from './time'

export type ValidatedField =
  | 'age'
  | 'trainingExperienceMonths'
  | 'currentTimeInput'
  | 'goalTimeInput'
  | 'targetDate'
  | 'weeklyDistanceMeters'
  | 'trainingDaysPerWeek'
  | 'trainingDurationPerSessionMinutes'

export type FieldValidationState = {
  error: string | null
  warning: string | null
}

export type FormValidationResult = {
  fields: Record<ValidatedField, FieldValidationState>
  hasErrors: boolean
  hasWarnings: boolean
  parsedTimes: {
    current: ReturnType<typeof parseTimeInput>
    goal: ReturnType<typeof parseTimeInput>
  }
}

function emptyFieldState(): FieldValidationState {
  return { error: null, warning: null }
}

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

function isNumberInRange(value: number, min: number, max: number) {
  return Number.isFinite(value) && value >= min && value <= max
}

function buildTimeBudgetWarning(form: PlanFormState) {
  if (
    form.weeklyDistanceMeters === '' ||
    form.trainingDaysPerWeek === '' ||
    form.trainingDurationPerSessionMinutes === '' ||
    form.weeklyDistanceMeters === 0
  ) {
    return null
  }

  const weeklyMinutes = form.trainingDaysPerWeek * form.trainingDurationPerSessionMinutes
  if (weeklyMinutes <= 0) return null

  const distancePerMinute = form.weeklyDistanceMeters / weeklyMinutes

  if (distancePerMinute > 55) {
    return '当前周训练量相对训练时间偏高，可能超出可执行范围，请检查周量或时间预算。'
  }

  if (distancePerMinute < 8) {
    return '当前周训练量相对训练时间偏低，建议确认目标周量是否与训练时间预算匹配。'
  }

  return null
}

export function validatePlanForm(form: PlanFormState, now = new Date()): FormValidationResult {
  const fields: Record<ValidatedField, FieldValidationState> = {
    age: emptyFieldState(),
    trainingExperienceMonths: emptyFieldState(),
    currentTimeInput: emptyFieldState(),
    goalTimeInput: emptyFieldState(),
    targetDate: emptyFieldState(),
    weeklyDistanceMeters: emptyFieldState(),
    trainingDaysPerWeek: emptyFieldState(),
    trainingDurationPerSessionMinutes: emptyFieldState(),
  }

  if (form.age === '') {
    fields.age.error = '请输入年龄。'
  } else if (!isNumberInRange(form.age, 5, 80)) {
    fields.age.error = '年龄需在 5 到 80 岁之间。'
  }

  if (form.trainingExperienceMonths === '') {
    fields.trainingExperienceMonths.error = '请输入训练经验。'
  } else if (!isNumberInRange(form.trainingExperienceMonths, 0, 600)) {
    fields.trainingExperienceMonths.error = '训练经验需为 0 到 600 个月之间。'
  }

  const current = parseTimeInput(form.currentTimeInput)
  const goal = parseTimeInput(form.goalTimeInput)

  if (!form.currentTimeInput.trim()) {
    fields.currentTimeInput.error = '请输入当前成绩。'
  } else if (!current) {
    fields.currentTimeInput.error = '成绩格式无法识别，请使用：1分15秒 / 1:15 / 75秒 / 1:15.20。'
  }

  if (!form.goalTimeInput.trim()) {
    fields.goalTimeInput.error = '请输入目标成绩。'
  } else if (!goal) {
    fields.goalTimeInput.error = '成绩格式无法识别，请使用：1分15秒 / 1:15 / 75秒 / 1:15.20。'
  }

  if (current && goal && goal.secondsTotal >= current.secondsTotal) {
    fields.goalTimeInput.error = '目标成绩必须优于当前成绩。'
  }

  if (!form.targetDate) {
    fields.targetDate.error = '请选择目标日期。'
  } else {
    const parsedTargetDate = new Date(`${form.targetDate}T00:00:00`)
    if (Number.isNaN(parsedTargetDate.getTime())) {
      fields.targetDate.error = '目标日期格式无效。'
    } else if (parsedTargetDate <= startOfDay(now)) {
      fields.targetDate.error = '目标日期必须晚于今天。'
    }
  }

  if (form.weeklyDistanceMeters === '') {
    fields.weeklyDistanceMeters.error = '请输入每周训练量。'
  } else if (!isNumberInRange(form.weeklyDistanceMeters, 0, 100000)) {
    fields.weeklyDistanceMeters.error = '每周训练量需在 0 到 100000 米之间。'
  }

  if (form.trainingDaysPerWeek === '') {
    fields.trainingDaysPerWeek.error = '请输入每周训练天数。'
  } else if (!isNumberInRange(form.trainingDaysPerWeek, 1, 7)) {
    fields.trainingDaysPerWeek.error = '每周训练天数需在 1 到 7 天之间。'
  }

  if (form.trainingDurationPerSessionMinutes === '') {
    fields.trainingDurationPerSessionMinutes.error = '请输入单次训练时间。'
  } else if (!isNumberInRange(form.trainingDurationPerSessionMinutes, 15, 300)) {
    fields.trainingDurationPerSessionMinutes.error = '单次训练时间需在 15 到 300 分钟之间。'
  }

  if (!fields.weeklyDistanceMeters.error && !fields.trainingDaysPerWeek.error && !fields.trainingDurationPerSessionMinutes.error) {
    fields.weeklyDistanceMeters.warning = buildTimeBudgetWarning(form)
  }

  const hasErrors = Object.values(fields).some((field) => field.error)
  const hasWarnings = Object.values(fields).some((field) => field.warning)

  return {
    fields,
    hasErrors,
    hasWarnings,
    parsedTimes: {
      current,
      goal,
    },
  }
}

