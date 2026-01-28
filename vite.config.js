import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

export default defineConfig(() => {
  return {
    plugins: [
      vue(),
      dts({
        include: ['./packages', './src'],
        outDir: './dist',
        insertTypesEntry: true,
        rollupTypes: true
      })
    ],
    build: {
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'DrawStudio',
        formats: ['es', 'umd', 'cjs']
      },
      rollupOptions: {
        external: ['vue'],
        output: {
          globals: {
            vue: 'Vue'
          }
        }
      }
    }
  }
})
