import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  build: {
    target: 'node18',
    lib: {
      entry: path.resolve(__dirname, 'src/bin/index.ts'),
      formats: ['cjs'],
      fileName: () => 'bin/index.js',
    },
    rollupOptions: {
      external: ['fs', 'path', 'url'],
    },
    outDir: 'dist',
  },
})
