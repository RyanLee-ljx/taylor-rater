import { DEFAULT_ALBUM_SLUG, getAlbumTracks, normalizeAlbumSlug } from '~/lib/constants'
import { roundToTwo } from '~/lib/utils'
import type { LeaderboardRow, Review } from '~/types/rating'
import type { ComputedRef, Ref } from 'vue'

export function useLeaderboard(albumSlugInput: Ref<string> | ComputedRef<string> | string = DEFAULT_ALBUM_SLUG) {
  const albumSlug = computed(() =>
    normalizeAlbumSlug(typeof albumSlugInput === 'string' ? albumSlugInput : albumSlugInput.value)
  )
  const { user } = useCurrentUser()
  const { drafts, submittedAt } = useRatings(albumSlug)
  const { status, fetchRemoteLeaderboard } = useRemoteRatings()
  const remoteRowsByAlbum = useState<Record<string, LeaderboardRow[]>>('remote-leaderboard-rows-by-album', () => ({}))
  const remoteReviewsByAlbum = useState<Record<string, Record<string, Review[]>>>('remote-review-wall-by-album', () => ({}))
  const remoteLoadedByAlbum = useState<Record<string, boolean>>('remote-leaderboard-loaded-by-album', () => ({}))
  const loading = useState('remote-leaderboard-loading', () => false)

  const currentUserReviews = computed<Review[]>(() => {
    if (!user.value || !submittedAt.value) {
      return []
    }

    return getAlbumTracks(albumSlug.value).map((track) => {
      const draft = drafts.value[track.id]

      return {
        id: `current-${albumSlug.value}-${track.id}`,
        trackId: track.id,
        nickname: user.value?.nickname || '你',
        avatarColor: user.value?.avatarColor || '#d7a4b8',
        score: draft?.score ?? 0,
        comment: draft?.comment.trim() || '只留下了分数，短评等下一轮补上。',
        submittedAt: submittedAt.value || new Date().toISOString(),
        isCurrentUser: true
      }
    })
  })

  const localReviews = computed<Review[]>(() => currentUserReviews.value)

  const localLeaderboard = computed<LeaderboardRow[]>(() => {
    const ranked = getAlbumTracks(albumSlug.value).map((track) => {
      const trackReviews = localReviews.value.filter((review) => review.trackId === track.id)
      const avgScore =
        trackReviews.length > 0
          ? roundToTwo(trackReviews.reduce((sum, review) => sum + review.score, 0) / trackReviews.length)
          : 0

      return {
        ...track,
        avgScore,
        ratingCount: trackReviews.length,
        position: 0,
        label: null
      }
    }).sort((a, b) => {
      if (b.avgScore !== a.avgScore) {
        return b.avgScore - a.avgScore
      }

      if (b.ratingCount !== a.ratingCount) {
        return b.ratingCount - a.ratingCount
      }

      return a.trackNo - b.trackNo
    })

    return ranked.map((row, index) => {
      const position = index + 1
      const hasRatings = row.ratingCount > 0
      const label: LeaderboardRow['label'] = !hasRatings
        ? null
        : position === 1
          ? '仙品'
          : position >= 2 && position <= 5
            ? '✨ 仙乐'
            : null

      return {
        ...row,
        position,
        label
      }
    })
  })

  const leaderboard = computed<LeaderboardRow[]>(() => {
    if (remoteLoadedByAlbum.value[albumSlug.value] && status.value.mode === 'remote') {
      return remoteRowsByAlbum.value[albumSlug.value] || []
    }

    return localLeaderboard.value
  })

  const reviews = computed<Review[]>(() => {
    if (remoteLoadedByAlbum.value[albumSlug.value] && status.value.mode === 'remote') {
      return Object.values(remoteReviewsByAlbum.value[albumSlug.value] || {}).flat()
    }

    return localReviews.value
  })

  function getReviewsForTrack(trackId: string) {
    if (remoteLoadedByAlbum.value[albumSlug.value] && status.value.mode === 'remote') {
      return [...(remoteReviewsByAlbum.value[albumSlug.value]?.[trackId] || [])].sort(
        (a, b) => b.score - a.score || new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
      )
    }

    return localReviews.value
      .filter((review) => review.trackId === trackId)
      .sort((a, b) => b.score - a.score || new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
  }

  async function loadLeaderboard(slugInput = albumSlug.value) {
    const slug = normalizeAlbumSlug(slugInput)
    loading.value = true

    try {
      const remote = await fetchRemoteLeaderboard(slug)
      if (remote) {
        remoteRowsByAlbum.value = {
          ...remoteRowsByAlbum.value,
          [slug]: remote.leaderboard
        }
        remoteReviewsByAlbum.value = {
          ...remoteReviewsByAlbum.value,
          [slug]: remote.reviews
        }
        remoteLoadedByAlbum.value = {
          ...remoteLoadedByAlbum.value,
          [slug]: true
        }
      } else {
        remoteLoadedByAlbum.value = {
          ...remoteLoadedByAlbum.value,
          [slug]: false
        }
      }
    } finally {
      loading.value = false
    }
  }

  return {
    reviews,
    leaderboard,
    loading,
    status,
    remoteLoaded: computed(() => Boolean(remoteLoadedByAlbum.value[albumSlug.value])),
    loadLeaderboard,
    getReviewsForTrack
  }
}
