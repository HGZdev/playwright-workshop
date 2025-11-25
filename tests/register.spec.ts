import { test, expect } from '@playwright/test';
import { CLIENT_INPUT_1 } from './mocks/users.mock';

const { username, password, name } = CLIENT_INPUT_1;

test.describe('Registration Flow', () => {
  test('should register a new user successfully', async ({ page }) => {
    await page.goto('/register');

    await page.getByLabel('Username').fill(username);
    await page.getByLabel('Password').fill(password);
    await page.getByLabel('Full Name').fill(name);
    await page.getByRole('button', { name: 'Register' }).click();

    await expect(page).toHaveURL('/login');

    // Try to login with new user
    await page.getByTestId('login-input').fill(username);
    await page.getByTestId('password-input').fill(password);
    await page.getByTestId('login-button').click();

    await expect(page).toHaveURL('/dashboard');
    await expect(page.getByText('Welcome')).toBeVisible();
  });

  test('should show error if username already exists', async ({ page }) => {
    await page.goto('/register');

    await page.getByLabel('Username').fill(username); // Existing user
    await page.getByLabel('Password').fill(password);
    await page.getByLabel('Full Name').fill(name);
    await page.getByRole('button', { name: 'Register' }).click();

    await expect(page.locator('.error-text')).toHaveText('Username already exists');
  });
});
