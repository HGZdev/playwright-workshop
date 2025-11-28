import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'list',
  /** Timeout for each test */
  timeout: 20000, // default is 30000

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: 'http://localhost:5173',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'setup',
      testMatch: 'global.setup.ts',
    },
    {
      name: 'smoke',
      dependencies: ['setup'],
      testMatch: 'smoke.spec.ts',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'userAuth',
      dependencies: ['smoke'],
      testMatch: 'userAuth.spec.ts',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'adminAuth',
      dependencies: ['smoke'],
      testMatch: 'adminAuth.spec.ts',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'moneyTransfers',
      dependencies: ['smoke'],
      testMatch: 'moneyTransfers.spec.ts',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'moneyAdditions',
      dependencies: ['smoke'],
      testMatch: 'moneyAdditions.spec.ts',
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
