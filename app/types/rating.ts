export interface Album {
  slug: string
  title: string
  shortTitle: string
  artist: string
  releaseDate: string
  coverImage: string
  description: string
}

export interface Track {
  id: string
  databaseId?: string
  albumId?: string
  albumSlug: string
  trackNo: number
  title: string
  edition: 'standard' | 'extra'
  isBonus: boolean
  duration?: string
  mood: string
}

export interface RatingDraft {
  trackId: string
  score: number
  comment: string
  touched: boolean
  updatedAt?: string
}

export interface CurrentUser {
  id: string
  albumId?: string
  authUid?: string
  nickname: string
  avatarColor: string
  createdAt: string
  isRemote?: boolean
  remoteProfiles?: Record<string, RemoteUserProfile>
}

export interface RemoteUserProfile {
  id: string
  albumId: string
  authUid: string
  createdAt: string
  submittedAt?: string | null
}

export interface Review {
  id: string
  trackId: string
  nickname: string
  avatarColor: string
  score: number
  comment: string
  submittedAt: string
  isCurrentUser?: boolean
}

export interface LeaderboardRow extends Track {
  avgScore: number
  ratingCount: number
  position: number
  label: '仙品' | '✨ 仙乐' | null
}

export interface DataStatus {
  mode: 'checking' | 'remote' | 'local' | 'error'
  message: string
}
