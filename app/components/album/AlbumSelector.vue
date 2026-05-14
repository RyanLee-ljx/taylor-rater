<template>
  <section class="grid gap-4 md:grid-cols-2">
    <article
      v-for="album in albums"
      :key="album.slug"
      class="glass-panel overflow-hidden rounded-lg transition duration-200 hover:-translate-y-0.5 hover:border-starlight/30 hover:shadow-glow"
    >
      <div class="grid gap-4 p-4 sm:grid-cols-[140px_1fr] sm:p-5">
        <img
          class="aspect-square w-full rounded-md object-cover sm:w-[140px]"
          :src="assetSrc(album.coverImage)"
          :alt="`${album.title} cover`"
        >

        <div class="flex min-w-0 flex-col">
          <div class="min-w-0">
            <p class="text-sm text-aurora-gold">{{ album.artist }}</p>
            <h2 class="mt-1 break-words font-display text-2xl leading-tight text-white">
              {{ album.title }}
            </h2>
            <p class="mt-2 text-sm text-silver">{{ formatDate(album.releaseDate) }}</p>
          </div>

          <div class="mt-4 flex flex-wrap gap-2 text-xs text-silver">
            <span class="rounded-full border border-white/10 bg-white/8 px-2 py-1">
              {{ trackCount(album.slug) }} tracks
            </span>
            <span class="rounded-full border border-white/10 bg-white/8 px-2 py-1">
              独立榜单
            </span>
          </div>

          <NuxtLink
            class="focus-ring mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-starlight px-4 text-sm font-semibold text-midnight-950 transition hover:bg-white sm:self-start"
            :to="{ path: actionPath, query: { album: album.slug } }"
          >
            <PenLine v-if="action === 'rate'" class="size-4" />
            <BarChart3 v-else class="size-4" />
            {{ actionLabel }}
          </NuxtLink>
        </div>
      </div>
    </article>
  </section>
</template>

<script setup lang="ts">
import { BarChart3, PenLine } from 'lucide-vue-next'
import type { Album } from '~/types/rating'
import { getAlbumTracks } from '~/lib/constants'

const props = defineProps<{
  albums: Album[]
  action: 'rate' | 'results'
}>()

const actionPath = computed(() => (props.action === 'rate' ? '/rate' : '/results'))
const actionLabel = computed(() => (props.action === 'rate' ? '开始打分' : '查看榜单'))
const config = useRuntimeConfig()

function assetSrc(path: string) {
  const baseURL = config.app.baseURL || '/'
  return `${baseURL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`
}

function trackCount(albumSlug: string) {
  return getAlbumTracks(albumSlug).length
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(new Date(value))
}
</script>
