import { ERROR_REGISTRY } from './errorRegistry'
import type { ErrorPattern } from './types'

const KEYWORD_ALIASES: Record<string, string[]> = {
  沉腿: ['腿部下沉', '腿下沉', 'legs sinking'],
  腿下沉: ['腿部下沉', 'legs sinking'],
  低肘: ['肘部下沉', 'dropped elbow'],
  换气: ['换气', '呼吸', 'breathing'],
  抬头: ['头部过高', '过度抬头换气', '抬头'],
  憋气: ['憋气', 'holding breath'],
  交叉入水: ['交叉入水', 'cross over'],
  打腿: ['打腿', 'kick'],
}

function normalizeText(value: string) {
  return value.trim().toLowerCase()
}

function expandKeywords(keyword: string) {
  const normalized = normalizeText(keyword)
  const aliases = KEYWORD_ALIASES[keyword] ?? KEYWORD_ALIASES[normalized] ?? []
  return Array.from(new Set([normalized, ...aliases.map(normalizeText)]))
}

function searchableTexts(error: ErrorPattern) {
  return [
    error.id,
    error.nameZh,
    error.nameEn,
    error.stroke,
    error.category,
    error.symptom,
    ...error.rootCauses,
    ...error.performanceImpact,
    ...error.correctionPrinciples,
    ...error.recommendedDrills,
    ...(error.relatedErrors ?? []),
  ].map(normalizeText)
}

function scoreError(error: ErrorPattern, keywords: string[]) {
  const haystack = searchableTexts(error)
  let score = 0

  for (const keyword of keywords) {
    if (!keyword) continue
    if (normalizeText(error.nameZh).includes(keyword)) score += 6
    if (normalizeText(error.nameEn).includes(keyword)) score += 5
    if (normalizeText(error.category).includes(keyword)) score += 4
    if (normalizeText(error.symptom).includes(keyword)) score += 3
    if (haystack.some((field) => field.includes(keyword))) score += 1
  }

  return score
}

export function searchError(keyword: string): ErrorPattern[] {
  const keywords = expandKeywords(keyword).filter(Boolean)
  if (keywords.length === 0) return []

  return ERROR_REGISTRY.filter((error) => scoreError(error, keywords) > 0)
    .slice()
    .sort((a, b) => {
      const scoreA = scoreError(a, keywords)
      const scoreB = scoreError(b, keywords)
      if (scoreA !== scoreB) return scoreB - scoreA
      if (a.difficulty !== b.difficulty) return a.difficulty - b.difficulty
      return a.id.localeCompare(b.id)
    })
}

