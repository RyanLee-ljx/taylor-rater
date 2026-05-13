export default defineNuxtConfig({
  ssr: false,
  srcDir: 'app',
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/tailwind.css'],

  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || '/',
    head: {
      htmlAttrs: {
        lang: 'zh-CN'
      },
      title: 'Taylor Rater | Midnights',
      meta: [
        {
          name: 'description',
          content: '和朋友一起为 Taylor Swift 的 Midnights 曲目打分、短评并生成排行榜。'
        },
        {
          name: 'theme-color',
          content: '#111936'
        }
      ]
    }
  },

  runtimeConfig: {
    public: {
      supabaseUrl: process.env.NUXT_PUBLIC_SUPABASE_URL || '',
      supabasePublishableKey: process.env.NUXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || ''
    }
  },

  nitro: {
    prerender: {
      routes: ['/', '/rate', '/results']
    }
  },

  typescript: {
    strict: true
  },

  compatibilityDate: '2026-05-13'
})
