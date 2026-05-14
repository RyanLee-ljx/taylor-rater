import { DEFAULT_ALBUM_SLUG, getAlbumTracks, getRatingStorageKeys, normalizeAlbumSlug } from '~/lib/constants'
import type { CurrentUser, RatingDraft } from '~/types/rating'
import { roundToOne } from '~/lib/utils'
import type { ComputedRef, Ref } from 'vue'

function createInitialDrafts(albumSlug: string) {
  return getAlbumTracks(albumSlug).reduce<Record<string, RatingDraft>>((acc, track) => {
    acc[track.id] = {
      trackId: track.id,
      score: 0,
      comment: '',
      touched: false
    }
    return acc
  }, {})
}

export function useRatings(albumSlugInput: Ref<string> | ComputedRef<string> | string = DEFAULT_ALBUM_SLUG) {
  const albumSlug = computed(() =>
    normalizeAlbumSlug(typeof albumSlugInput === 'string' ? albumSlugInput : albumSlugInput.value)
  )
  const draftsByAlbum = useState<Record<string, Record<string, RatingDraft>>>('rating-drafts-by-album', () => ({}))
  const submittedAtByAlbum = useState<Record<string, string | null>>('rating-submitted-at-by-album', () => ({}))
  const readyByAlbum = useState<Record<string, boolean>>('ratings-ready-by-album', () => ({}))

  function ensureAlbumState(slug = albumSlug.value) {
    const normalizedSlug = normalizeAlbumSlug(slug)

    if (!draftsByAlbum.value[normalizedSlug]) {
      draftsByAlbum.value = {
        ...draftsByAlbum.value,
        [normalizedSlug]: createInitialDrafts(normalizedSlug)
      }
    }

    if (!(normalizedSlug in submittedAtByAlbum.value)) {
      submittedAtByAlbum.value = {
        ...submittedAtByAlbum.value,
        [normalizedSlug]: null
      }
    }
  }

  function persist(slug = albumSlug.value) {
    if (!import.meta.client) {
      return
    }

    const normalizedSlug = normalizeAlbumSlug(slug)
    ensureAlbumState(normalizedSlug)

    const storageKeys = getRatingStorageKeys(normalizedSlug)
    localStorage.setItem(storageKeys.drafts, JSON.stringify(draftsByAlbum.value[normalizedSlug]))

    const submittedAt = submittedAtByAlbum.value[normalizedSlug]
    if (submittedAt) {
      localStorage.setItem(storageKeys.submittedAt, submittedAt)
    } else {
      localStorage.removeItem(storageKeys.submittedAt)
    }
  }

  function loadRatings(slug = albumSlug.value) {
    if (!import.meta.client) {
      return
    }

    const normalizedSlug = normalizeAlbumSlug(slug)
    if (readyByAlbum.value[normalizedSlug]) {
      return
    }

    ensureAlbumState(normalizedSlug)

    const storageKeys = getRatingStorageKeys(normalizedSlug)
    const rawDrafts = localStorage.getItem(storageKeys.drafts)
    if (rawDrafts) {
      try {
        const parsed = JSON.parse(rawDrafts) as Record<string, RatingDraft>
        draftsByAlbum.value = {
          ...draftsByAlbum.value,
          [normalizedSlug]: {
            ...createInitialDrafts(normalizedSlug),
            ...parsed
          }
        }
      } catch {
        localStorage.removeItem(storageKeys.drafts)
      }
    }

    submittedAtByAlbum.value = {
      ...submittedAtByAlbum.value,
      [normalizedSlug]: localStorage.getItem(storageKeys.submittedAt)
    }
    readyByAlbum.value = {
      ...readyByAlbum.value,
      [normalizedSlug]: true
    }
  }

  function updateRating(trackId: string, patch: Partial<RatingDraft>) {
    const slug = albumSlug.value
    ensureAlbumState(slug)

    const albumDrafts = draftsByAlbum.value[slug]
    const current = albumDrafts[trackId] || {
      trackId,
      score: 0,
      comment: '',
      touched: false
    }

    draftsByAlbum.value = {
      ...draftsByAlbum.value,
      [slug]: {
        ...albumDrafts,
        [trackId]: {
          ...current,
          ...patch,
          score: typeof patch.score === 'number' ? roundToOne(patch.score) : current.score,
          touched: patch.touched ?? current.touched,
          updatedAt: new Date().toISOString()
        }
      }
    }

    persist(slug)
  }

  function submitRatings(_user: CurrentUser) {
    const slug = albumSlug.value
    submittedAtByAlbum.value = {
      ...submittedAtByAlbum.value,
      [slug]: new Date().toISOString()
    }
    persist(slug)
  }

  function replaceRatings(nextDrafts: Record<string, RatingDraft>, nextSubmittedAt?: string | null) {
    const slug = albumSlug.value
    draftsByAlbum.value = {
      ...draftsByAlbum.value,
      [slug]: {
        ...createInitialDrafts(slug),
        ...nextDrafts
      }
    }

    if (nextSubmittedAt !== undefined) {
      submittedAtByAlbum.value = {
        ...submittedAtByAlbum.value,
        [slug]: nextSubmittedAt
      }
    }

    persist(slug)
  }

  function markSubmitted(value = new Date().toISOString()) {
    const slug = albumSlug.value
    submittedAtByAlbum.value = {
      ...submittedAtByAlbum.value,
      [slug]: value
    }
    persist(slug)
  }

  function resetRatings() {
    const slug = albumSlug.value
    draftsByAlbum.value = {
      ...draftsByAlbum.value,
      [slug]: createInitialDrafts(slug)
    }
    submittedAtByAlbum.value = {
      ...submittedAtByAlbum.value,
      [slug]: null
    }
    persist(slug)
  }

  const drafts = computed(() => {
    ensureAlbumState(albumSlug.value)
    return draftsByAlbum.value[albumSlug.value]
  })
  const submittedAt = computed(() => submittedAtByAlbum.value[albumSlug.value] || null)
  const ready = computed(() => Boolean(readyByAlbum.value[albumSlug.value]))
  const completedCount = computed(() =>
    getAlbumTracks(albumSlug.value).filter((track) => drafts.value[track.id]?.touched).length
  )
  const completionRatio = computed(() => {
    const trackCount = getAlbumTracks(albumSlug.value).length
    return trackCount === 0 ? 0 : completedCount.value / trackCount
  })
  const canSubmit = computed(() => completedCount.value === getAlbumTracks(albumSlug.value).length)

  onMounted(() => loadRatings())

  watch(albumSlug, (nextSlug) => {
    loadRatings(nextSlug)
  })

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
