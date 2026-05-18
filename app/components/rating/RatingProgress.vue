<template>
  <section class="glass-panel rounded-lg p-4">
    <div class="flex items-center justify-between gap-4">
      <div>
        <p class="theme-muted text-sm">评分进度</p>
        <p class="theme-text mt-1 font-display text-2xl">{{ completed }} / {{ total }}</p>
      </div>
      <div class="theme-muted text-right text-sm">
        <p>{{ percentage }}%</p>
        <p>完成后可提交榜单</p>
      </div>
    </div>
    <div class="theme-surface mt-4 h-2 overflow-hidden rounded-full">
      <div
        class="h-full rounded-full transition-all duration-300"
        :style="{
          width: `${percentage}%`,
          background: 'linear-gradient(90deg, var(--album-accent), var(--album-accent-2))'
        }"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  completed: number
  total: number
}>()

const percentage = computed(() => {
  if (props.total === 0) {
    return 0
  }

  return Math.round((props.completed / props.total) * 100)
})
</script>
