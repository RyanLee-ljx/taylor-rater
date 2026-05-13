<template>
  <section class="glass-panel rounded-lg p-4">
    <div class="flex items-center justify-between gap-4">
      <div>
        <p class="text-sm text-silver">评分进度</p>
        <p class="mt-1 font-display text-2xl text-white">{{ completed }} / {{ total }}</p>
      </div>
      <div class="text-right text-sm text-silver">
        <p>{{ percentage }}%</p>
        <p>完成后可提交榜单</p>
      </div>
    </div>
    <div class="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
      <div
        class="h-full rounded-full bg-gradient-to-r from-aurora-rose via-starlight to-aurora-gold transition-all duration-300"
        :style="{ width: `${percentage}%` }"
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
