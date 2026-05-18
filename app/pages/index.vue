<template>
  <div class="space-y-8">
    <section class="grid min-h-[calc(100dvh-112px)] items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
      <div class="order-2 space-y-6 lg:order-1">
        <div class="theme-surface theme-muted inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm">
          <Moon class="theme-accent-2 size-4" />
          Taylor album rating
        </div>

        <div>
          <p class="theme-accent-2 font-display text-lg">Taylor Swift</p>
          <h1 class="theme-text mt-2 font-display text-5xl leading-none sm:text-6xl lg:text-7xl">
            Album Rating
          </h1>
          <p class="theme-muted mt-5 max-w-2xl text-base leading-7 sm:text-lg">
            选择一张专辑，逐首留下 0.0 到 10.0 分和一句短评；每张专辑都有独立评分单、独立榜单和独立评价墙。
          </p>
        </div>

        <form class="glass-panel max-w-xl rounded-lg p-4 sm:p-5" @submit.prevent="enterRating">
          <label for="nickname" class="theme-muted text-sm">你的昵称</label>
          <div class="mt-3 flex flex-col gap-3 sm:flex-row">
            <input
              id="nickname"
              v-model="nickname"
              class="theme-input focus-ring min-h-12 flex-1 rounded-lg border px-4 transition"
              maxlength="24"
              placeholder="比如 Ryan"
              autocomplete="nickname"
            >
            <button
              type="submit"
              class="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-starlight px-5 font-semibold text-midnight-950 transition hover:bg-white"
            >
              <PenLine class="size-4" />
              进入评分
            </button>
          </div>
          <p class="theme-muted mt-3 text-xs leading-5">
            选择具体专辑后，评分会同步到对应专辑的 Supabase 共享榜单；不可用时会保存到本机浏览器。
          </p>
        </form>

        <div class="theme-muted flex flex-wrap gap-3 text-sm">
          <NuxtLink class="theme-surface focus-ring rounded-full border px-4 py-2 transition hover:text-[color:var(--album-text)]" to="/results">
            查看榜单
          </NuxtLink>
          <span class="theme-surface rounded-full border px-4 py-2">
            {{ albums.length }} albums
          </span>
        </div>
      </div>

      <div class="order-1 lg:order-2">
        <div class="mx-auto max-w-[420px]">
          <div class="glass-panel rounded-lg p-3 shadow-card">
            <img
              class="aspect-square w-full rounded-md object-cover"
              :src="coverSrc"
              alt="Taylor Swift album rating cover"
            >
          </div>
          <div class="theme-muted mt-4 grid grid-cols-3 gap-3 text-center text-sm">
            <div class="theme-surface rounded-lg border px-3 py-3">
              <p class="theme-text font-display text-2xl">{{ albums.length }}</p>
              <p>专辑</p>
            </div>
            <div class="theme-surface rounded-lg border px-3 py-3">
              <p class="theme-text font-display text-2xl">{{ totalTracks }}</p>
              <p>曲目</p>
            </div>
            <div class="theme-surface rounded-lg border px-3 py-3">
              <p class="theme-text font-display text-2xl">Top 5</p>
              <p>仙乐</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="space-y-4">
      <div>
        <p class="theme-accent-2 text-sm">Albums</p>
        <h2 class="theme-text mt-1 font-display text-3xl">选择专辑开始</h2>
      </div>
      <AlbumSelector :albums="albums" action="rate" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { Moon, PenLine } from 'lucide-vue-next'
import AlbumSelector from '~/components/album/AlbumSelector.vue'
import { ALBUMS as albums, getAlbumTracks } from '~/lib/constants'

const { user, saveUser, loadUser } = useCurrentUser()
const nickname = ref('')
const coverSrc = usePublicAsset('/images/logo-cover.png')
const totalTracks = computed(() => albums.reduce((sum, album) => sum + getAlbumTracks(album.slug).length, 0))

onMounted(() => {
  loadUser()
  nickname.value = user.value?.nickname || ''
})

async function enterRating() {
  const cleanNickname = nickname.value.trim()
  if (!cleanNickname) {
    return
  }

  saveUser(cleanNickname)
  await navigateTo('/rate')
}
</script>
