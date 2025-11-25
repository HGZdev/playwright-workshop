import { test, expect } from '@playwright/test';

test.describe('Registration Flow', () => {
  test('should register a new user successfully', async ({ page }) => {
    await page.goto('/register');

    const username = `testuser_${Date.now()}`;
    await page.getByLabel('Username').fill(username);
    await page.getByLabel('Password').fill('password123');
    await page.getByLabel('Full Name').fill('Test User');
    await page.getByRole('button', { name: 'Register' }).click();

    await expect(page).toHaveURL('/login');

    // Try to login with new user
    await page.getByTestId('login-input').fill(username);
    await page.getByTestId('password-input').fill('password123');
    await page.getByTestId('login-button').click();

    await expect(page).toHaveURL('/dashboard');
    await expect(page.getByText('Welcome')).toBeVisible();
  });

  test('should show error if username already exists', async ({ page }) => {
    await page.goto('/register');

    await page.getByLabel('Username').fill('user1'); // Existing user
    await page.getByLabel('Password').fill('password');
    await page.getByLabel('Full Name').fill('Duplicate User');
    await page.getByRole('button', { name: 'Register' }).click();

    await expect(page.locator('.error-text')).toHaveText('Username already exists');
  });

  test('should show validation errors for empty fields', async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    await page.getByTestId('login-input').click();
    await page.getByTestId('login-input').fill('hej');
    await page.getByTestId('login-form').locator('div').filter({ hasText: 'Password' }).click();
    await page.getByTestId('password-input').click();
    await page.getByTestId('password-input').fill('hej');
    await page.getByTestId('login-button').click();
    await page.getByRole('link', { name: 'Register new account' }).click();
    await page.getByRole('textbox', { name: 'Username' }).click();
    await page.getByRole('textbox', { name: 'Username' }).fill('hej');
    await page.getByRole('textbox', { name: 'Username' }).press('Tab');
    await page.getByRole('textbox', { name: 'Password' }).fill('hej');
    await page.getByRole('textbox', { name: 'Password' }).press('Tab');
    await page.getByRole('textbox', { name: 'Full Name' }).fill('hej');
    await page.getByRole('button', { name: 'Register' }).click();
    await page.getByTestId('login-input').click();
    await page.getByTestId('login-input').fill('hej');
    await page.getByTestId('login-input').press('Tab');
    await page.getByTestId('password-input').fill('hej');
    await page.getByTestId('login-button').click();
    await page.getByRole('button', { name: 'Make Transfer' }).click();
    await page.getByRole('textbox').first().click();
    await page.getByRole('textbox').first().fill('a');
    await page.getByRole('textbox').nth(1).click();
    await page.getByRole('textbox').nth(1).fill('a');
    await page.getByRole('spinbutton').click();
    await page.getByRole('spinbutton').fill('10');
    await page.getByRole('button', { name: 'Send Transfer' }).click();
  });
});
