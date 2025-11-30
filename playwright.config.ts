import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'list',
  /* optional explicit artifact root to stabilize paths */
  outputDir: 'test-results',
  /** Timeout for each test */
  timeout: 20000, // default is 30000

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    baseURL: 'http://localhost:5173',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'smoke',
      testMatch: 'smoke.spec.ts',
      use: { ...devices['Desktop Chrome'] },
    },
    // {
    //   name: 'userAuth',
    //   dependencies: ['smoke'],
    //   testMatch: 'userAuth*.spec.ts',
    //   use: { ...devices['Desktop Chrome'] },
    // },
    // {
    //   name: 'moneyAddition',
    //   dependencies: ['smoke'],
    //   testMatch: 'moneyAddition.spec.ts',
    //   use: { ...devices['Desktop Chrome'] },
    // },
    // {
    //   name: 'moneySending',
    //   dependencies: ['smoke'],
    //   testMatch: 'moneySending.spec.ts',
    //   use: { ...devices['Desktop Chrome'] },
    // },
  ],

  /* Run your local dev server before starting the tests */
  webServer: [
    {
      command: 'npm run dev',
      url: 'http://localhost:5173',
      reuseExistingServer: !process.env.CI,
    },
  ],
});
