import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom'],
  treeshake: true,
  splitting: false,
  // Injects CSS into the JS bundle at runtime (creates a <style> tag on import).
  // For SSR: set injectStyle: false and import './dist/index.css' in the consumer.
  injectStyle: true,
})
