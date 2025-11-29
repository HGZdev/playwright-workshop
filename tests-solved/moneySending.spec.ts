import { test, expect } from '@playwright/test';
import generateUserInput from './utils/userDataGenerator';
import { UserInput } from '../_server/database/types';
import RegistrationPage from './pages/RegistrationPage';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import TransactionPage from './pages/TransactionPage';

test.describe('Money Sending Flows', () => {
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

  test.describe('Money Sending Flows', () => {
    test('should send money successfully - longer action timeout', async () => {
      const balanceBefore = await dashboardPage.getBalance();

      await dashboardPage.goToSendMoneyPage();
      await transactionPage.isSendMoneyPageLoaded();

      await transactionPage.fillAndSubmitSendMoneyForm({
        title: 'Zakupy',
        recipient: 'Jan Kowalski',
        amount: 100,
      });
      await dashboardPage.isDashboardLoaded(); // with longer timeout

      const balanceAfter = await dashboardPage.getBalance();
      expect(balanceAfter - balanceBefore).toBe(-100);
    });
    test('should add money 2 times successfully - longer action timeout and test timeout', async () => {
      test.setTimeout(30000);

      // first add money

      await dashboardPage.goToSendMoneyPage();
      await transactionPage.isSendMoneyPageLoaded();

      await transactionPage.fillAndSubmitSendMoneyForm({
        title: 'Zakupy',
        recipient: 'Jan Kowalski',
        amount: 1000,
      });
      await dashboardPage.isDashboardLoaded(); // with longer timeout

      // second add money

      await dashboardPage.goToSendMoneyPage();
      await transactionPage.isSendMoneyPageLoaded();

      await transactionPage.fillAndSubmitSendMoneyForm({
        title: 'Loteria',
        recipient: 'Jan Kowalski',
        amount: 1000,
      });
      await dashboardPage.isDashboardLoaded(); // with longer timeout
    });

    test('should add money 2 times successfully - mocked API', async ({ page }) => {
      // Mock ANY POST request to /api/send-money/* (using wildcard for ID)
      await page.route('**/api/send-money/**', async (route) => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ success: true }),
        });
      });

      // first add money

      await dashboardPage.goToSendMoneyPage();
      await transactionPage.isSendMoneyPageLoaded();

      await transactionPage.fillAndSubmitSendMoneyForm({
        title: 'Zakupy',
        recipient: 'Jan Kowalski',
        amount: 1000,
      });
      await dashboardPage.isDashboardLoaded(); // with longer timeout

      // second add money

      await dashboardPage.goToSendMoneyPage();
      await transactionPage.isSendMoneyPageLoaded();

      await transactionPage.fillAndSubmitSendMoneyForm({
        title: 'Loteria',
        recipient: 'Jan Kowalski',
        amount: 1000,
      });
      await dashboardPage.isDashboardLoaded(); // with longer timeout
    });
  });

  test.describe('Money Sending Flows - validation', () => {
    test('should show error when title is empty on blur', async ({ page }) => {
      await dashboardPage.goToSendMoneyPage();
      await transactionPage.isSendMoneyPageLoaded();

      // Focus and blur title field without entering anything
      await page.getByRole('textbox', { name: 'Odbiorca' }).focus();
      await page.getByRole('textbox', { name: 'Odbiorca' }).blur();

      // Error should appear
      await transactionPage.hasError('Odbiorca jest wymagany');
    });

    test('should hide title error when user starts typing', async ({ page }) => {
      await dashboardPage.goToSendMoneyPage();
      await transactionPage.isSendMoneyPageLoaded();

      // Trigger error
      await page.getByRole('textbox', { name: 'Odbiorca' }).focus();
      await page.getByRole('textbox', { name: 'Odbiorca' }).blur();
      await transactionPage.hasError('Odbiorca jest wymagany');

      // Start typing - error should disappear
      await page.getByRole('textbox', { name: 'Odbiorca' }).fill('Jan Kowalski');
      await transactionPage.hasError('Tytuł jest wymagany');
    });

    test('should show error when amount is empty on blur', async ({ page }) => {
      await dashboardPage.goToSendMoneyPage();
      await transactionPage.isSendMoneyPageLoaded();

      // Focus and blur amount field without entering anything
      await page.getByRole('spinbutton', { name: 'Kwota' }).focus();
      await page.getByRole('spinbutton', { name: 'Kwota' }).blur();

      // Error should appear
      await transactionPage.hasError('Kwota jest wymagana');
    });

    test('should show error when amount is zero or negative', async ({ page }) => {
      await dashboardPage.goToSendMoneyPage();
      await transactionPage.isSendMoneyPageLoaded();

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
      await dashboardPage.goToSendMoneyPage();
      await transactionPage.isSendMoneyPageLoaded();

      // Trigger error with zero
      await page.getByRole('spinbutton', { name: 'Kwota' }).fill('0');
      await page.getByRole('spinbutton', { name: 'Kwota' }).blur();
      await transactionPage.hasError('Kwota musi być dodatnia');

      // Enter valid amount - error should disappear
      await page.getByRole('spinbutton', { name: 'Kwota' }).fill('100');
      await transactionPage.hasError('Kwota musi być dodatnia');
    });

    test('should show all errors when submitting empty form', async ({ page }) => {
      await dashboardPage.goToSendMoneyPage();
      await transactionPage.isSendMoneyPageLoaded();

      await page.getByRole('button', { name: 'Wyślij przelew' }).click();

      // All errors should appear (no recipient field in add money form)
      await transactionPage.hasError('Odbiorca jest wymagany');
      await transactionPage.hasError('Tytuł jest wymagany');
      await transactionPage.hasError('Kwota jest wymagana');
    });
  });
});
