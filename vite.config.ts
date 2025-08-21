/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'; // ✅ Fix here (tailwindcss is not a Vite plugin)

// Node.js utilities to replicate __dirname in ESM
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// 🧠 Recreate __dirname (because ESM doesn't support __dirname directly)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';

// ✅ Final working config
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  test: {
    projects: [
      {
        extends: true,
        plugins: [
          storybookTest({
            configDir: path.join(__dirname, '.storybook'),
          }),
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: 'playwright',
            instances: [
              {
                browser: 'chromium',
              },
            ],
          },
          setupFiles: ['.storybook/vitest.setup.ts'],
        },
      },
    ],
  },
});
