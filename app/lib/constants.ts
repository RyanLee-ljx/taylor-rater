import type { Album, AlbumTheme, Review, Track } from '~/types/rating'

export const DEFAULT_ALBUM_SLUG = 'midnights'

export const MIDNIGHTS_THEME: AlbumTheme = {
  bg: '#301d2a',
  bg2: '#111936',
  bg3: '#2d244a',
  panel: '#5e363a',
  panel2: '#c3987e',
  border: '#923b3d',
  text: '#ebe9e6',
  muted: '#bfc7d8',
  accent: '#8590a1',
  accent2: '#12110c',
  header: 'rgba(17, 25, 54, 0.72)',
  selection: 'rgba(215, 164, 184, 0.34)'
}

export const LOVER_THEME: AlbumTheme = {
  bg: '#d2b3d8',
  bg2: '#f4b1c6',
  bg3: '#f9c1d3',
  panel: '#f1a8bf',
  panel2: '#f4c1bd',
  border: '#3f4145',
  text: '#f0d3f5f3',
  muted: '#bfc7d8',
  accent: '#fbf1c6',
  accent2: '#cad0d6',
  header: '#76abd9',
  selection: 'rgba(246, 144, 208, 0.34)'
}


export const TTPD_THEME: AlbumTheme = {
  bg: 'rgba(72, 62, 51, 0.58)',
  bg2: '#3c342c',
  bg3: '#b5aa9a',
  panel: 'rgba(35, 30, 25, 0.82)',
  panel2: '#EDECE8',
  border: 'rgba(232, 222, 204, 0.18)',
  text: '#66625d',
  muted: '#cfc3b4',
  accent: '#d7c3a6',
  accent2: '#8f8173',
  header: 'rgba(35, 30, 25, 0.76)',
  selection: 'rgba(215, 195, 166, 0.34)'
}

export const LOGIN_THEME: AlbumTheme = {
  bg: '#ffffff',
  bg2: '#76abd9',
  bg3: '#f1c8a8',
  panel: '',
  panel2: '',
  border: 'rgba(255, 244, 210, 0.28)',
  text: '#fff8e8',
  muted: '#d9e8f4',
  accent: '#f78fa7',
  accent2: '#ffe89a',
  header: 'rgba(18, 58, 92, 0.64)',
  selection: 'rgba(247, 143, 167, 0.34)'
}

export const DEFAULT_ALBUM_THEME = MIDNIGHTS_THEME

export const MIDNIGHTS_ALBUM: Album = {
  slug: 'midnights',
  title: 'Midnights',
  shortTitle: 'Midnights',
  artist: 'Taylor Swift',
  releaseDate: '2022-10-21',
  coverImage: '/images/midnights-cover.jpg',
  theme: MIDNIGHTS_THEME,
  description:
    '请为午夜打分'
}

export const TTPD_ALBUM: Album = {
  slug: 'the-tortured-poets-department',
  title: 'THE TORTURED POETS DEPARTMENT',
  shortTitle: 'TTPD',
  artist: 'Taylor Swift',
  releaseDate: '2024-04-19',
  coverImage: '/images/ttpd-cover.jpg',
  theme: TTPD_THEME,
  description:
    '请为苦难诗社打分'
}

export const LOVER_ALBUM: Album = {
  slug: 'lover',
  title: 'Lover',
  shortTitle: 'Lover',
  artist: 'Taylor Swift',
  releaseDate: '2019-08-23',
  coverImage: '/images/lover-cover.jpg',
  description: '请为辣味/恋人打分',
  theme: LOVER_THEME
}

export const ALBUMS: Album[] = [MIDNIGHTS_ALBUM, TTPD_ALBUM, LOVER_ALBUM]

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

export const TTPD_TRACKS: Track[] = [
  {
    id: 'fortnight',
    albumSlug: 'the-tortured-poets-department',
    trackNo: 1,
    title: 'Fortnight',
    edition: 'standard',
    isBonus: false,
    duration: '3:48',
    mood: '冷调开篇'
  },
  {
    id: 'the-tortured-poets-department',
    albumSlug: 'the-tortured-poets-department',
    trackNo: 2,
    title: 'The Tortured Poets Department',
    edition: 'standard',
    isBonus: false,
    duration: '4:53',
    mood: '标题陈词'
  },
  {
    id: 'my-boy-only-breaks-his-favorite-toys',
    albumSlug: 'the-tortured-poets-department',
    trackNo: 3,
    title: 'My Boy Only Breaks His Favorite Toys',
    edition: 'standard',
    isBonus: false,
    duration: '3:23',
    mood: '破碎玩具'
  },
  {
    id: 'down-bad',
    albumSlug: 'the-tortured-poets-department',
    trackNo: 4,
    title: 'Down Bad',
    edition: 'standard',
    isBonus: false,
    duration: '4:21',
    mood: '失重坠落'
  },
  {
    id: 'so-long-london',
    albumSlug: 'the-tortured-poets-department',
    trackNo: 5,
    title: 'So Long, London',
    edition: 'standard',
    isBonus: false,
    duration: '4:22',
    mood: '伦敦告别'
  },
  {
    id: 'but-daddy-i-love-him',
    albumSlug: 'the-tortured-poets-department',
    trackNo: 6,
    title: 'But Daddy I Love Him',
    edition: 'standard',
    isBonus: false,
    duration: '5:40',
    mood: '叛逆长篇'
  },
  {
    id: 'fresh-out-the-slammer',
    albumSlug: 'the-tortured-poets-department',
    trackNo: 7,
    title: 'Fresh Out The Slammer',
    edition: 'standard',
    isBonus: false,
    duration: '3:30',
    mood: '越狱喘息'
  },
  {
    id: 'florida',
    albumSlug: 'the-tortured-poets-department',
    trackNo: 8,
    title: 'Florida!!!',
    edition: 'standard',
    isBonus: false,
    duration: '3:35',
    mood: '鼓点风暴'
  },
  {
    id: 'guilty-as-sin',
    albumSlug: 'the-tortured-poets-department',
    trackNo: 9,
    title: 'Guilty as Sin?',
    edition: 'standard',
    isBonus: false,
    duration: '4:14',
    mood: '幻觉罪名'
  },
  {
    id: 'whos-afraid-of-little-old-me',
    albumSlug: 'the-tortured-poets-department',
    trackNo: 10,
    title: "Who's Afraid of Little Old Me?",
    edition: 'standard',
    isBonus: false,
    duration: '5:34',
    mood: '剧场怒放'
  },
  {
    id: 'i-can-fix-him-no-really-i-can',
    albumSlug: 'the-tortured-poets-department',
    trackNo: 11,
    title: 'I Can Fix Him (No Really I Can)',
    edition: 'standard',
    isBonus: false,
    duration: '2:36',
    mood: '危险温柔'
  },
  {
    id: 'loml',
    albumSlug: 'the-tortured-poets-department',
    trackNo: 12,
    title: 'loml',
    edition: 'standard',
    isBonus: false,
    duration: '4:37',
    mood: '钢琴悼词'
  },
  {
    id: 'i-can-do-it-with-a-broken-heart',
    albumSlug: 'the-tortured-poets-department',
    trackNo: 13,
    title: 'I Can Do It With a Broken Heart',
    edition: 'standard',
    isBonus: false,
    duration: '3:38',
    mood: '亮面崩塌'
  },
  {
    id: 'the-smallest-man-who-ever-lived',
    albumSlug: 'the-tortured-poets-department',
    trackNo: 14,
    title: 'The Smallest Man Who Ever Lived',
    edition: 'standard',
    isBonus: false,
    duration: '4:05',
    mood: '终局审判'
  },
  {
    id: 'the-alchemy',
    albumSlug: 'the-tortured-poets-department',
    trackNo: 15,
    title: 'The Alchemy',
    edition: 'standard',
    isBonus: false,
    duration: '3:16',
    mood: '胜利复燃'
  },
  {
    id: 'clara-bow',
    albumSlug: 'the-tortured-poets-department',
    trackNo: 16,
    title: 'Clara Bow',
    edition: 'standard',
    isBonus: false,
    duration: '3:36',
    mood: '名利剪影'
  },
  {
    id: 'the-black-dog',
    albumSlug: 'the-tortured-poets-department',
    trackNo: 17,
    title: 'The Black Dog',
    edition: 'extra',
    isBonus: true,
    duration: '3:58',
    mood: '酒馆残影'
  },
  {
    id: 'imgonnagetyouback',
    albumSlug: 'the-tortured-poets-department',
    trackNo: 18,
    title: 'imgonnagetyouback',
    edition: 'extra',
    isBonus: true,
    duration: '3:42',
    mood: '暧昧反击'
  },
  {
    id: 'the-albatross',
    albumSlug: 'the-tortured-poets-department',
    trackNo: 19,
    title: 'The Albatross',
    edition: 'extra',
    isBonus: true,
    duration: '3:03',
    mood: '寓言警告'
  },
  {
    id: 'chloe-or-sam-or-sophia-or-marcus',
    albumSlug: 'the-tortured-poets-department',
    trackNo: 20,
    title: 'Chloe or Sam or Sophia or Marcus',
    edition: 'extra',
    isBonus: true,
    duration: '3:33',
    mood: '旧名回声'
  },
  {
    id: 'how-did-it-end',
    albumSlug: 'the-tortured-poets-department',
    trackNo: 21,
    title: 'How Did It End?',
    edition: 'extra',
    isBonus: true,
    duration: '3:58',
    mood: '复盘挽歌'
  },
  {
    id: 'so-high-school',
    albumSlug: 'the-tortured-poets-department',
    trackNo: 22,
    title: 'So High School',
    edition: 'extra',
    isBonus: true,
    duration: '3:48',
    mood: '校园心跳'
  },
  {
    id: 'i-hate-it-here',
    albumSlug: 'the-tortured-poets-department',
    trackNo: 23,
    title: 'I Hate It Here',
    edition: 'extra',
    isBonus: true,
    duration: '4:03',
    mood: '逃离内心'
  },
  {
    id: 'thank-you-aimee',
    albumSlug: 'the-tortured-poets-department',
    trackNo: 24,
    title: 'thanK you aIMee',
    edition: 'extra',
    isBonus: true,
    duration: '4:23',
    mood: '旧怨成章'
  },
  {
    id: 'i-look-in-peoples-windows',
    albumSlug: 'the-tortured-poets-department',
    trackNo: 25,
    title: "I Look in People's Windows",
    edition: 'extra',
    isBonus: true,
    duration: '2:11',
    mood: '窗边窥梦'
  },
  {
    id: 'the-prophecy',
    albumSlug: 'the-tortured-poets-department',
    trackNo: 26,
    title: 'The Prophecy',
    edition: 'extra',
    isBonus: true,
    duration: '4:09',
    mood: '命运祷词'
  },
  {
    id: 'cassandra',
    albumSlug: 'the-tortured-poets-department',
    trackNo: 27,
    title: 'Cassandra',
    edition: 'extra',
    isBonus: true,
    duration: '4:00',
    mood: '预言沉冤'
  },
  {
    id: 'peter',
    albumSlug: 'the-tortured-poets-department',
    trackNo: 28,
    title: 'Peter',
    edition: 'extra',
    isBonus: true,
    duration: '4:43',
    mood: '童话迟到'
  },
  {
    id: 'the-bolter',
    albumSlug: 'the-tortured-poets-department',
    trackNo: 29,
    title: 'The Bolter',
    edition: 'extra',
    isBonus: true,
    duration: '3:58',
    mood: '逃跑本能'
  },
  {
    id: 'robin',
    albumSlug: 'the-tortured-poets-department',
    trackNo: 30,
    title: 'Robin',
    edition: 'extra',
    isBonus: true,
    duration: '4:00',
    mood: '童真守护'
  },
  {
    id: 'the-manuscript',
    albumSlug: 'the-tortured-poets-department',
    trackNo: 31,
    title: 'The Manuscript',
    edition: 'extra',
    isBonus: true,
    duration: '3:44',
    mood: '手稿结尾'
  }
]

export const LOVER_TRACKS: Track[] = [
  {
    id: 'i-forgot-that-you-existed',
    albumSlug: 'lover',
    trackNo: 1,
    title: 'I Forgot That You Existed',
    edition: 'standard',
    isBonus: false,
    duration: '2:50',
    mood: 'opening reset'
  },
  {
    id: 'cruel-summer',
    albumSlug: 'lover',
    trackNo: 2,
    title: 'Cruel Summer',
    edition: 'standard',
    isBonus: false,
    duration: '2:58',
    mood: 'fever pop'
  },
  {
    id: 'lover',
    albumSlug: 'lover',
    trackNo: 3,
    title: 'Lover',
    edition: 'standard',
    isBonus: false,
    duration: '3:41',
    mood: 'wedding glow'
  },
  {
    id: 'the-man',
    albumSlug: 'lover',
    trackNo: 4,
    title: 'The Man',
    edition: 'standard',
    isBonus: false,
    duration: '3:10',
    mood: 'sharp satire'
  },
  {
    id: 'the-archer',
    albumSlug: 'lover',
    trackNo: 5,
    title: 'The Archer',
    edition: 'standard',
    isBonus: false,
    duration: '3:31',
    mood: 'anxious confession'
  },
  {
    id: 'i-think-he-knows',
    albumSlug: 'lover',
    trackNo: 6,
    title: 'I Think He Knows',
    edition: 'standard',
    isBonus: false,
    duration: '2:53',
    mood: 'crush rush'
  },
  {
    id: 'miss-americana-and-the-heartbreak-prince',
    albumSlug: 'lover',
    trackNo: 7,
    title: 'Miss Americana & The Heartbreak Prince',
    edition: 'standard',
    isBonus: false,
    duration: '3:54',
    mood: 'dark pageant'
  },
  {
    id: 'paper-rings',
    albumSlug: 'lover',
    trackNo: 8,
    title: 'Paper Rings',
    edition: 'standard',
    isBonus: false,
    duration: '3:42',
    mood: 'bright sprint'
  },
  {
    id: 'cornelia-street',
    albumSlug: 'lover',
    trackNo: 9,
    title: 'Cornelia Street',
    edition: 'standard',
    isBonus: false,
    duration: '4:47',
    mood: 'city memory'
  },
  {
    id: 'death-by-a-thousand-cuts',
    albumSlug: 'lover',
    trackNo: 10,
    title: 'Death By A Thousand Cuts',
    edition: 'standard',
    isBonus: false,
    duration: '3:18',
    mood: 'heartbreak rush'
  },
  {
    id: 'london-boy',
    albumSlug: 'lover',
    trackNo: 11,
    title: 'London Boy',
    edition: 'standard',
    isBonus: false,
    duration: '3:10',
    mood: 'city postcard'
  },
  {
    id: 'soon-youll-get-better',
    albumSlug: 'lover',
    trackNo: 12,
    title: "Soon You'll Get Better (feat. Dixie Chicks)",
    edition: 'standard',
    isBonus: false,
    duration: '3:21',
    mood: 'quiet prayer'
  },
  {
    id: 'false-god',
    albumSlug: 'lover',
    trackNo: 13,
    title: 'False God',
    edition: 'standard',
    isBonus: false,
    duration: '3:20',
    mood: 'late sax'
  },
  {
    id: 'you-need-to-calm-down',
    albumSlug: 'lover',
    trackNo: 14,
    title: 'You Need To Calm Down',
    edition: 'standard',
    isBonus: false,
    duration: '2:51',
    mood: 'neon clapback'
  },
  {
    id: 'afterglow',
    albumSlug: 'lover',
    trackNo: 15,
    title: 'Afterglow',
    edition: 'standard',
    isBonus: false,
    duration: '3:43',
    mood: 'soft apology'
  },
  {
    id: 'me',
    albumSlug: 'lover',
    trackNo: 16,
    title: 'ME! (feat. Brendon Urie of Panic! At The Disco)',
    edition: 'standard',
    isBonus: false,
    duration: '3:13',
    mood: 'confetti pop'
  },
  {
    id: 'its-nice-to-have-a-friend',
    albumSlug: 'lover',
    trackNo: 17,
    title: "It's Nice To Have A Friend",
    edition: 'standard',
    isBonus: false,
    duration: '2:30',
    mood: 'small vignette'
  },
  {
    id: 'daylight',
    albumSlug: 'lover',
    trackNo: 18,
    title: 'Daylight',
    edition: 'standard',
    isBonus: false,
    duration: '4:53',
    mood: 'golden close'
  },
  {
    id: 'all-of-the-girls-you-loved-before',
    albumSlug: 'lover',
    trackNo: 19,
    title: 'All of the Girls You Loved Before',
    edition: 'extra',
    isBonus: true,
    duration: '3:41',
    mood: 'bonus glow'
  }
]

export const ALBUM_TRACKS: Record<string, Track[]> = {
  [MIDNIGHTS_ALBUM.slug]: MIDNIGHTS_TRACKS,
  [TTPD_ALBUM.slug]: TTPD_TRACKS,
  [LOVER_ALBUM.slug]: LOVER_TRACKS
}

export function findAlbumBySlug(slug?: string | null) {
  if (!slug) {
    return null
  }

  return ALBUMS.find((album) => album.slug === slug) || null
}

export function normalizeAlbumSlug(slug?: string | null) {
  return findAlbumBySlug(slug)?.slug || DEFAULT_ALBUM_SLUG
}

export function getAlbumBySlug(slug?: string | null) {
  return findAlbumBySlug(slug) || MIDNIGHTS_ALBUM
}

export function getAlbumTracks(slug?: string | null) {
  return ALBUM_TRACKS[normalizeAlbumSlug(slug)] || MIDNIGHTS_TRACKS
}

export function getRatingStorageKeys(albumSlug: string) {
  const slug = normalizeAlbumSlug(albumSlug)

  return {
    drafts:
      slug === MIDNIGHTS_ALBUM.slug
        ? STORAGE_KEYS.midnightsDrafts
        : `taylor-rater:${slug}:drafts`,
    submittedAt:
      slug === MIDNIGHTS_ALBUM.slug
        ? STORAGE_KEYS.midnightsSubmittedAt
        : `taylor-rater:${slug}:submitted-at`
  }
}

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
