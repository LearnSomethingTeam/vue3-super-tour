import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/lib.ts'),
      name: 'Vue3SuperTour'
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        assetFileNames: `vue3-super-tour.[ext]`,
        globals: {
          vue: 'Vue'
        }
      }
    }
  },
  plugins: [vue()]
})
