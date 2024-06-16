import { fileURLToPath, URL } from 'node:url'
import inject from '@rollup/plugin-inject';

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    // Include specific files
    include: ['./src/**/*.css', 'vue-multiselect/dist/vue-multiselect.min.css',],
  },
  plugins: [
    vue(),
    inject({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default'],
      exclude: '**/*.css',
    }),
  ],
  build: {
    envDir: './',
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@apis': fileURLToPath(new URL('./src/apis', import.meta.url)),
      '@utils': fileURLToPath(new URL('./src/utils', import.meta.url))

    }
  }
})
