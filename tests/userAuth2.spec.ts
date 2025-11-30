import test, { expect } from 'playwright/test';
import userGen from './utils/userGen';

test.describe('User Registration and Login Flow - version 2', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.waitForURL('/login');
  });

  test('should register a new user successfully', async ({ page }) => {
    // const user = userGen();
  });

  test('should show error if email already exists', async ({ page }) => {
    // const user = userGen();
  });
});
