import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext',
    lib: {
      entry: 'src/index.ts',
      formats: ['es', 'cjs'],
      name: 'sasquash',
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
    },
  },
})
