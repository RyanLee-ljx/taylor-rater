<template>
  <div class="min-h-dvh" :style="themeVars">
    <StarfieldBackground :image-src="loginBackgroundSrc" :show-image="isLoginPage" />

    <header class="sticky top-0 z-30 border-b bg-[color:var(--album-header)] backdrop-blur-xl">
      <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <NuxtLink to="/" class="focus-ring flex items-center gap-3 rounded-md">
          <span class="grid size-9 place-items-center rounded-full border bg-white/8 text-[color:var(--album-accent-2)]">
            <Sparkles class="size-4" />
          </span>
          <span class="leading-tight">
            <span class="block font-display text-lg text-[color:var(--album-text)]">Taylor Rater</span>
            <span class="block text-xs text-[color:var(--album-muted)]">Taylor album 评分局</span>
          </span>
        </NuxtLink>

        <nav class="flex items-center gap-2 text-sm text-[color:var(--album-muted)]">
          <NuxtLink
            to="/rate"
            class="focus-ring rounded-full px-3 py-2 transition hover:bg-white/10 hover:text-[color:var(--album-text)]"
          >
            打分
          </NuxtLink>
          <NuxtLink
            to="/results"
            class="focus-ring rounded-full px-3 py-2 transition hover:bg-white/10 hover:text-[color:var(--album-text)]"
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
import { DEFAULT_ALBUM_THEME, LOGIN_THEME, findAlbumBySlug } from '~/lib/constants'

const route = useRoute()

const routeAlbumSlug = computed(() => {
  const value = Array.isArray(route.query.album) ? route.query.album[0] : route.query.album
  return typeof value === 'string' ? value : null
})

const isLoginPage = computed(() => route.path === '/')
const activeTheme = computed(() => {
  if (isLoginPage.value) {
    return LOGIN_THEME
  }

  return findAlbumBySlug(routeAlbumSlug.value)?.theme || DEFAULT_ALBUM_THEME
})
const loginBackgroundSrc = usePublicAsset('/images/background.jpg')

const themeVars = computed<Record<string, string>>(() => ({
  '--album-bg': isLoginPage.value ? 'transparent' : activeTheme.value.bg,
  '--album-bg-2': isLoginPage.value ? 'transparent' : activeTheme.value.bg2,
  '--album-bg-3': isLoginPage.value ? 'transparent' : activeTheme.value.bg3,
  '--album-panel': activeTheme.value.panel,
  '--album-panel-2': activeTheme.value.panel2,
  '--album-border': activeTheme.value.border,
  '--album-text': activeTheme.value.text,
  '--album-muted': activeTheme.value.muted,
  '--album-accent': activeTheme.value.accent,
  '--album-accent-2': activeTheme.value.accent2,
  '--album-selection': activeTheme.value.selection,
  '--album-header': activeTheme.value.header,
  '--album-input': activeTheme.value.input,
  '--album-input-text': activeTheme.value.inputText,
  '--album-placeholder': activeTheme.value.placeholder
}))

const themeStyle = computed(() =>
  Object.entries(themeVars.value).map(([key, value]) => `${key}:${value}`).join(';')
)

useHead(() => ({
  htmlAttrs: {
    style: themeStyle.value
  },
  bodyAttrs: {
    style: themeStyle.value
  }
}))
</script>
