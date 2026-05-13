import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: [
    './app/app.vue',
    './app/components/**/*.{vue,js,ts}',
    './app/composables/**/*.{js,ts}',
    './app/layouts/**/*.vue',
    './app/pages/**/*.vue',
    './app/plugins/**/*.{js,ts}'
  ],
  theme: {
    extend: {
      colors: {
        midnight: {
          950: '#060913',
          900: '#0b1024',
          800: '#111936',
          700: '#17234a',
          600: '#22336a'
        },
        starlight: '#e7edf8',
        silver: '#bfc7d8',
        violet: {
          haze: '#7c6aa6',
          deep: '#4b356d'
        },
        aurora: {
          rose: '#d7a4b8',
          gold: '#d6bd7b'
        }
      },
      fontFamily: {
        display: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'sans-serif']
      },
      boxShadow: {
        glow: '0 0 36px rgba(191, 199, 216, 0.2)',
        card: '0 18px 70px rgba(0, 0, 0, 0.32)'
      },
      backgroundImage: {
        'midnight-sky':
          'linear-gradient(145deg, #060913 0%, #111936 42%, #2d244a 72%, #101528 100%)'
      }
    }
  },
  plugins: []
}
