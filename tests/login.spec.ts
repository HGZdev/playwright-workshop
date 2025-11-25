import { test, expect } from '@playwright/test';

test.describe('Login Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    await page.getByTestId('login-input').fill('user1');
    await page.getByTestId('password-input').fill('password');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('.card').filter({ hasText: 'Available Balance' })).toBeVisible();
  });

  test('should show error with invalid credentials', async ({ page }) => {
    await page.getByTestId('login-input').fill('wrong');
    await page.getByTestId('password-input').fill('wrong');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByTestId('error-message')).toBeVisible();
    await expect(page.getByTestId('error-message')).toHaveText('Invalid credentials');
  });
});

test('user can log in', async ({ page }) => {
  await page.goto('/login', { waitUntil: 'networkidle' });

  await page.getByTestId('login-form').getByLabel('Username').fill('user1');
  await page.getByTestId('login-form').getByLabel('Password').fill('password');

  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(/\/dashboard/);
  await expect(page.getByText('Welcome')).toBeVisible();
});
