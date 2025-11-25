import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: 'line',
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'setup',
      testMatch: 'global.setup.ts',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'smoke',
      dependencies: ['setup'],
      testMatch: 'smoke.spec.ts',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'register',
      dependencies: ['smoke'],
      testMatch: 'register.spec.ts',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'login',
      dependencies: ['smoke', 'register'],
      testMatch: 'login.spec.ts',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'transactions',
      dependencies: ['login'],
      testMatch: 'transactions.spec.ts',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'admin',
      dependencies: ['login'],
      testMatch: 'admin.spec.ts',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  /* Run your local dev server before starting the tests */
  webServer: [
    {
      command: 'npm run dev:test',
      reuseExistingServer: true,
    },
  ],
});
