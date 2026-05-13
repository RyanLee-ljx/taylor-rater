import { MIDNIGHTS_TRACKS, SAMPLE_REVIEWS } from '~/lib/constants'
import { roundToTwo } from '~/lib/utils'
import type { LeaderboardRow, Review } from '~/types/rating'

export function useLeaderboard() {
  const { user } = useCurrentUser()
  const { drafts, submittedAt } = useRatings()

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

  const reviews = computed<Review[]>(() => [...SAMPLE_REVIEWS, ...currentUserReviews.value])

  const leaderboard = computed<LeaderboardRow[]>(() => {
    const ranked = MIDNIGHTS_TRACKS.map((track) => {
      const trackReviews = reviews.value.filter((review) => review.trackId === track.id)
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
      return {
        ...row,
        position,
        label: position === 1 ? '仙品' : position >= 2 && position <= 5 ? '✨ 仙乐' : null
      }
    })
  })

  function getReviewsForTrack(trackId: string) {
    return reviews.value
      .filter((review) => review.trackId === trackId)
      .sort((a, b) => b.score - a.score || new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
  }

  return {
    reviews,
    leaderboard,
    getReviewsForTrack
  }
}
