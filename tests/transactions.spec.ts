import { test, expect } from '@playwright/test';
import { generateUserInput } from './mocks/users.mock';
import UserAuthPage from './page-objects-models/UserAuthPage';
import { UserInput } from '../_server/database/types';
import { Page } from '@playwright/test';

const getBalance = async ({ page }: { page: Page }) => {
  const text = await page.getByTestId('balance-amount').textContent();
  return parseFloat(text?.replace(/[^\d,-]/g, '').replace(',', '.') || '0');
};

test.describe('Transaction Flow', () => {
  let userAuthPage: UserAuthPage;
  let user1: UserInput;

  test.beforeEach(async ({ page }) => {
    user1 = generateUserInput('Anna', 'client');
    userAuthPage = new UserAuthPage(page);
    await userAuthPage.register(user1);
    await userAuthPage.login(user1);

    await expect(page).toHaveURL('/dashboard');
    await expect(page.getByRole('heading', { name: 'Dostępne saldo' })).toBeVisible();
    await expect(page.getByTestId('balance-amount')).toContainText('zł');
  });

  test.describe('Add money', () => {
    test('should add money successfully', async ({ page }) => {
      const balanceBefore = await getBalance({ page });

      console.log('Balance before:', balanceBefore);

      await page.getByRole('button', { name: 'Doładuj saldo konta' }).click();

      await page.waitForURL('/add-money');

      await page.getByRole('textbox', { name: 'Tytuł' }).fill('Spadek');
      await page.getByRole('spinbutton', { name: 'Kwota' }).fill('1000');
      await page.getByRole('button', { name: 'Doładuj' }).click();

      await page.waitForURL('/dashboard');

      await expect(page.getByTestId('balance-amount')).toContainText('zł');
      const balanceAfter = await getBalance({ page });

      expect(balanceAfter - balanceBefore).toBe(1000);
    });
  });

  test.describe('Add money - validation', () => {
    test('should show error when title is empty on blur', async ({ page }) => {
      await page.getByRole('button', { name: 'Doładuj saldo konta' }).click();
      await page.waitForURL('/add-money');

      // Focus and blur title field without entering anything
      await page.getByRole('textbox', { name: 'Tytuł' }).focus();
      await page.getByRole('textbox', { name: 'Tytuł' }).blur();

      // Error should appear
      await expect(page.getByText('Tytuł jest wymagany')).toBeVisible();
    });

    test('should hide title error when user starts typing', async ({ page }) => {
      await page.getByRole('button', { name: 'Doładuj saldo konta' }).click();
      await page.waitForURL('/add-money');

      // Trigger error
      await page.getByRole('textbox', { name: 'Tytuł' }).focus();
      await page.getByRole('textbox', { name: 'Tytuł' }).blur();
      await expect(page.getByText('Tytuł jest wymagany')).toBeVisible();

      // Start typing - error should disappear
      await page.getByRole('textbox', { name: 'Tytuł' }).fill('Test');
      await expect(page.getByText('Tytuł jest wymagany')).not.toBeVisible();
    });

    test('should show error when amount is empty on blur', async ({ page }) => {
      await page.getByRole('button', { name: 'Doładuj saldo konta' }).click();
      await page.waitForURL('/add-money');

      // Focus and blur amount field without entering anything
      await page.getByRole('spinbutton', { name: 'Kwota' }).focus();
      await page.getByRole('spinbutton', { name: 'Kwota' }).blur();

      // Error should appear
      await expect(page.getByText('Kwota jest wymagana')).toBeVisible();
    });

    test('should show error when amount is zero or negative', async ({ page }) => {
      await page.getByRole('button', { name: 'Doładuj saldo konta' }).click();
      await page.waitForURL('/add-money');

      // Enter zero
      await page.getByRole('spinbutton', { name: 'Kwota' }).fill('0');
      await page.getByRole('spinbutton', { name: 'Kwota' }).blur();
      await expect(page.getByText('Kwota musi być dodatnia')).toBeVisible();

      // Enter negative number
      await page.getByRole('spinbutton', { name: 'Kwota' }).fill('-50');
      await page.getByRole('spinbutton', { name: 'Kwota' }).blur();
      await expect(page.getByText('Kwota musi być dodatnia')).toBeVisible();
    });

    test('should hide amount error when user enters valid amount', async ({ page }) => {
      await page.getByRole('button', { name: 'Doładuj saldo konta' }).click();
      await page.waitForURL('/add-money');

      // Trigger error with zero
      await page.getByRole('spinbutton', { name: 'Kwota' }).fill('0');
      await page.getByRole('spinbutton', { name: 'Kwota' }).blur();
      await expect(page.getByText('Kwota musi być dodatnia')).toBeVisible();

      // Enter valid amount - error should disappear
      await page.getByRole('spinbutton', { name: 'Kwota' }).fill('100');
      await expect(page.getByText('Kwota musi być dodatnia')).not.toBeVisible();
    });

    test('should show all errors when submitting empty form', async ({ page }) => {
      await page.getByRole('button', { name: 'Doładuj saldo konta' }).click();
      await page.waitForURL('/add-money');

      await page.getByRole('button', { name: 'Doładuj' }).click({ delay: 4000 });

      // All errors should appear
      await expect(page.getByText('Tytuł jest wymagany')).toBeVisible();
      await expect(page.getByText('Kwota jest wymagana')).toBeVisible();
    });
  });

  test.describe('Transfer money', () => {
    test('should make a transfer successfully', async ({ page }) => {
      const balanceBefore = await getBalance({ page });

      await page.getByRole('button', { name: 'Wykonaj przelew' }).click();
      await page.waitForURL('/send-money');

      await page.getByRole('textbox', { name: 'Odbiorca' }).fill('Sklep');
      await page.getByRole('textbox', { name: 'Tytuł' }).fill('Wydatek');
      await page.getByRole('spinbutton', { name: 'Kwota' }).fill('100');

      await page.getByRole('button', { name: 'Wyślij przelew' }).click({ delay: 4000 });

      await page.waitForURL('/dashboard');

      await expect(page.getByTestId('balance-amount')).toContainText('zł');
      const balanceAfter = await getBalance({ page });

      expect(balanceAfter - balanceBefore).toBe(-100);
    });
  });

  test.describe('Transfer money - validation', () => {
    test('should show error when recipient is empty on blur', async ({ page }) => {
      await page.getByRole('button', { name: 'Wykonaj przelew' }).click();
      await page.waitForURL('/send-money');

      // Focus and blur recipient field without entering anything
      await page.getByRole('textbox', { name: 'Odbiorca' }).focus();
      await page.getByRole('textbox', { name: 'Odbiorca' }).blur();

      // Error should appear
      await expect(page.getByText('Odbiorca jest wymagany')).toBeVisible();
    });

    test('should hide recipient error when user starts typing', async ({ page }) => {
      await page.getByRole('button', { name: 'Wykonaj przelew' }).click();
      await page.waitForURL('/send-money');

      // Trigger error
      await page.getByRole('textbox', { name: 'Odbiorca' }).focus();
      await page.getByRole('textbox', { name: 'Odbiorca' }).blur();
      await expect(page.getByText('Odbiorca jest wymagany')).toBeVisible();

      // Start typing - error should disappear
      await page.getByRole('textbox', { name: 'Odbiorca' }).fill('Shop');
      await expect(page.getByText('Odbiorca jest wymagany')).not.toBeVisible();
    });

    test('should show error when title is empty on blur', async ({ page }) => {
      await page.getByRole('button', { name: 'Wykonaj przelew' }).click();
      await page.waitForURL('/send-money');

      // Focus and blur title field without entering anything
      await page.getByRole('textbox', { name: 'Tytuł' }).focus();
      await page.getByRole('textbox', { name: 'Tytuł' }).blur();

      // Error should appear
      await expect(page.getByText('Tytuł jest wymagany')).toBeVisible();
    });

    test('should hide title error when user starts typing', async ({ page }) => {
      await page.getByRole('button', { name: 'Wykonaj przelew' }).click();
      await page.waitForURL('/send-money');

      // Trigger error
      await page.getByRole('textbox', { name: 'Tytuł' }).focus();
      await page.getByRole('textbox', { name: 'Tytuł' }).blur();
      await expect(page.getByText('Tytuł jest wymagany')).toBeVisible();

      // Start typing - error should disappear
      await page.getByRole('textbox', { name: 'Tytuł' }).fill('Payment');
      await expect(page.getByText('Tytuł jest wymagany')).not.toBeVisible();
    });

    test('should show error when amount is empty on blur', async ({ page }) => {
      await page.getByRole('button', { name: 'Wykonaj przelew' }).click();
      await page.waitForURL('/send-money');

      // Focus and blur amount field without entering anything
      await page.getByRole('spinbutton', { name: 'Kwota' }).focus();
      await page.getByRole('spinbutton', { name: 'Kwota' }).blur();

      // Error should appear
      await expect(page.getByText('Kwota jest wymagana')).toBeVisible();
    });

    test('should show error when amount is zero or negative', async ({ page }) => {
      await page.getByRole('button', { name: 'Wykonaj przelew' }).click();
      await page.waitForURL('/send-money');

      // Enter zero
      await page.getByRole('spinbutton', { name: 'Kwota' }).fill('0');
      await page.getByRole('spinbutton', { name: 'Kwota' }).blur();
      await expect(page.getByText('Kwota musi być dodatnia')).toBeVisible();

      // Enter negative number
      await page.getByRole('spinbutton', { name: 'Kwota' }).fill('-50');
      await page.getByRole('spinbutton', { name: 'Kwota' }).blur();
      await expect(page.getByText('Kwota musi być dodatnia')).toBeVisible();
    });

    test('should hide amount error when user enters valid amount', async ({ page }) => {
      await page.getByRole('button', { name: 'Wykonaj przelew' }).click();
      await page.waitForURL('/send-money');

      // Trigger error with zero
      await page.getByRole('spinbutton', { name: 'Kwota' }).fill('0');
      await page.getByRole('spinbutton', { name: 'Kwota' }).blur();
      await expect(page.getByText('Kwota musi być dodatnia')).toBeVisible();

      // Enter valid amount - error should disappear
      await page.getByRole('spinbutton', { name: 'Kwota' }).fill('50');
      await expect(page.getByText('Kwota musi być dodatnia')).not.toBeVisible();
    });

    test('should show all errors when submitting empty form', async ({ page }) => {
      await page.getByRole('button', { name: 'Wykonaj przelew' }).click();
      await page.waitForURL('/send-money');

      // Try to submit empty form
      await page.getByRole('button', { name: 'Wyślij przelew' }).click({ delay: 4000 });

      // All errors should appear
      await expect(page.getByText('Odbiorca jest wymagany')).toBeVisible();
      await expect(page.getByText('Tytuł jest wymagany')).toBeVisible();
      await expect(page.getByText('Kwota jest wymagana')).toBeVisible();
    });
  });
});
