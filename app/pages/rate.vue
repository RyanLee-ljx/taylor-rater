<template>
  <div class="space-y-6">
    <section class="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <p class="theme-accent-2 text-sm">{{ selectedAlbum ? selectedAlbum.shortTitle : 'Albums' }}</p>
        <h1 class="theme-text mt-1 font-display text-4xl leading-tight sm:text-5xl">
          {{ selectedAlbum ? `${selectedAlbum.title} 逐首打分` : '选择专辑打分' }}
        </h1>
        <p class="theme-muted mt-3 max-w-2xl text-sm leading-6">
          {{ selectedAlbum ? '每首歌滑动一次分数即可计入进度。短评可以很短，留下第一反应也可以。' : '每张专辑都有独立的评分草稿、提交记录和共享榜单。' }}
        </p>
      </div>

      <NuxtLink
        class="theme-surface theme-text focus-ring inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm transition hover:bg-white/12"
        :to="selectedAlbum ? { path: '/results', query: { album: selectedAlbum.slug } } : '/results'"
      >
        <BarChart3 class="size-4" />
        查看榜单
      </NuxtLink>
    </section>

    <section v-if="!selectedAlbum" class="space-y-4">
      <AlbumSelector :albums="albums" action="rate" />
    </section>

    <section v-else-if="!user" class="glass-panel rounded-lg p-4 sm:p-5">
      <h2 class="theme-text font-display text-2xl">先留下昵称</h2>
      <form class="mt-4 flex flex-col gap-3 sm:flex-row" @submit.prevent="createUser">
        <input
          v-model="nickname"
          class="theme-input focus-ring min-h-12 flex-1 rounded-lg border px-4 transition"
          maxlength="24"
          placeholder="你的昵称"
        >
        <button
          class="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-starlight px-5 font-semibold text-midnight-950 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
          type="submit"
          :disabled="remoteLoading"
        >
          <Loader2 v-if="remoteLoading" class="size-4 animate-spin" />
          {{ remoteLoading ? '同步中' : '继续' }}
        </button>
      </form>
    </section>

    <template v-else>
      <section class="glass-panel grid gap-4 rounded-lg p-4 sm:grid-cols-[120px_1fr] sm:p-5">
        <img
          class="aspect-square w-full rounded-md object-cover sm:w-[120px]"
          :src="coverSrc"
          :alt="`${selectedAlbum.title} cover`"
        >
        <div class="flex min-w-0 flex-col justify-center">
          <p class="theme-accent-2 text-sm">{{ selectedAlbum.artist }}</p>
          <h2 class="theme-text mt-1 break-words font-display text-3xl leading-tight">
            {{ selectedAlbum.title }}
          </h2>
          <p class="theme-muted mt-2 text-sm leading-6">
            {{ tracks.length }} tracks · {{ selectedAlbum.description }}
          </p>
        </div>
      </section>

      <section
        class="rounded-lg border px-4 py-3 text-sm"
        :class="status.mode === 'error' ? 'border-aurora-rose/30 bg-aurora-rose/10 text-aurora-rose' : 'theme-surface theme-muted'"
      >
        {{ status.message }}
      </section>

      <RatingProgress :completed="completedCount" :total="tracks.length" />

      <div class="grid gap-4 lg:grid-cols-2">
        <TrackRatingCard
          v-for="track in tracks"
          :key="track.id"
          :track="track"
          :rating="drafts[track.id]"
          @update:rating="updateTrackRating(track.id, $event as RatingDraft)"
        />
      </div>

      <div class="sticky bottom-4 z-20">
        <div class="glass-panel flex flex-col gap-3 rounded-lg p-3 sm:flex-row sm:items-center sm:justify-between">
          <div class="theme-muted text-sm">
            <p class="theme-text font-medium">{{ user.nickname }} 的 {{ selectedAlbum.shortTitle }} 评分单</p>
            <p v-if="canSubmit">已完成所有曲目，可以提交。</p>
            <p v-else>还差 {{ tracks.length - completedCount }} 首。</p>
          </div>

          <div class="flex gap-2">
            <button
              type="button"
              class="theme-surface theme-text focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border px-4 text-sm transition hover:bg-white/12"
              @click="resetRatings"
            >
              <RotateCcw class="size-4" />
              重置
            </button>
            <button
              type="button"
              class="focus-ring inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-starlight px-5 text-sm font-semibold text-midnight-950 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-45 sm:flex-none"
              :disabled="!canSubmit || remoteLoading"
              @click="submit"
            >
              <Loader2 v-if="remoteLoading" class="size-4 animate-spin" />
              <Send v-else class="size-4" />
              {{ remoteLoading ? '提交中' : '提交评分' }}
            </button>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { BarChart3, Loader2, RotateCcw, Send } from 'lucide-vue-next'
import AlbumSelector from '~/components/album/AlbumSelector.vue'
import RatingProgress from '~/components/rating/RatingProgress.vue'
import TrackRatingCard from '~/components/rating/TrackRatingCard.vue'
import { ALBUMS as albums, DEFAULT_ALBUM_SLUG, findAlbumBySlug, getAlbumTracks } from '~/lib/constants'
import type { RatingDraft } from '~/types/rating'

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

const { user, saveUser, loadUser } = useCurrentUser()
const {
  drafts,
  completedCount,
  canSubmit,
  updateRating,
  submitRatings,
  resetRatings,
  loadRatings,
  replaceRatings,
  markSubmitted
} = useRatings(activeAlbumSlug)
const { status, loading: remoteLoading, syncUser, loadUserRatings, submitRemoteRatings } = useRemoteRatings()
const nickname = ref('')

function assetSrc(path: string) {
  const baseURL = config.app.baseURL || '/'
  return `${baseURL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`
}

onMounted(async () => {
  loadUser()
  loadRatings(activeAlbumSlug.value)
  nickname.value = user.value?.nickname || ''
  await hydrateRemoteRatings()
})

watch(activeAlbumSlug, async (nextSlug) => {
  loadRatings(nextSlug)
  await hydrateRemoteRatings()
})

async function hydrateRemoteRatings() {
  if (!user.value || !selectedAlbum.value) {
    return
  }

  const syncedUser = await syncUser(user.value.nickname, selectedAlbum.value.slug)
  const remoteDrafts = await loadUserRatings(syncedUser, selectedAlbum.value.slug)
  if (remoteDrafts) {
    replaceRatings(remoteDrafts)
  }
}

async function createUser() {
  if (!nickname.value.trim()) {
    return
  }

  try {
    const nextUser = selectedAlbum.value
      ? await syncUser(nickname.value, selectedAlbum.value.slug)
      : saveUser(nickname.value)
    if (selectedAlbum.value) {
      const remoteDrafts = await loadUserRatings(nextUser, selectedAlbum.value.slug)
      if (remoteDrafts) {
        replaceRatings(remoteDrafts)
      }
    }
  } catch {
    saveUser(nickname.value)
  }
}

function updateTrackRating(trackId: string, nextRating: RatingDraft) {
  updateRating(trackId, nextRating)
}

async function submit() {
  if (!user.value || !canSubmit.value || !selectedAlbum.value) {
    return
  }

  const currentUser = await syncUser(user.value.nickname, selectedAlbum.value.slug)
  const result = await submitRemoteRatings(currentUser, drafts.value, selectedAlbum.value.slug)
  if (result.ok && result.submittedAt) {
    markSubmitted(result.submittedAt)
  } else {
    submitRatings(currentUser)
  }

  await navigateTo({ path: '/results', query: { album: selectedAlbum.value.slug } })
}
</script>
