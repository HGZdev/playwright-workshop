import { test, expect } from '@playwright/test';
import { generateUserInput } from './mocks/users.mock';
import UserAuthPage from './page-objects/UserAuthPage';
import { UserInput } from '../_server/database/types';

test.describe('Transaction Flow', () => {
  let userAuthPage: UserAuthPage;
  let user1: UserInput;

  test.beforeEach(async ({ page }) => {
    user1 = generateUserInput('Maria Sklodowska-Curie', 'client');
    userAuthPage = new UserAuthPage(page);
    await userAuthPage.registerUser(user1);
    await userAuthPage.loginUser(user1);
  });

  test.describe('Add money', () => {
    test('should add money successfully', async ({ page }) => {
      await expect(page).toHaveURL('/dashboard');

      await expect(page.getByRole('heading', { name: 'Available Balance' })).toBeVisible();
      await expect(page.getByTestId('balance-amount')).toContainText('zł');

      const balanceBefore = (await page.getByTestId('balance-amount').textContent())?.split(
        ' zł',
      )[0];

      await page.getByRole('button', { name: 'Top up your account balance' }).click();
      await page.waitForURL('/add-money');

      await page.getByRole('textbox', { name: 'Title' }).fill('Spadek');
      await page.getByRole('spinbutton', { name: 'Amount' }).fill('1000');

      await page.waitForTimeout(4000);
      await page.getByRole('button', { name: 'Add Money' }).click();

      await page.waitForURL('/dashboard');

      await expect(page.getByTestId('balance-amount')).toContainText('zł');
      const balanceAfter = (await page.getByTestId('balance-amount').textContent())?.split(
        ' zł',
      )[0];

      expect(parseFloat(balanceAfter || '') - parseFloat(balanceBefore || '')).toBe(1000);
    });
  });

  test.describe('Transfer money', () => {
    test('should make a transfer successfully', async ({ page }) => {
      await expect(page).toHaveURL('/dashboard');

      await expect(page.getByRole('heading', { name: 'Available Balance' })).toBeVisible();
      await expect(page.getByTestId('balance-amount')).toContainText('zł');

      const balanceBefore = (await page.getByTestId('balance-amount').textContent())?.split(
        ' zł',
      )[0];

      await page.getByRole('button', { name: 'Make a money transfer' }).click();
      await page.waitForURL('/send-money');

      await page.getByRole('textbox', { name: 'Recipient' }).fill('Sklep');
      await page.getByRole('textbox', { name: 'Title' }).fill('Wydatek');
      await page.getByRole('spinbutton', { name: 'Amount' }).fill('100');

      await page.waitForTimeout(4000);
      await page.getByRole('button', { name: 'Send Transfer' }).click();

      await page.waitForURL('/dashboard');

      await expect(page.getByTestId('balance-amount')).toContainText('zł');
      const balanceAfter = (await page.getByTestId('balance-amount').textContent())?.split(
        ' zł',
      )[0];

      expect(parseFloat(balanceAfter || '') - parseFloat(balanceBefore || '')).toBe(-100);
    });
  });
});
