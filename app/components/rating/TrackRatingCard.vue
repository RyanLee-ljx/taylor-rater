<template>
  <article
    class="glass-panel group rounded-lg p-4 transition duration-200 hover:-translate-y-0.5 hover:border-starlight/30 hover:shadow-glow sm:p-5"
  >
    <div class="flex items-start justify-between gap-4">
      <div class="min-w-0">
        <div class="flex flex-wrap items-center gap-2 text-xs text-silver">
          <span class="rounded-full border border-white/10 bg-white/8 px-2 py-1">Track {{ track.trackNo }}</span>
          <span v-if="track.duration">{{ track.duration }}</span>
          <span v-if="track.isBonus" class="rounded-full border border-aurora-gold/30 bg-aurora-gold/10 px-2 py-1 text-aurora-gold">
            Extra
          </span>
        </div>
        <h2 class="mt-3 break-words font-display text-2xl leading-tight text-white sm:text-3xl">
          {{ track.title }}
        </h2>
        <p class="mt-1 text-sm text-silver">{{ track.mood }}</p>
      </div>

      <div class="grid shrink-0 place-items-center rounded-lg border border-white/10 bg-white/8 px-3 py-2 text-center">
        <span class="font-display text-3xl text-white">{{ formattedScore }}</span>
        <span class="text-xs uppercase tracking-[0.18em] text-silver">score</span>
      </div>
    </div>

    <div class="mt-5">
      <label :for="`${track.id}-score`" class="mb-3 flex items-center justify-between text-sm text-silver">
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
      <div class="mt-2 flex justify-between text-xs text-silver/80">
        <span>不合胃口</span>
        <span>仙品预定</span>
      </div>
    </div>

    <div class="mt-5">
      <label :for="`${track.id}-comment`" class="mb-2 block text-sm text-silver">短评</label>
      <textarea
        :id="`${track.id}-comment`"
        class="focus-ring min-h-24 w-full resize-y rounded-lg border border-white/10 bg-midnight-950/58 px-3 py-3 text-sm text-white placeholder:text-silver/45 transition focus:border-starlight/40"
        maxlength="180"
        placeholder="这一首给你的感觉是..."
        :value="rating.comment"
        @input="onCommentInput"
      />
      <div class="mt-2 flex items-center justify-between text-xs text-silver/80">
        <span v-if="rating.touched" class="inline-flex items-center gap-1 text-aurora-gold">
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
