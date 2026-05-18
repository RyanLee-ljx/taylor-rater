<template>
  <section class="space-y-3">
    <button
      v-for="row in rows"
      :key="row.id"
      type="button"
      class="focus-ring glass-panel w-full rounded-lg p-4 text-left transition duration-200 hover:-translate-y-0.5 hover:border-starlight/30"
      :class="row.id === selectedTrackId ? 'border-starlight/40 shadow-glow' : ''"
      @click="$emit('select', row.id)"
    >
      <div class="flex items-center gap-3">
        <div
          class="grid size-10 shrink-0 place-items-center rounded-full border text-sm font-semibold"
          :class="row.position === 1 ? 'theme-surface theme-accent-2' : 'theme-surface theme-text'"
        >
          {{ row.position }}
        </div>

        <div class="min-w-0 flex-1">
          <div class="flex flex-wrap items-center gap-2">
            <h3 class="theme-text break-words font-display text-xl leading-tight">{{ row.title }}</h3>
            <span v-if="row.label" class="theme-surface theme-accent-2 rounded-full border px-2 py-1 text-xs">
              {{ row.label }}
            </span>
            <span v-if="row.isBonus" class="theme-surface theme-muted rounded-full border px-2 py-1 text-xs">
              Extra
            </span>
          </div>
          <p class="theme-muted mt-1 text-sm">{{ row.ratingCount }} 位好友参与评分</p>
        </div>

        <div class="shrink-0 text-right">
          <p class="theme-text font-display text-3xl">{{ row.avgScore.toFixed(2) }}</p>
          <p class="theme-muted text-xs uppercase tracking-[0.18em]">avg</p>
        </div>
      </div>
    </button>
  </section>
</template>

<script setup lang="ts">
import type { LeaderboardRow } from '~/types/rating'

defineProps<{
  rows: LeaderboardRow[]
  selectedTrackId: string
}>()

defineEmits<{
  select: [trackId: string]
}>()
</script>
