import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests-e2e',

  use: {
    baseURL: process.env.BASE_URL,
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  timeout: 30000,

  expect: {
    timeout: 5000,
  },

  reporter: [['list'], ['html']],
});