export type Stroke = 'Freestyle' | 'Backstroke' | 'Breaststroke' | 'Butterfly' | 'General'

export type ErrorCategory =
  | 'Body Position'
  | 'Breathing'
  | 'Kick'
  | 'Catch'
  | 'Pull'
  | 'Recovery'
  | 'Timing'
  | 'Coordination'

export type ErrorPattern = {
  id: string

  nameZh: string
  nameEn: string

  stroke: Stroke

  category: ErrorCategory

  symptom: string

  rootCauses: string[]

  performanceImpact: string[]

  correctionPrinciples: string[]

  recommendedDrills: string[]

  relatedErrors?: string[]

  difficulty: 1 | 2 | 3 | 4 | 5
}

