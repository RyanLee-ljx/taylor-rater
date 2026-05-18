<template>
  <section class="glass-panel rounded-lg p-4 sm:p-5">
    <div class="flex items-start justify-between gap-4">
      <div>
        <p class="theme-muted text-sm">好友评价墙</p>
        <h2 class="theme-text mt-1 font-display text-2xl">{{ trackTitle }}</h2>
      </div>
      <MessageSquare class="theme-accent-2 mt-1 size-5" />
    </div>

    <div v-if="reviews.length === 0" class="theme-surface theme-muted mt-5 rounded-lg border p-4 text-sm">
      这首歌暂时还没有短评。
    </div>

    <div v-else class="mt-5 space-y-3">
      <article
        v-for="review in reviews"
        :key="review.id"
        class="theme-surface rounded-lg border p-3"
      >
        <div class="flex items-start justify-between gap-3">
          <div class="flex min-w-0 items-center gap-3">
            <span
              class="grid size-9 shrink-0 place-items-center rounded-full text-sm font-semibold text-midnight-950"
              :style="{ backgroundColor: review.avatarColor }"
            >
              {{ review.nickname.slice(0, 1).toUpperCase() }}
            </span>
            <div class="min-w-0">
              <p class="theme-text truncate font-medium">
                {{ review.nickname }}
                <span v-if="review.isCurrentUser" class="theme-accent-2 ml-1 text-xs">你</span>
              </p>
              <p class="theme-muted text-xs">{{ formatDate(review.submittedAt) }}</p>
            </div>
          </div>
          <p class="theme-text shrink-0 font-display text-2xl">{{ review.score.toFixed(1) }}</p>
        </div>

        <p class="theme-text mt-3 text-sm leading-6">{{ review.comment }}</p>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { MessageSquare } from 'lucide-vue-next'
import type { Review } from '~/types/rating'

defineProps<{
  trackTitle: string
  reviews: Review[]
}>()

function formatDate(value: string) {
  return new Intl.DateTimeFormat('zh-CN', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(value))
}
</script>
