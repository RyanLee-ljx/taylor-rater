<template>
  <div class="grid min-h-[calc(100dvh-96px)] items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
    <section class="order-2 space-y-6 lg:order-1">
      <div class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-3 py-2 text-sm text-silver">
        <Moon class="size-4 text-aurora-gold" />
        Midnights track rating
      </div>

      <div>
        <p class="font-display text-lg text-aurora-gold">{{ album.artist }}</p>
        <h1 class="mt-2 font-display text-5xl leading-none text-white sm:text-6xl lg:text-7xl">
          {{ album.title }}
        </h1>
        <p class="mt-5 max-w-2xl text-base leading-7 text-starlight/82 sm:text-lg">
          {{ album.description }}
        </p>
      </div>

      <form class="glass-panel max-w-xl rounded-lg p-4 sm:p-5" @submit.prevent="enterRating">
        <label for="nickname" class="text-sm text-silver">你的昵称</label>
        <div class="mt-3 flex flex-col gap-3 sm:flex-row">
          <input
            id="nickname"
            v-model="nickname"
            class="focus-ring min-h-12 flex-1 rounded-lg border border-white/10 bg-midnight-950/58 px-4 text-white placeholder:text-silver/45 transition focus:border-starlight/40"
            maxlength="24"
            placeholder="比如 Ryan"
            autocomplete="nickname"
          >
          <button
            type="submit"
            class="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-starlight px-5 font-semibold text-midnight-950 transition hover:bg-white"
          >
            <PenLine class="size-4" />
            开始打分
          </button>
        </div>
      </form>

      <div class="flex flex-wrap gap-3 text-sm text-silver">
        <NuxtLink class="focus-ring rounded-full border border-white/10 bg-white/8 px-4 py-2 transition hover:text-white" to="/results">
          先看榜单
        </NuxtLink>
        <span class="rounded-full border border-white/10 bg-white/8 px-4 py-2">14 tracks including Hits Different</span>
      </div>
    </section>

    <section class="order-1 lg:order-2">
      <div class="mx-auto max-w-[420px]">
        <div class="glass-panel rounded-lg p-3 shadow-card">
          <img
            class="aspect-square w-full rounded-md object-cover"
            :src="coverSrc"
            alt="Midnights inspired album cover"
          >
        </div>
        <div class="mt-4 grid grid-cols-3 gap-3 text-center text-sm text-silver">
          <div class="rounded-lg border border-white/10 bg-white/8 px-3 py-3">
            <p class="font-display text-2xl text-white">14</p>
            <p>曲目</p>
          </div>
          <div class="rounded-lg border border-white/10 bg-white/8 px-3 py-3">
            <p class="font-display text-2xl text-white">10.0</p>
            <p>满分</p>
          </div>
          <div class="rounded-lg border border-white/10 bg-white/8 px-3 py-3">
            <p class="font-display text-2xl text-white">Top 5</p>
            <p>仙乐</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Moon, PenLine } from 'lucide-vue-next'
import { MIDNIGHTS_ALBUM as album } from '~/lib/constants'

const { user, saveUser, loadUser } = useCurrentUser()
const nickname = ref('')
const coverSrc = usePublicAsset('/images/midnights-cover.svg')

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
