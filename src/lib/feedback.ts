export const EXTERNAL_FEEDBACK_URL = 'https://example.com/pocket-swim-coach-feedback'

export type FeedbackAction = 'helpful' | 'improve' | 'suggestion'

export function getFeedbackUrl(action: FeedbackAction) {
  const url = new URL(EXTERNAL_FEEDBACK_URL)
  url.searchParams.set('action', action)
  url.searchParams.set('source', 'results_panel')
  return url.toString()
}
