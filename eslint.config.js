import { defineConfig } from 'eslint/config'
import eslintConfigK8 from 'eslint-config-k8'

export default defineConfig([
  { ignores: ['**/dist/**', '**/storybook-static/**', '**/coverage/**'] },
  { extends: [eslintConfigK8] },
  {
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
])
