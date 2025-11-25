import { test, expect } from '@playwright/test';
import { CLIENT_INPUT_1 } from './mocks/users.mock';

const user1 = {
  ...CLIENT_INPUT_1,
  email: new Date().getTime() + '_' + CLIENT_INPUT_1.email,
};
console.log({ user1 });

test.describe('Registration Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should register a new user successfully', async ({ page }) => {
    await page.getByRole('link', { name: 'Register new account' }).click();
    await page.waitForURL('/register');

    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill(user1.email);
    await page.getByRole('textbox', { name: 'Password' }).fill(user1.password);
    await page.getByRole('textbox', { name: 'Full Name' }).fill(user1.name);
    await page.getByRole('button', { name: 'Register' }).click();

    await page.waitForURL('/login');

    await page.getByRole('textbox', { name: 'Email' }).fill(user1.email);
    await page.getByRole('textbox', { name: 'Password' }).fill(user1.password);
    await page.getByRole('button', { name: 'Login' }).click();

    await page.waitForURL('/dashboard');
  });

  test('should show error if email already exists', async ({ page }) => {
    await page.getByRole('link', { name: 'Register new account' }).click();
    await page.waitForURL('/register');

    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill(user1.email);
    await page.getByRole('textbox', { name: 'Password' }).fill(user1.password);
    await page.getByRole('textbox', { name: 'Full Name' }).fill(user1.name);
    await page.getByRole('button', { name: 'Register' }).click();

    await expect(page.locator('.error-text')).toHaveText('Email already exists');
  });
});
