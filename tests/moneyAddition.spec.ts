import { test, expect } from '@playwright/test';
import generateUserInput from './utils/userDataGenerator';
import { UserInput } from '../_server/database/types';
import RegistrationPage from './pages/RegistrationPage';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import TransactionPage from './pages/TransactionPage';

test.describe('Money Addition Flows', () => {
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

  test('should add money successfully', async () => {
    const balanceBefore = await dashboardPage.getBalance();

    await dashboardPage.goToAddMoneyPage();
    await transactionPage.isAddMoneyPageLoaded();

    await transactionPage.fillAndSubmitAddMoneyForm({
      title: 'Spadek',
      amount: 1000,
    });
    await dashboardPage.isDashboardLoaded();

    const balanceAfter = await dashboardPage.getBalance();

    expect(balanceAfter - balanceBefore).toBe(1000);
  });

  test('should show error when recipient is empty on blur', async ({ page }) => {
    await dashboardPage.goToAddMoneyPage();
    await transactionPage.isAddMoneyPageLoaded();

    // Focus and blur recipient field without entering anything
    await page.getByRole('textbox', { name: 'Tytuł' }).focus();
    await page.getByRole('textbox', { name: 'Tytuł' }).blur();

    // Error should appear
    await transactionPage.hasError('Tytuł jest wymagany');
  });

  test('should hide recipient error when user starts typing', async ({ page }) => {
    await dashboardPage.goToAddMoneyPage();
    await transactionPage.isAddMoneyPageLoaded();

    // Trigger error
    await page.getByRole('textbox', { name: 'Tytuł' }).focus();
    await page.getByRole('textbox', { name: 'Tytuł' }).blur();
    await transactionPage.hasError('Tytuł jest wymagany');

    // Start typing - error should disappear
    await page.getByRole('textbox', { name: 'Tytuł' }).fill('Shop');
    await transactionPage.hasError('Odbiorca jest wymagany');
  });

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
    await page.getByRole('textbox', { name: 'Tytuł' }).fill('Payment');
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
    await dashboardPage.goToAddMoneyPage();
    await transactionPage.isAddMoneyPageLoaded();

    // Trigger error with zero
    await page.getByRole('spinbutton', { name: 'Kwota' }).fill('0');
    await page.getByRole('spinbutton', { name: 'Kwota' }).blur();
    await transactionPage.hasError('Kwota musi być dodatnia');

    // Enter valid amount - error should disappear
    await page.getByRole('spinbutton', { name: 'Kwota' }).fill('50');
    await transactionPage.hasError('Kwota musi być dodatnia');
  });

  test('should show all errors when submitting empty form', async ({ page }) => {
    await dashboardPage.goToAddMoneyPage();
    await transactionPage.isAddMoneyPageLoaded();

    // Try to submit empty form
    await page.getByRole('button', { name: 'Doładuj' }).click();

    // All errors should appear
    await transactionPage.hasError('Tytuł jest wymagany');
    await transactionPage.hasError('Kwota jest wymagana');
  });
});
