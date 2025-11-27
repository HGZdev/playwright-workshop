import { test, expect } from '@playwright/test';
import generateUserInput from './utils/userDataGenerator';
import { UserInput } from '../_server/database/types';
import RegistrationPage from './page-object-models/RegistrationPage';
import DashboardPage from './page-object-models/DashboardPage';
import LoginPage from './page-object-models/LoginPage';
import TransactionPage from './page-object-models/TransactionPage';

test.describe('Transaction Flow', () => {
  let registrationPage: RegistrationPage;
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;
  let transactionPage: TransactionPage;
  let user: UserInput;

  test.beforeEach(async ({ page }) => {
    registrationPage = new RegistrationPage(page);
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    transactionPage = new TransactionPage(page);

    user = generateUserInput('Anna', 'client');

    await page.goto('/');
    await loginPage.isLoginPageLoaded();
    await loginPage.goToRegistrationPage();
    await registrationPage.register(user);
    await loginPage.isLoginPageLoaded();
    await loginPage.login(user);
    await dashboardPage.isDashboardLoaded();
  });

  test.describe('Transfer money', () => {
    test('should make a transfer successfully', async () => {
      const balanceBefore = await dashboardPage.getBalance();

      await dashboardPage.goToTransferMoneyPage();
      await transactionPage.isTransferMoneyPageLoaded();

      await transactionPage.fillAndSubmitTransferMoneyForm({
        title: 'Wydatek',
        amount: 100,
        recipient: 'Sklep',
      });
      await dashboardPage.isDashboardLoaded();

      const balanceAfter = await dashboardPage.getBalance();

      expect(balanceAfter - balanceBefore).toBe(-100);
    });

    test('should show error when recipient is empty on blur', async ({ page }) => {
      await dashboardPage.goToTransferMoneyPage();
      await transactionPage.isTransferMoneyPageLoaded();

      // Focus and blur recipient field without entering anything
      await page.getByRole('textbox', { name: 'Odbiorca' }).focus();
      await page.getByRole('textbox', { name: 'Odbiorca' }).blur();

      // Error should appear
      await transactionPage.hasError('Odbiorca jest wymagany');
    });

    test('should hide recipient error when user starts typing', async ({ page }) => {
      await dashboardPage.goToTransferMoneyPage();
      await transactionPage.isTransferMoneyPageLoaded();

      // Trigger error
      await page.getByRole('textbox', { name: 'Odbiorca' }).focus();
      await page.getByRole('textbox', { name: 'Odbiorca' }).blur();
      await transactionPage.hasError('Odbiorca jest wymagany');

      // Start typing - error should disappear
      await page.getByRole('textbox', { name: 'Odbiorca' }).fill('Shop');
      await transactionPage.hasError('Odbiorca jest wymagany');
    });

    test('should show error when title is empty on blur', async ({ page }) => {
      await dashboardPage.goToTransferMoneyPage();
      await transactionPage.isTransferMoneyPageLoaded();

      // Focus and blur title field without entering anything
      await page.getByRole('textbox', { name: 'Tytuł' }).focus();
      await page.getByRole('textbox', { name: 'Tytuł' }).blur();

      // Error should appear
      await transactionPage.hasError('Tytuł jest wymagany');
    });

    test('should hide title error when user starts typing', async ({ page }) => {
      await dashboardPage.goToTransferMoneyPage();
      await transactionPage.isTransferMoneyPageLoaded();

      // Trigger error
      await page.getByRole('textbox', { name: 'Tytuł' }).focus();
      await page.getByRole('textbox', { name: 'Tytuł' }).blur();
      await transactionPage.hasError('Tytuł jest wymagany');

      // Start typing - error should disappear
      await page.getByRole('textbox', { name: 'Tytuł' }).fill('Payment');
      await transactionPage.hasError('Tytuł jest wymagany');
    });

    test('should show error when amount is empty on blur', async ({ page }) => {
      await dashboardPage.goToTransferMoneyPage();
      await transactionPage.isTransferMoneyPageLoaded();

      // Focus and blur amount field without entering anything
      await page.getByRole('spinbutton', { name: 'Kwota' }).focus();
      await page.getByRole('spinbutton', { name: 'Kwota' }).blur();

      // Error should appear
      await transactionPage.hasError('Kwota jest wymagana');
    });

    test('should show error when amount is zero or negative', async ({ page }) => {
      await page.getByRole('link', { name: 'Wykonaj przelew' }).click();
      await page.waitForURL('/send-money');

      // Enter zero
      await page.getByRole('spinbutton', { name: 'Kwota' }).fill('0');
      await page.getByRole('spinbutton', { name: 'Kwota' }).blur();
      await transactionPage.hasError('Kwota musi być dodatnia');

      // Enter negative number
      await page.getByRole('spinbutton', { name: 'Kwota' }).fill('-50');
      await page.getByRole('spinbutton', { name: 'Kwota' }).blur();
      await transactionPage.hasError('Kwota musi być dodatnia');
    });

    test('should hide amount error when user enters valid amount', async ({ page }) => {
      await dashboardPage.goToTransferMoneyPage();
      await transactionPage.isTransferMoneyPageLoaded();

      // Trigger error with zero
      await page.getByRole('spinbutton', { name: 'Kwota' }).fill('0');
      await page.getByRole('spinbutton', { name: 'Kwota' }).blur();
      await transactionPage.hasError('Kwota musi być dodatnia');

      // Enter valid amount - error should disappear
      await page.getByRole('spinbutton', { name: 'Kwota' }).fill('50');
      await transactionPage.hasError('Kwota musi być dodatnia');
    });

    test('should show all errors when submitting empty form', async ({ page }) => {
      await dashboardPage.goToTransferMoneyPage();
      await transactionPage.isTransferMoneyPageLoaded();

      // Try to submit empty form
      await page.getByRole('button', { name: 'Wyślij przelew' }).click({ delay: 4000 });

      // All errors should appear
      await transactionPage.hasError('Odbiorca jest wymagany');
      await transactionPage.hasError('Tytuł jest wymagany');
      await transactionPage.hasError('Kwota jest wymagana');
    });
  });

  test.describe('Add money (longlasting operations)', () => {
    test('should add money successfully - longer action timeout', async () => {
      const balanceBefore = await dashboardPage.getBalance();

      await dashboardPage.goToAddMoneyPage();
      await transactionPage.isAddMoneyPageLoaded();

      await transactionPage.fillAndSubmitAddMoneyForm({ title: 'Spadek', amount: 1000 });
      await dashboardPage.isDashboardLoaded(); // with longer timeout

      const balanceAfter = await dashboardPage.getBalance();

      expect(balanceAfter - balanceBefore).toBe(1000);
    });
    test('should add money 2 times successfully  - longer action and test timeout', async () => {
      test.setTimeout(30000);
      // first add money

      await dashboardPage.goToAddMoneyPage();
      await transactionPage.isAddMoneyPageLoaded();

      await transactionPage.fillAndSubmitAddMoneyForm({ title: 'Spadek', amount: 1000 });
      await dashboardPage.isDashboardLoaded(); // with longer timeout

      // second add money

      await dashboardPage.goToAddMoneyPage();
      await transactionPage.isAddMoneyPageLoaded();

      await transactionPage.fillAndSubmitAddMoneyForm({ title: 'Loteria', amount: 1000 });
      await dashboardPage.isDashboardLoaded(); // with longer timeout
    });

    test('should add money 2 times successfully  - mocked API', async ({ page }) => {
      // Mock ANY POST request to /api/transaction/* (using wildcard for ID)
      await page.route('**/api/transaction/**', async (route) => {
        const request = route.request();
        console.log('Route intercepted:', request.method(), request.url());

        // Only intercept POST requests
        if (request.method() === 'POST') {
          console.log('✅ Mocking POST request to:', request.url());
          await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({ success: true }),
          });
        } else {
          console.log('⏭️  Continuing non-POST request');
          await route.continue();
        }
      });

      // first add money

      await dashboardPage.goToAddMoneyPage();
      await transactionPage.isAddMoneyPageLoaded();

      await transactionPage.fillAndSubmitAddMoneyForm({ title: 'Spadek', amount: 1000 });
      await dashboardPage.isDashboardLoaded(); // with longer timeout

      // second add money

      await dashboardPage.goToAddMoneyPage();
      await transactionPage.isAddMoneyPageLoaded();

      await transactionPage.fillAndSubmitAddMoneyForm({ title: 'Loteria', amount: 1000 });
      await dashboardPage.isDashboardLoaded(); // with longer timeout
    });
  });

  test.describe('Add money - validation', () => {
    test('should show error when title is empty on blur', async ({ page }) => {
      await dashboardPage.goToAddMoneyPage();
      await transactionPage.isAddMoneyPageLoaded();

      // Focus and blur title field without entering anything
      await page.getByRole('textbox', { name: 'Tytuł' }).focus();
      await page.getByRole('textbox', { name: 'Tytuł' }).blur();

      // Error should appear
      await transactionPage.hasError('Tytuł jest wymagany');
    });

    test('should hide title error when user starts typing', async ({ page }) => {
      await dashboardPage.goToAddMoneyPage();
      await transactionPage.isAddMoneyPageLoaded();

      // Trigger error
      await page.getByRole('textbox', { name: 'Tytuł' }).focus();
      await page.getByRole('textbox', { name: 'Tytuł' }).blur();
      await transactionPage.hasError('Tytuł jest wymagany');

      // Start typing - error should disappear
      await page.getByRole('textbox', { name: 'Tytuł' }).fill('Test');
      await transactionPage.hasError('Tytuł jest wymagany');
    });

    test('should show error when amount is empty on blur', async ({ page }) => {
      await dashboardPage.goToAddMoneyPage();
      await transactionPage.isAddMoneyPageLoaded();

      // Focus and blur amount field without entering anything
      await page.getByRole('spinbutton', { name: 'Kwota' }).focus();
      await page.getByRole('spinbutton', { name: 'Kwota' }).blur();

      // Error should appear
      await transactionPage.hasError('Kwota jest wymagana');
    });

    test('should show error when amount is zero or negative', async ({ page }) => {
      await dashboardPage.goToAddMoneyPage();
      await transactionPage.isAddMoneyPageLoaded();

      // Enter zero
      await page.getByRole('spinbutton', { name: 'Kwota' }).fill('0');
      await page.getByRole('spinbutton', { name: 'Kwota' }).blur();
      await transactionPage.hasError('Kwota musi być dodatnia');

      // Enter negative number
      await page.getByRole('spinbutton', { name: 'Kwota' }).fill('-50');
      await page.getByRole('spinbutton', { name: 'Kwota' }).blur();
      await transactionPage.hasError('Kwota musi być dodatnia');
    });

    test('should hide amount error when user enters valid amount', async ({ page }) => {
      await dashboardPage.goToAddMoneyPage();
      await transactionPage.isAddMoneyPageLoaded();

      // Trigger error with zero
      await page.getByRole('spinbutton', { name: 'Kwota' }).fill('0');
      await page.getByRole('spinbutton', { name: 'Kwota' }).blur();
      await transactionPage.hasError('Kwota musi być dodatnia');

      // Enter valid amount - error should disappear
      await page.getByRole('spinbutton', { name: 'Kwota' }).fill('100');
      await transactionPage.hasError('Kwota musi być dodatnia');
    });

    test('should show all errors when submitting empty form', async ({ page }) => {
      await dashboardPage.goToAddMoneyPage();
      await transactionPage.isAddMoneyPageLoaded();

      await page.getByRole('button', { name: 'Doładuj' }).click({ delay: 4000 });

      // All errors should appear
      await transactionPage.hasError('Odbiorca jest wymagany');
      await transactionPage.hasError('Tytuł jest wymagany');
      await transactionPage.hasError('Kwota jest wymagana');
    });
  });
});
