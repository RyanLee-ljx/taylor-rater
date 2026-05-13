import { MIDNIGHTS_TRACKS } from '~/lib/constants'
import { roundToTwo } from '~/lib/utils'
import type { LeaderboardRow, Review } from '~/types/rating'

export function useLeaderboard() {
  const { user } = useCurrentUser()
  const { drafts, submittedAt } = useRatings()
  const { status, fetchRemoteLeaderboard } = useRemoteRatings()
  const remoteRows = useState<LeaderboardRow[]>('remote-leaderboard-rows', () => [])
  const remoteReviews = useState<Record<string, Review[]>>('remote-review-wall', () => ({}))
  const remoteLoaded = useState('remote-leaderboard-loaded', () => false)
  const loading = useState('remote-leaderboard-loading', () => false)

  const currentUserReviews = computed<Review[]>(() => {
    if (!user.value || !submittedAt.value) {
      return []
    }

    return MIDNIGHTS_TRACKS.map((track) => {
      const draft = drafts.value[track.id]

      return {
        id: `current-${track.id}`,
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
    const ranked = MIDNIGHTS_TRACKS.map((track) => {
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
    if (remoteLoaded.value && status.value.mode === 'remote') {
      return remoteRows.value
    }

    return localLeaderboard.value
  })

  const reviews = computed<Review[]>(() => {
    if (remoteLoaded.value && status.value.mode === 'remote') {
      return Object.values(remoteReviews.value).flat()
    }

    return localReviews.value
  })

  function getReviewsForTrack(trackId: string) {
    if (remoteLoaded.value && status.value.mode === 'remote') {
      return [...(remoteReviews.value[trackId] || [])].sort(
        (a, b) => b.score - a.score || new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
      )
    }

    return localReviews.value
      .filter((review) => review.trackId === trackId)
      .sort((a, b) => b.score - a.score || new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
  }

  async function loadLeaderboard() {
    loading.value = true

    try {
      const remote = await fetchRemoteLeaderboard()
      if (remote) {
        remoteRows.value = remote.leaderboard
        remoteReviews.value = remote.reviews
        remoteLoaded.value = true
      } else {
        remoteLoaded.value = false
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
    remoteLoaded,
    loadLeaderboard,
    getReviewsForTrack
  }
}
