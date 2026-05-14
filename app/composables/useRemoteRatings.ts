import { DEFAULT_ALBUM_SLUG, getAlbumBySlug, getAlbumTracks, normalizeAlbumSlug } from '~/lib/constants'
import { useAppSupabase } from '~/lib/supabase'
import { pickAvatarColor, roundToOne } from '~/lib/utils'
import type { CurrentUser, DataStatus, LeaderboardRow, RatingDraft, RemoteUserProfile, Review, Track } from '~/types/rating'

interface RemoteAlbum {
  id: string
  slug: string
  title: string
}

interface RemoteTrackRow {
  id: string
  album_id: string
  track_no: number
  title: string
  duration_seconds: number | null
  edition: 'standard' | 'extra'
  is_bonus: boolean
}

interface RemoteUserRow {
  id: string
  album_id: string
  auth_uid: string
  nickname: string
  avatar_color: string | null
  submitted_at: string | null
  created_at: string
}

interface RemoteRatingRow {
  track_id: string
  score: number | string
  comment: string | null
  updated_at: string
}

interface RemoteReviewRow {
  track_id: string
  nickname: string
  avatar_color: string | null
  score: number | string
  comment: string | null
  updated_at: string
}

interface RemoteCatalog {
  album: RemoteAlbum
  albumSlug: string
  tracks: Track[]
}

const fallbackStatus: DataStatus = {
  mode: 'local',
  message: '当前使用本地模式：评分会保存在本机浏览器中。'
}

function secondsToDuration(value: number | null) {
  if (!value) {
    return undefined
  }

  const minutes = Math.floor(value / 60)
  const seconds = String(value % 60).padStart(2, '0')
  return `${minutes}:${seconds}`
}

function mergeRemoteTrack(row: RemoteTrackRow, albumSlug: string): Track {
  const local = getAlbumTracks(albumSlug).find(
    (track) => track.trackNo === row.track_no || track.title.toLowerCase() === row.title.toLowerCase()
  )

  return {
    ...(local || {
      id: row.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      albumSlug,
      mood: row.is_bonus ? '额外曲目' : 'Taylor track'
    }),
    databaseId: row.id,
    albumId: row.album_id,
    albumSlug,
    trackNo: row.track_no,
    title: row.title,
    duration: local?.duration || secondsToDuration(row.duration_seconds),
    edition: row.edition || (row.is_bonus ? 'extra' : 'standard'),
    isBonus: row.is_bonus
  }
}

function localTrackFromRemoteId(remoteTrackId: string, catalog: RemoteCatalog | null) {
  return catalog?.tracks.find((track) => track.databaseId === remoteTrackId)
}

function getRemoteProfile(remoteUser: CurrentUser, albumSlug: string, albumId?: string): RemoteUserProfile | null {
  const slug = normalizeAlbumSlug(albumSlug)
  const profile = remoteUser.remoteProfiles?.[slug]
  if (profile) {
    return profile
  }

  if (remoteUser.isRemote && remoteUser.albumId && remoteUser.authUid && (!albumId || remoteUser.albumId === albumId)) {
    return {
      id: remoteUser.id,
      albumId: remoteUser.albumId,
      authUid: remoteUser.authUid,
      createdAt: remoteUser.createdAt
    }
  }

  return null
}

export function useRemoteRatings() {
  const catalogs = useState<Record<string, RemoteCatalog>>('remote-album-catalogs', () => ({}))
  const catalog = computed(() => catalogs.value[DEFAULT_ALBUM_SLUG] || null)
  const status = useState<DataStatus>('remote-ratings-status', () => fallbackStatus)
  const loading = useState('remote-ratings-loading', () => false)

  async function loadCatalog(albumSlugInput = DEFAULT_ALBUM_SLUG) {
    const albumSlug = normalizeAlbumSlug(albumSlugInput)
    const albumMeta = getAlbumBySlug(albumSlug)

    if (catalogs.value[albumSlug]) {
      return catalogs.value[albumSlug]
    }

    const supabase = useAppSupabase()
    if (!supabase) {
      status.value = fallbackStatus
      return null
    }

    const { data: album, error: albumError } = await supabase
      .from('albums')
      .select('id, slug, title')
      .eq('slug', albumSlug)
      .maybeSingle<RemoteAlbum>()

    if (albumError || !album) {
      status.value = {
        mode: 'error',
        message: `Supabase 已连接，但没有找到 ${albumMeta.shortTitle} 专辑数据。请先运行 supabase/seed.sql。`
      }
      return null
    }

    const { data: trackRows, error: tracksError } = await supabase
      .from('tracks')
      .select('id, album_id, track_no, title, duration_seconds, edition, is_bonus')
      .eq('album_id', album.id)
      .order('track_no', { ascending: true })
      .returns<RemoteTrackRow[]>()

    const localTracks = getAlbumTracks(albumSlug)
    if (tracksError || !trackRows?.length) {
      status.value = {
        mode: 'error',
        message: `Supabase 已连接，但 ${albumMeta.shortTitle} 曲目表为空。请确认 tracks 表已插入 ${localTracks.length} 首曲目。`
      }
      return null
    }

    const remoteTitles = new Set(trackRows.map((track) => track.title.toLowerCase()))
    const missingTracks = localTracks.filter((track) => !remoteTitles.has(track.title.toLowerCase()))
    if (missingTracks.length > 0) {
      status.value = {
        mode: 'error',
        message: `Supabase 的 ${albumMeta.shortTitle} 曲目表还缺 ${missingTracks.length} 首：${missingTracks.map((track) => track.title).join('、')}。请重新执行 supabase/seed.sql。`
      }
      return null
    }

    const nextCatalog = {
      album,
      albumSlug,
      tracks: trackRows.map((row) => mergeRemoteTrack(row, albumSlug))
    }
    catalogs.value = {
      ...catalogs.value,
      [albumSlug]: nextCatalog
    }
    status.value = {
      mode: 'remote',
      message: `已连接 Supabase：${albumMeta.shortTitle} 评分会同步到共享榜单。`
    }

    return nextCatalog
  }

  async function ensureSession() {
    const supabase = useAppSupabase()
    if (!supabase) {
      status.value = fallbackStatus
      return null
    }

    const { data: sessionData } = await supabase.auth.getSession()
    if (sessionData.session?.user) {
      return sessionData.session.user
    }

    const { data, error } = await supabase.auth.signInAnonymously()
    if (error || !data.user) {
      status.value = {
        mode: 'error',
        message: 'Supabase 匿名登录未启用。请在 Authentication 里开启 Anonymous sign-ins。'
      }
      return null
    }

    return data.user
  }

  async function syncUser(nickname: string, albumSlugInput = DEFAULT_ALBUM_SLUG) {
    const albumSlug = normalizeAlbumSlug(albumSlugInput)
    const { saveUser } = useCurrentUser()
    const cleanNickname = nickname.trim().slice(0, 24)
    const localUser = saveUser(cleanNickname)
    const remoteCatalog = await loadCatalog(albumSlug)
    const authUser = await ensureSession()
    const supabase = useAppSupabase()

    if (!remoteCatalog || !authUser || !supabase) {
      return localUser
    }

    const avatarColor = localUser.avatarColor || pickAvatarColor(cleanNickname)
    const { data, error } = await supabase
      .from('users')
      .upsert(
        {
          album_id: remoteCatalog.album.id,
          auth_uid: authUser.id,
          nickname: cleanNickname,
          avatar_color: avatarColor
        },
        { onConflict: 'album_id,auth_uid' }
      )
      .select('id, album_id, auth_uid, nickname, avatar_color, submitted_at, created_at')
      .single<RemoteUserRow>()

    if (error || !data) {
      status.value = {
        mode: 'error',
        message: `用户信息同步失败：${error?.message || '未知错误'}`
      }
      return localUser
    }

    return saveUser(data.nickname, {
      albumId: data.album_id,
      authUid: data.auth_uid,
      avatarColor: data.avatar_color || avatarColor,
      isRemote: true,
      remoteProfiles: {
        [albumSlug]: {
          id: data.id,
          albumId: data.album_id,
          authUid: data.auth_uid,
          createdAt: data.created_at,
          submittedAt: data.submitted_at
        }
      }
    })
  }

  async function loadUserRatings(remoteUser: CurrentUser, albumSlugInput = DEFAULT_ALBUM_SLUG) {
    const albumSlug = normalizeAlbumSlug(albumSlugInput)
    const remoteCatalog = await loadCatalog(albumSlug)
    const supabase = useAppSupabase()

    if (!remoteCatalog || !supabase) {
      return null
    }

    const profile = getRemoteProfile(remoteUser, albumSlug, remoteCatalog.album.id)
    if (!profile) {
      return null
    }

    const { data, error } = await supabase
      .from('ratings')
      .select('track_id, score, comment, updated_at')
      .eq('album_id', remoteCatalog.album.id)
      .eq('user_id', profile.id)

    if (error) {
      status.value = {
        mode: 'error',
        message: `读取你的历史评分失败：${error.message}`
      }
      return null
    }

    const ratingRows = (data || []) as RemoteRatingRow[]
    const nextDrafts = ratingRows.reduce<Record<string, RatingDraft>>((acc, row) => {
      const track = localTrackFromRemoteId(row.track_id, remoteCatalog)
      if (!track) {
        return acc
      }

      acc[track.id] = {
        trackId: track.id,
        score: roundToOne(Number(row.score)),
        comment: row.comment || '',
        touched: true,
        updatedAt: row.updated_at
      }
      return acc
    }, {})

    return nextDrafts
  }

  async function submitRemoteRatings(
    remoteUser: CurrentUser,
    drafts: Record<string, RatingDraft>,
    albumSlugInput = DEFAULT_ALBUM_SLUG
  ) {
    const albumSlug = normalizeAlbumSlug(albumSlugInput)
    loading.value = true

    try {
      const remoteCatalog = await loadCatalog(albumSlug)
      const supabase = useAppSupabase()

      if (!remoteCatalog || !supabase) {
        return {
          ok: false,
          message: fallbackStatus.message
        }
      }

      const profile = getRemoteProfile(remoteUser, albumSlug, remoteCatalog.album.id)
      if (!profile) {
        return {
          ok: false,
          message: '尚未为这张专辑同步远端用户，已改用本地提交。'
        }
      }

      const rows = remoteCatalog.tracks.map((track) => {
        const draft = drafts[track.id]

        return {
          album_id: remoteCatalog.album.id,
          user_id: profile.id,
          track_id: track.databaseId,
          score: roundToOne(draft?.score ?? 0),
          comment: draft?.comment?.trim() || null
        }
      })

      const { error: ratingsError } = await supabase
        .from('ratings')
        .upsert(rows, { onConflict: 'album_id,user_id,track_id' })

      if (ratingsError) {
        status.value = {
          mode: 'error',
          message: `提交评分失败：${ratingsError.message}`
        }
        return {
          ok: false,
          message: status.value.message
        }
      }

      const submittedAt = new Date().toISOString()
      const { error: userError } = await supabase
        .from('users')
        .update({ submitted_at: submittedAt, updated_at: submittedAt })
        .eq('id', profile.id)

      if (userError) {
        status.value = {
          mode: 'error',
          message: `评分已提交，但提交时间更新失败：${userError.message}`
        }
      } else {
        status.value = {
          mode: 'remote',
          message: `${getAlbumBySlug(albumSlug).shortTitle} 评分已同步到 Supabase 共享榜单。`
        }
      }

      return {
        ok: true,
        submittedAt,
        message: status.value.message
      }
    } finally {
      loading.value = false
    }
  }

  async function fetchRemoteLeaderboard(albumSlugInput = DEFAULT_ALBUM_SLUG) {
    const albumSlug = normalizeAlbumSlug(albumSlugInput)
    const remoteCatalog = await loadCatalog(albumSlug)
    const supabase = useAppSupabase()

    if (!remoteCatalog || !supabase) {
      return null
    }

    const { data: rows, error: leaderboardError } = await supabase
      .from('album_track_leaderboard')
      .select('album_id, track_id, track_no, title, edition, is_bonus, rating_count, avg_score, position')
      .eq('album_id', remoteCatalog.album.id)
      .order('position', { ascending: true })

    if (leaderboardError || !rows) {
      status.value = {
        mode: 'error',
        message: `读取榜单失败：${leaderboardError?.message || '未知错误'}`
      }
      return null
    }

    const { data: reviewRows, error: reviewError } = await supabase
      .from('track_review_wall')
      .select('album_id, track_id, nickname, avatar_color, score, comment, updated_at')
      .eq('album_id', remoteCatalog.album.id)

    if (reviewError) {
      status.value = {
        mode: 'error',
        message: `读取评价墙失败：${reviewError.message}`
      }
    }

    const leaderboard: LeaderboardRow[] = rows.map((row: any) => {
      const track = localTrackFromRemoteId(row.track_id, remoteCatalog) || mergeRemoteTrack(
        {
          id: row.track_id,
          album_id: row.album_id,
          track_no: row.track_no,
          title: row.title,
          duration_seconds: null,
          edition: row.edition,
          is_bonus: row.is_bonus
        },
        albumSlug
      )
      const position = Number(row.position)
      const ratingCount = Number(row.rating_count || 0)
      const label: LeaderboardRow['label'] =
        ratingCount === 0
          ? null
          : position === 1
            ? '仙品'
            : position >= 2 && position <= 5
              ? '✨ 仙乐'
              : null

      return {
        ...track,
        avgScore: Number(row.avg_score || 0),
        ratingCount,
        position,
        label
      }
    })

    const reviews = ((reviewRows || []) as RemoteReviewRow[]).reduce<Record<string, Review[]>>((acc, row) => {
      const track = localTrackFromRemoteId(row.track_id, remoteCatalog)
      if (!track) {
        return acc
      }

      const review: Review = {
        id: `${row.track_id}-${row.nickname}-${row.updated_at}`,
        trackId: track.id,
        nickname: row.nickname,
        avatarColor: row.avatar_color || '#d7a4b8',
        score: Number(row.score || 0),
        comment: row.comment || '',
        submittedAt: row.updated_at
      }

      acc[track.id] = [...(acc[track.id] || []), review]
      return acc
    }, {})

    status.value = {
      mode: 'remote',
      message: `${getAlbumBySlug(albumSlug).shortTitle} 榜单来自 Supabase 实时数据。`
    }

    return {
      leaderboard,
      reviews
    }
  }

  return {
    catalog,
    catalogs,
    status,
    loading,
    loadCatalog,
    syncUser,
    loadUserRatings,
    submitRemoteRatings,
    fetchRemoteLeaderboard
  }
}
