import { test, expect } from '@playwright/test';
import { CLIENT_INPUT_1 } from './mocks/users.mock';

const { email, password } = CLIENT_INPUT_1;

test.describe('Transaction Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Login first
    await page.goto('/login');
    await page.getByTestId('login-input').fill(email);
    await page.getByTestId('password-input').fill(password);
    await page.getByTestId('login-button').click();

    await expect(page).toHaveURL('/dashboard');
  });

  test('should make a transfer successfully', async ({ page }) => {
    // Check initial balance
    const initialBalanceText = await page
      .locator('.card')
      .filter({ hasText: 'Available Balance' })
      .locator('div')
      .innerText();
    const initialBalance = parseFloat(initialBalanceText.replace(' PLN', ''));

    // Go to transfer page
    await page.getByRole('button', { name: 'Make Transfer' }).click();
    await expect(page).toHaveURL('/send-money');

    await page.getByRole('textbox').first().fill('Janusz');
    await page.getByRole('textbox').nth(1).fill('Zwrot');
    await page.getByRole('spinbutton').fill('100');

    await page.getByRole('button', { name: 'Send Transfer' }).click();

    await page.waitForTimeout(2000);

    // Should redirect to dashboard
    await expect(page).toHaveURL('/dashboard');

    await page.getByText('Make Transfer').click();
    await page.getByRole('button', { name: 'Send Transfer' }).click();

    await page.getByRole('button', { name: 'Cancel' }).click();
    // Check new balance
    const balanceLocator = page
      .locator('.card')
      .filter({ hasText: 'Available Balance' })
      .locator('div');
    await expect(balanceLocator).not.toHaveText(initialBalanceText);
    await expect(balanceLocator).toContainText('PLN');
    const newBalanceText = await balanceLocator.innerText();
    const newBalance = parseFloat(newBalanceText.replace(' PLN', ''));
    await page.goto('chrome-error://chromewebdata/');
    expect(newBalance).toBe(initialBalance - 100);
  });

  test('should show error with invalid amount', async ({ page }) => {
    // Go to transfer page
    await page.getByRole('button', { name: 'Make Transfer' }).click();
    await expect(page).toHaveURL('/send-money');

    // Fill transfer form with invalid amount
    await page.getByLabel('Recipient Name').fill('Janusz');
    await page.getByLabel('Title').fill('Zwrot');
    await page.getByLabel('Amount').fill('-100');
    await page.getByRole('button', { name: 'Send Transfer' }).click();

    // Should show error
    await expect(page.locator('.error-text')).toBeVisible();
  });

  test('should show error with insufficient funds', async ({ page }) => {
    // Go to transfer page
    await page.getByRole('button', { name: 'Make Transfer' }).click();
    await expect(page).toHaveURL('/send-money');

    // Fill transfer form with insufficient funds
    await page.getByLabel('Recipient Name').fill('Janusz');
    await page.getByLabel('Title').fill('Zwrot');
    await page.getByLabel('Amount').fill('10000');
    await page.getByRole('button', { name: 'Send Transfer' }).click();

    // Should show error
    await expect(page.locator('.error-text')).toBeVisible();
  });
});
