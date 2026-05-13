import type { Review, Track } from '~/types/rating'

export const MIDNIGHTS_ALBUM = {
  slug: 'midnights',
  title: 'Midnights',
  artist: 'Taylor Swift',
  releaseDate: '2022-10-21',
  description:
    '一场适合深夜好友局的曲目评分：给每首歌留下 0.0 到 10.0 分，以及一句你当下的短评。'
}

export const MIDNIGHTS_TRACKS: Track[] = [
  {
    id: 'lavender-haze',
    albumSlug: 'midnights',
    trackNo: 1,
    title: 'Lavender Haze',
    edition: 'standard',
    isBonus: false,
    duration: '3:22',
    mood: '朦胧开场'
  },
  {
    id: 'maroon',
    albumSlug: 'midnights',
    trackNo: 2,
    title: 'Maroon',
    edition: 'standard',
    isBonus: false,
    duration: '3:38',
    mood: '酒红色回忆'
  },
  {
    id: 'anti-hero',
    albumSlug: 'midnights',
    trackNo: 3,
    title: 'Anti-Hero',
    edition: 'standard',
    isBonus: false,
    duration: '3:20',
    mood: '自嘲式流行'
  },
  {
    id: 'snow-on-the-beach',
    albumSlug: 'midnights',
    trackNo: 4,
    title: 'Snow On The Beach',
    edition: 'standard',
    isBonus: false,
    duration: '4:16',
    mood: '冷调梦境'
  },
  {
    id: 'youre-on-your-own-kid',
    albumSlug: 'midnights',
    trackNo: 5,
    title: "You're On Your Own, Kid",
    edition: 'standard',
    isBonus: false,
    duration: '3:14',
    mood: '成长切片'
  },
  {
    id: 'midnight-rain',
    albumSlug: 'midnights',
    trackNo: 6,
    title: 'Midnight Rain',
    edition: 'standard',
    isBonus: false,
    duration: '2:54',
    mood: '午夜回声'
  },
  {
    id: 'question',
    albumSlug: 'midnights',
    trackNo: 7,
    title: 'Question...?',
    edition: 'standard',
    isBonus: false,
    duration: '3:30',
    mood: '闪回追问'
  },
  {
    id: 'vigilante-shit',
    albumSlug: 'midnights',
    trackNo: 8,
    title: 'Vigilante Shit',
    edition: 'standard',
    isBonus: false,
    duration: '2:44',
    mood: '冷脸暗涌'
  },
  {
    id: 'bejeweled',
    albumSlug: 'midnights',
    trackNo: 9,
    title: 'Bejeweled',
    edition: 'standard',
    isBonus: false,
    duration: '3:14',
    mood: '亮片复苏'
  },
  {
    id: 'labyrinth',
    albumSlug: 'midnights',
    trackNo: 10,
    title: 'Labyrinth',
    edition: 'standard',
    isBonus: false,
    duration: '4:07',
    mood: '悬浮失重'
  },
  {
    id: 'karma',
    albumSlug: 'midnights',
    trackNo: 11,
    title: 'Karma',
    edition: 'standard',
    isBonus: false,
    duration: '3:24',
    mood: '轻盈回击'
  },
  {
    id: 'sweet-nothing',
    albumSlug: 'midnights',
    trackNo: 12,
    title: 'Sweet Nothing',
    edition: 'standard',
    isBonus: false,
    duration: '3:08',
    mood: '温柔留白'
  },
  {
    id: 'mastermind',
    albumSlug: 'midnights',
    trackNo: 13,
    title: 'Mastermind',
    edition: 'standard',
    isBonus: false,
    duration: '3:11',
    mood: '收束告白'
  },
  {
    id: 'the-great-war',
    albumSlug: 'midnights',
    trackNo: 14,
    title: 'The Great War',
    edition: 'extra',
    isBonus: true,
    duration: '4:00',
    mood: '战后回望'
  },
  {
    id: 'bigger-than-the-whole-sky',
    albumSlug: 'midnights',
    trackNo: 15,
    title: 'Bigger Than The Whole Sky',
    edition: 'extra',
    isBonus: true,
    duration: '3:38',
    mood: '空旷哀悼'
  },
  {
    id: 'paris',
    albumSlug: 'midnights',
    trackNo: 16,
    title: 'Paris',
    edition: 'extra',
    isBonus: true,
    duration: '3:16',
    mood: '粉色逃离'
  },
  {
    id: 'high-infidelity',
    albumSlug: 'midnights',
    trackNo: 17,
    title: 'High Infidelity',
    edition: 'extra',
    isBonus: true,
    duration: '3:51',
    mood: '隐秘裂痕'
  },
  {
    id: 'glitch',
    albumSlug: 'midnights',
    trackNo: 18,
    title: 'Glitch',
    edition: 'extra',
    isBonus: true,
    duration: '2:28',
    mood: '电流暧昧'
  },
  {
    id: 'wouldve-couldve-shouldve',
    albumSlug: 'midnights',
    trackNo: 19,
    title: "Would've Could've, Should've",
    edition: 'extra',
    isBonus: true,
    duration: '4:20',
    mood: '深夜清算'
  },
  {
    id: 'dear-reader',
    albumSlug: 'midnights',
    trackNo: 20,
    title: 'Dear Reader',
    edition: 'extra',
    isBonus: true,
    duration: '3:45',
    mood: '尾声独白'
  },
  {
    id: 'hits-different',
    albumSlug: 'midnights',
    trackNo: 21,
    title: 'Hits Different',
    edition: 'extra',
    isBonus: true,
    duration: '3:54',
    mood: '额外仙曲'
  }
]

const friends = [
  { nickname: 'Mina', avatarColor: '#d7a4b8', bias: 0.35 },
  { nickname: 'Ryan', avatarColor: '#d6bd7b', bias: 0 },
  { nickname: 'Echo', avatarColor: '#9fb7df', bias: -0.2 },
  { nickname: 'June', avatarColor: '#a8d7c7', bias: 0.15 }
]

const baseScores: Record<string, number> = {
  'lavender-haze': 8.5,
  maroon: 9.2,
  'anti-hero': 8.7,
  'snow-on-the-beach': 7.8,
  'youre-on-your-own-kid': 9.4,
  'midnight-rain': 8.6,
  question: 7.6,
  'vigilante-shit': 7.3,
  bejeweled: 8.8,
  labyrinth: 7.9,
  karma: 8.4,
  'sweet-nothing': 8.1,
  mastermind: 8.2,
  'the-great-war': 8.9,
  'bigger-than-the-whole-sky': 8.6,
  paris: 7.9,
  'high-infidelity': 8.4,
  glitch: 7.7,
  'wouldve-couldve-shouldve': 9.3,
  'dear-reader': 8.5,
  'hits-different': 9.1
}

const commentPool = [
  '副歌一出来就知道今晚会循环。',
  '制作很精致，但我更吃后半段的情绪。',
  '歌词比第一遍听的时候更扎心。',
  '适合半夜戴耳机听，氛围很完整。',
  '旋律记忆点很强，越听越上头。',
  '不是最抓耳的一首，但质感很稳。'
]

export const SAMPLE_REVIEWS: Review[] = MIDNIGHTS_TRACKS.flatMap((track, trackIndex) =>
  friends.map((friend, friendIndex) => {
    const wave = ((trackIndex + friendIndex) % 5) * 0.12
    const score = Math.max(0, Math.min(10, Number(((baseScores[track.id] ?? 8) + friend.bias - wave).toFixed(1))))

    return {
      id: `${friend.nickname.toLowerCase()}-${track.id}`,
      trackId: track.id,
      nickname: friend.nickname,
      avatarColor: friend.avatarColor,
      score,
      comment: commentPool[(trackIndex + friendIndex) % commentPool.length],
      submittedAt: new Date(Date.UTC(2026, 4, 12, 12 + friendIndex, trackIndex)).toISOString()
    }
  })
)

export const STORAGE_KEYS = {
  currentUser: 'taylor-rater:current-user',
  midnightsDrafts: 'taylor-rater:midnights:drafts',
  midnightsSubmittedAt: 'taylor-rater:midnights:submitted-at'
}
