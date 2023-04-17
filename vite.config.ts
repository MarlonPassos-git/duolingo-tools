import { crx } from '@crxjs/vite-plugin'
import manifest from './manifest.json'
import { defineConfig } from 'vitest/config'
import eslint from 'vite-plugin-eslint'

export default defineConfig({
  plugins: [
    crx({ manifest }),
    eslint(),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
  }
})
