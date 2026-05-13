import { MIDNIGHTS_TRACKS, STORAGE_KEYS } from '~/lib/constants'
import type { CurrentUser, RatingDraft } from '~/types/rating'
import { roundToOne } from '~/lib/utils'

function createInitialDrafts() {
  return MIDNIGHTS_TRACKS.reduce<Record<string, RatingDraft>>((acc, track) => {
    acc[track.id] = {
      trackId: track.id,
      score: 0,
      comment: '',
      touched: false
    }
    return acc
  }, {})
}

export function useRatings() {
  const drafts = useState<Record<string, RatingDraft>>('midnights-rating-drafts', createInitialDrafts)
  const submittedAt = useState<string | null>('midnights-submitted-at', () => null)
  const ready = useState('midnights-ratings-ready', () => false)

  function persist() {
    if (!import.meta.client) {
      return
    }

    localStorage.setItem(STORAGE_KEYS.midnightsDrafts, JSON.stringify(drafts.value))
    if (submittedAt.value) {
      localStorage.setItem(STORAGE_KEYS.midnightsSubmittedAt, submittedAt.value)
    } else {
      localStorage.removeItem(STORAGE_KEYS.midnightsSubmittedAt)
    }
  }

  function loadRatings() {
    if (!import.meta.client || ready.value) {
      return
    }

    const rawDrafts = localStorage.getItem(STORAGE_KEYS.midnightsDrafts)
    if (rawDrafts) {
      try {
        const parsed = JSON.parse(rawDrafts) as Record<string, RatingDraft>
        drafts.value = {
          ...createInitialDrafts(),
          ...parsed
        }
      } catch {
        localStorage.removeItem(STORAGE_KEYS.midnightsDrafts)
      }
    }

    submittedAt.value = localStorage.getItem(STORAGE_KEYS.midnightsSubmittedAt)
    ready.value = true
  }

  function updateRating(trackId: string, patch: Partial<RatingDraft>) {
    const current = drafts.value[trackId] || {
      trackId,
      score: 0,
      comment: '',
      touched: false
    }

    drafts.value = {
      ...drafts.value,
      [trackId]: {
        ...current,
        ...patch,
        score: typeof patch.score === 'number' ? roundToOne(patch.score) : current.score,
        touched: patch.touched ?? current.touched,
        updatedAt: new Date().toISOString()
      }
    }

    persist()
  }

  function submitRatings(_user: CurrentUser) {
    submittedAt.value = new Date().toISOString()
    persist()
  }

  function replaceRatings(nextDrafts: Record<string, RatingDraft>, nextSubmittedAt?: string | null) {
    drafts.value = {
      ...createInitialDrafts(),
      ...nextDrafts
    }

    if (nextSubmittedAt !== undefined) {
      submittedAt.value = nextSubmittedAt
    }

    persist()
  }

  function markSubmitted(value = new Date().toISOString()) {
    submittedAt.value = value
    persist()
  }

  function resetRatings() {
    drafts.value = createInitialDrafts()
    submittedAt.value = null
    persist()
  }

  const completedCount = computed(() =>
    MIDNIGHTS_TRACKS.filter((track) => drafts.value[track.id]?.touched).length
  )

  const completionRatio = computed(() => completedCount.value / MIDNIGHTS_TRACKS.length)
  const canSubmit = computed(() => completedCount.value === MIDNIGHTS_TRACKS.length)

  onMounted(loadRatings)

  return {
    drafts,
    submittedAt,
    ready,
    completedCount,
    completionRatio,
    canSubmit,
    loadRatings,
    updateRating,
    submitRatings,
    replaceRatings,
    markSubmitted,
    resetRatings
  }
}
