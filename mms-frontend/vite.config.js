import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
        'components': path.resolve(__dirname, './src/components'),
        'assets': path.resolve(__dirname, './src/assets'),
        'stylesheets': path.resolve(__dirname, './src/stylesheets'),
        'routers': path.resolve(__dirname, './src/routers'),
        'stores': path.resolve(__dirname, './src/stores')
    }
  },
  css: {
     preprocessorOptions: {
        scss: {
          silenceDeprecations: [
            'import',
            'mixed-decls',
            'color-functions',
            'global-builtin',
          ],
        },
     },
  },
})
