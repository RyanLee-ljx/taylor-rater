<template>
  <div class="space-y-6">
    <section class="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <p class="text-sm text-aurora-gold">Leaderboard</p>
        <h1 class="mt-1 font-display text-4xl leading-tight text-white sm:text-5xl">Midnights 榜单</h1>
        <p class="mt-3 max-w-2xl text-sm leading-6 text-silver">
          排名按真实提交的平均分降序生成；第一名为仙品，第二到第五名为仙乐。
        </p>
      </div>

      <NuxtLink class="focus-ring inline-flex items-center justify-center gap-2 rounded-lg bg-starlight px-4 py-3 text-sm font-semibold text-midnight-950 transition hover:bg-white" to="/rate">
        <PenLine class="size-4" />
        修改我的评分
      </NuxtLink>
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
  </div>
</template>

<script setup lang="ts">
import { PenLine } from 'lucide-vue-next'
import Leaderboard from '~/components/dashboard/Leaderboard.vue'
import ReviewWall from '~/components/dashboard/ReviewWall.vue'

const { leaderboard, loading, status, loadLeaderboard, getReviewsForTrack } = useLeaderboard()
const selectedTrackId = ref('')

const topTrack = computed(() => leaderboard.value[0])
const topRatedTrack = computed(() => leaderboard.value.find((row) => row.ratingCount > 0))
const hasRatings = computed(() => leaderboard.value.some((row) => row.ratingCount > 0))
const totalParticipants = computed(() =>
  Math.max(...leaderboard.value.map((row) => row.ratingCount), 0)
)

const selectedTrack = computed(() => leaderboard.value.find((row) => row.id === selectedTrackId.value) || topTrack.value)
const selectedReviews = computed(() => (selectedTrack.value ? getReviewsForTrack(selectedTrack.value.id) : []))

onMounted(loadLeaderboard)

watchEffect(() => {
  if (!selectedTrackId.value && topTrack.value) {
    selectedTrackId.value = topTrack.value.id
  }
})
</script>
