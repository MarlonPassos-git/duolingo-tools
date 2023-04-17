import { crx } from '@crxjs/vite-plugin'
import manifest from './manifest.json'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [
    crx({ manifest }),
  ],
  test: {
    globals: true,
    environment: 'happy-dom',
  }
})
