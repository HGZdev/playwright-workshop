import { test } from '@playwright/test';

test.describe('Money Addition Flows', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should add money successfully', async () => {});

  test('should show all errors when submitting empty form', async () => {});
});
