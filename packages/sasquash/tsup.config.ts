import { defineConfig } from 'tsup'

export default defineConfig([
  {
    entry: ['src/index.ts'],
    format: ['esm', 'cjs'],
    dts: true,
    outDir: 'dist',
    clean: true,
  },
  {
    entry: ['bin/index.ts'],
    format: ['cjs'],
    outDir: 'dist',
    outExtension({ format }) {
      return { js: format === 'cjs' ? '.cli.js' : '.js' }
    },
  },
])
