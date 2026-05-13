<template>
  <div class="min-h-dvh">
    <StarfieldBackground />

    <header class="sticky top-0 z-30 border-b border-white/10 bg-midnight-950/72 backdrop-blur-xl">
      <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <NuxtLink to="/" class="focus-ring flex items-center gap-3 rounded-md">
          <span class="grid size-9 place-items-center rounded-full border border-white/15 bg-white/8 text-aurora-gold">
            <Sparkles class="size-4" />
          </span>
          <span class="leading-tight">
            <span class="block font-display text-lg text-white">Taylor Rater</span>
            <span class="block text-xs text-silver">Midnights 好友评分局</span>
          </span>
        </NuxtLink>

        <nav class="flex items-center gap-2 text-sm text-silver">
          <NuxtLink
            to="/rate"
            class="focus-ring rounded-full px-3 py-2 transition hover:bg-white/10 hover:text-white"
          >
            打分
          </NuxtLink>
          <NuxtLink
            to="/results"
            class="focus-ring rounded-full px-3 py-2 transition hover:bg-white/10 hover:text-white"
          >
            榜单
          </NuxtLink>
        </nav>
      </div>
    </header>

    <main class="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { Sparkles } from 'lucide-vue-next'
import StarfieldBackground from '~/components/layout/StarfieldBackground.vue'
</script>
