/// <reference types="vitest" />

import angular from '@analogjs/vite-plugin-angular';
import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vite';
import viteTsConfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [angular(), viteTsConfigPaths()],

  test: {
    globals: true,

    browser: {
      enabled: true,
      provider: playwright(),
      instances: [{ browser: 'chromium', headless: false }]
    },

    setupFiles: ['src/test-setup.ts'],
    include: ['**/*.spec.ts'],
    reporters: ['default']
  },
  define: {
    'import.meta.vitest': mode !== 'production'
  }
}));
