<template>
  <div class="space-y-6">
    <section class="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <p class="text-sm text-aurora-gold">{{ selectedAlbum ? selectedAlbum.shortTitle : 'Leaderboards' }}</p>
        <h1 class="mt-1 font-display text-4xl leading-tight text-white sm:text-5xl">
          {{ selectedAlbum ? `${selectedAlbum.title} 榜单` : '选择专辑榜单' }}
        </h1>
        <p class="mt-3 max-w-2xl text-sm leading-6 text-silver">
          {{ selectedAlbum ? '排名按真实提交的平均分降序生成；第一名为仙品，第二到第五名为仙乐。' : '每张专辑都有独立的平均分排行、仙品/仙乐和好友评价墙。' }}
        </p>
      </div>

      <NuxtLink
        class="focus-ring inline-flex items-center justify-center gap-2 rounded-lg bg-starlight px-4 py-3 text-sm font-semibold text-midnight-950 transition hover:bg-white"
        :to="selectedAlbum ? { path: '/rate', query: { album: selectedAlbum.slug } } : '/rate'"
      >
        <PenLine class="size-4" />
        {{ selectedAlbum ? '修改我的评分' : '去打分' }}
      </NuxtLink>
    </section>

    <section v-if="!selectedAlbum" class="space-y-4">
      <AlbumSelector :albums="albums" action="results" />
    </section>

    <template v-else>
      <section class="glass-panel grid gap-4 rounded-lg p-4 sm:grid-cols-[120px_1fr] sm:p-5">
        <img
          class="aspect-square w-full rounded-md object-cover sm:w-[120px]"
          :src="coverSrc"
          :alt="`${selectedAlbum.title} cover`"
        >
        <div class="flex min-w-0 flex-col justify-center">
          <p class="text-sm text-aurora-gold">{{ selectedAlbum.artist }}</p>
          <h2 class="mt-1 break-words font-display text-3xl leading-tight text-white">
            {{ selectedAlbum.title }}
          </h2>
          <p class="mt-2 text-sm leading-6 text-silver">
            {{ tracks.length }} tracks · {{ selectedAlbum.description }}
          </p>
        </div>
      </section>

      <section
        class="rounded-lg border px-4 py-3 text-sm"
        :class="status.mode === 'error' ? 'border-aurora-rose/30 bg-aurora-rose/10 text-aurora-rose' : 'border-white/10 bg-white/8 text-silver'"
      >
        <span v-if="loading">正在读取榜单...</span>
        <span v-else>{{ status.message }}</span>
      </section>

      <section class="grid gap-4 sm:grid-cols-3">
        <div class="glass-panel rounded-lg p-4">
          <p class="text-sm text-silver">当前仙品</p>
          <p class="mt-2 truncate font-display text-2xl text-white">{{ topRatedTrack?.title || '暂无' }}</p>
        </div>
        <div class="glass-panel rounded-lg p-4">
          <p class="text-sm text-silver">平均分</p>
          <p class="mt-2 font-display text-2xl text-white">{{ topRatedTrack?.avgScore.toFixed(2) || '-' }}</p>
        </div>
        <div class="glass-panel rounded-lg p-4">
          <p class="text-sm text-silver">参与样本</p>
          <p class="mt-2 font-display text-2xl text-white">{{ totalParticipants }} 人</p>
        </div>
      </section>

      <section
        v-if="!loading && !hasRatings"
        class="glass-panel rounded-lg p-5 text-sm leading-6 text-silver"
      >
        当前还没有任何已提交评分。先去打分页提交一次，榜单会立刻用你的真实数据生成。
      </section>

      <section class="grid gap-5 lg:grid-cols-[1fr_0.85fr]">
        <Leaderboard :rows="leaderboard" :selected-track-id="selectedTrackId" @select="selectedTrackId = $event" />
        <ReviewWall
          v-if="selectedTrack"
          :track-title="selectedTrack.title"
          :reviews="selectedReviews"
        />
      </section>
    </template>
  </div>
</template>

<script setup lang="ts">
import { PenLine } from 'lucide-vue-next'
import AlbumSelector from '~/components/album/AlbumSelector.vue'
import Leaderboard from '~/components/dashboard/Leaderboard.vue'
import ReviewWall from '~/components/dashboard/ReviewWall.vue'
import { ALBUMS as albums, DEFAULT_ALBUM_SLUG, findAlbumBySlug, getAlbumTracks } from '~/lib/constants'

const route = useRoute()
const config = useRuntimeConfig()
const routeAlbumSlug = computed(() => {
  const value = Array.isArray(route.query.album) ? route.query.album[0] : route.query.album
  return typeof value === 'string' ? value : null
})
const selectedAlbum = computed(() => findAlbumBySlug(routeAlbumSlug.value))
const activeAlbumSlug = computed(() => selectedAlbum.value?.slug || DEFAULT_ALBUM_SLUG)
const tracks = computed(() => getAlbumTracks(activeAlbumSlug.value))
const coverSrc = computed(() => assetSrc(selectedAlbum.value?.coverImage || '/images/midnights-cover.jpg'))

const { leaderboard, loading, status, loadLeaderboard, getReviewsForTrack } = useLeaderboard(activeAlbumSlug)
const selectedTrackId = ref('')

function assetSrc(path: string) {
  const baseURL = config.app.baseURL || '/'
  return `${baseURL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`
}

const topTrack = computed(() => leaderboard.value[0])
const topRatedTrack = computed(() => leaderboard.value.find((row) => row.ratingCount > 0))
const hasRatings = computed(() => leaderboard.value.some((row) => row.ratingCount > 0))
const totalParticipants = computed(() =>
  Math.max(...leaderboard.value.map((row) => row.ratingCount), 0)
)

const selectedTrack = computed(() => leaderboard.value.find((row) => row.id === selectedTrackId.value) || topTrack.value)
const selectedReviews = computed(() => (selectedTrack.value ? getReviewsForTrack(selectedTrack.value.id) : []))

onMounted(async () => {
  if (selectedAlbum.value) {
    await loadLeaderboard(selectedAlbum.value.slug)
  }
})

watch(activeAlbumSlug, async (nextSlug) => {
  selectedTrackId.value = ''
  if (selectedAlbum.value) {
    await loadLeaderboard(nextSlug)
  }
})

watchEffect(() => {
  if (!selectedTrackId.value && topTrack.value) {
    selectedTrackId.value = topTrack.value.id
  }
})
</script>
