<template>
  <article
    class="glass-panel group rounded-lg p-4 transition duration-200 hover:-translate-y-0.5 hover:border-starlight/30 hover:shadow-glow sm:p-5"
  >
    <div class="flex items-start justify-between gap-4">
      <div class="min-w-0">
        <div class="theme-muted flex flex-wrap items-center gap-2 text-xs">
          <span class="theme-surface rounded-full border px-2 py-1">Track {{ track.trackNo }}</span>
          <span v-if="track.duration">{{ track.duration }}</span>
          <span v-if="track.isBonus" class="theme-surface theme-accent rounded-full border px-2 py-1">
            Extra
          </span>
        </div>
        <h2 class="theme-text mt-3 break-words font-display text-2xl leading-tight sm:text-3xl">
          {{ track.title }}
        </h2>
        <p class="theme-muted mt-1 text-sm">{{ track.mood }}</p>
      </div>

      <div class="theme-surface grid shrink-0 place-items-center rounded-lg border px-3 py-2 text-center">
        <span class="theme-text font-display text-3xl">{{ formattedScore }}</span>
        <span class="theme-muted text-xs uppercase tracking-[0.18em]">score</span>
      </div>
    </div>

    <div class="mt-5">
      <label :for="`${track.id}-score`" class="theme-muted mb-3 flex items-center justify-between text-sm">
        <span>打分</span>
        <span>0.0 - 10.0</span>
      </label>
      <input
        :id="`${track.id}-score`"
        class="rating-slider focus-ring w-full"
        type="range"
        min="0"
        max="10"
        step="0.1"
        :value="rating.score"
        @input="onScoreInput"
      >
      <div class="theme-muted mt-2 flex justify-between text-xs">
        <span>不合胃口</span>
        <span>仙品预定</span>
      </div>
    </div>

    <div class="mt-5">
      <label :for="`${track.id}-comment`" class="theme-muted mb-2 block text-sm">短评</label>
      <textarea
        :id="`${track.id}-comment`"
        class="theme-input focus-ring min-h-24 w-full resize-y rounded-lg border px-3 py-3 text-sm transition"
        maxlength="180"
        placeholder="这一首给你的感觉是..."
        :value="rating.comment"
        @input="onCommentInput"
      />
      <div class="theme-muted mt-2 flex items-center justify-between text-xs">
        <span v-if="rating.touched" class="theme-accent inline-flex items-center gap-1">
          <Check class="size-3.5" />
          已记录
        </span>
        <span v-else>滑动一次即可计入进度</span>
        <span>{{ rating.comment.length }}/180</span>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { Check } from 'lucide-vue-next'
import type { RatingDraft, Track } from '~/types/rating'
import { formatScore, roundToOne } from '~/lib/utils'

const props = defineProps<{
  track: Track
  rating: RatingDraft
}>()

const emit = defineEmits<{
  'update:rating': [value: RatingDraft]
}>()

const formattedScore = computed(() => formatScore(props.rating.score))

function onScoreInput(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:rating', {
    ...props.rating,
    score: roundToOne(Number(target.value)),
    touched: true
  })
}

function onCommentInput(event: Event) {
  const target = event.target as HTMLTextAreaElement
  emit('update:rating', {
    ...props.rating,
    comment: target.value,
    touched: props.rating.touched || target.value.trim().length > 0
  })
}
</script>
