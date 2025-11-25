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
      testMatch: /.*\.setup\.ts/,
    },
    {
      name: 'smoke',
      testMatch: 'smoke.spec.ts',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'login',
      testMatch: 'login.spec.ts',
      dependencies: ['smoke'],
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'transfer',
      testMatch: 'transfer.spec.ts',
      dependencies: ['login'],
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'register',
      testMatch: 'register.spec.ts',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'admin',
      testMatch: 'admin.spec.ts',
      dependencies: ['login'], // Admin tests require login, but we handle it in the test. However, keeping dependencies might be good for order.
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  /* Run your local dev server before starting the tests */
  webServer: [
    {
      command: 'npm run dev:server',
      port: 3001,
      reuseExistingServer: true,
    },
    {
      command: 'npm run dev:client',
      port: 5173,
      reuseExistingServer: true,
    },
  ],
});
