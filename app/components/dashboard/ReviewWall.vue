<template>
  <section class="glass-panel rounded-lg p-4 sm:p-5">
    <div class="flex items-start justify-between gap-4">
      <div>
        <p class="text-sm text-silver">好友评价墙</p>
        <h2 class="mt-1 font-display text-2xl text-white">{{ trackTitle }}</h2>
      </div>
      <MessageSquare class="mt-1 size-5 text-aurora-gold" />
    </div>

    <div class="mt-5 space-y-3">
      <article
        v-for="review in reviews"
        :key="review.id"
        class="rounded-lg border border-white/10 bg-white/[0.06] p-3"
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
              <p class="truncate font-medium text-white">
                {{ review.nickname }}
                <span v-if="review.isCurrentUser" class="ml-1 text-xs text-aurora-gold">你</span>
              </p>
              <p class="text-xs text-silver">{{ formatDate(review.submittedAt) }}</p>
            </div>
          </div>
          <p class="shrink-0 font-display text-2xl text-white">{{ review.score.toFixed(1) }}</p>
        </div>

        <p class="mt-3 text-sm leading-6 text-starlight/90">{{ review.comment }}</p>
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
