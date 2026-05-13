<template>
  <div class="space-y-6">
    <section class="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <p class="text-sm text-aurora-gold">Midnights</p>
        <h1 class="mt-1 font-display text-4xl leading-tight text-white sm:text-5xl">逐首打分</h1>
        <p class="mt-3 max-w-2xl text-sm leading-6 text-silver">
          每首歌滑动一次分数即可计入进度。短评可以很短，留下第一反应也可以。
        </p>
      </div>

      <NuxtLink class="focus-ring inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/8 px-4 py-3 text-sm text-white transition hover:bg-white/12" to="/results">
        <BarChart3 class="size-4" />
        查看榜单
      </NuxtLink>
    </section>

    <section v-if="!user" class="glass-panel rounded-lg p-4 sm:p-5">
      <h2 class="font-display text-2xl text-white">先留下昵称</h2>
      <form class="mt-4 flex flex-col gap-3 sm:flex-row" @submit.prevent="createUser">
        <input
          v-model="nickname"
          class="focus-ring min-h-12 flex-1 rounded-lg border border-white/10 bg-midnight-950/58 px-4 text-white placeholder:text-silver/45 transition focus:border-starlight/40"
          maxlength="24"
          placeholder="你的昵称"
        >
        <button class="focus-ring min-h-12 rounded-lg bg-starlight px-5 font-semibold text-midnight-950 transition hover:bg-white" type="submit">
          继续
        </button>
      </form>
    </section>

    <template v-else>
      <RatingProgress :completed="completedCount" :total="tracks.length" />

      <div class="grid gap-4 lg:grid-cols-2">
        <TrackRatingCard
          v-for="track in tracks"
          :key="track.id"
          :track="track"
          :rating="drafts[track.id]"
          @update:rating="(nextRating) => updateRating(track.id, nextRating)"
        />
      </div>

      <div class="sticky bottom-4 z-20">
        <div class="glass-panel flex flex-col gap-3 rounded-lg p-3 sm:flex-row sm:items-center sm:justify-between">
          <div class="text-sm text-silver">
            <p class="font-medium text-white">{{ user.nickname }} 的评分单</p>
            <p v-if="canSubmit">已完成所有曲目，可以提交。</p>
            <p v-else>还差 {{ tracks.length - completedCount }} 首。</p>
          </div>

          <div class="flex gap-2">
            <button
              type="button"
              class="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/8 px-4 text-sm text-white transition hover:bg-white/12"
              @click="resetRatings"
            >
              <RotateCcw class="size-4" />
              重置
            </button>
            <button
              type="button"
              class="focus-ring inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-starlight px-5 text-sm font-semibold text-midnight-950 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-45 sm:flex-none"
              :disabled="!canSubmit"
              @click="submit"
            >
              <Send class="size-4" />
              提交评分
            </button>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { BarChart3, RotateCcw, Send } from 'lucide-vue-next'
import { MIDNIGHTS_TRACKS as tracks } from '~/lib/constants'

const { user, saveUser, loadUser } = useCurrentUser()
const { drafts, completedCount, canSubmit, updateRating, submitRatings, resetRatings, loadRatings } = useRatings()
const nickname = ref('')

onMounted(() => {
  loadUser()
  loadRatings()
  nickname.value = user.value?.nickname || ''
})

function createUser() {
  if (!nickname.value.trim()) {
    return
  }

  saveUser(nickname.value)
}

async function submit() {
  if (!user.value || !canSubmit.value) {
    return
  }

  submitRatings(user.value)
  await navigateTo('/results')
}
</script>
