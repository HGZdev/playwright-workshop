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
    test('should send money successfully', async () => {
      const balanceBefore = await dashboardPage.getBalance();

      await dashboardPage.goToSendMoneyPage();
      await transactionPage.isSendMoneyPageLoaded();

      await transactionPage.fillAndSubmitSendMoneyForm({
        title: 'Zakupy',
        recipient: 'Jan Kowalski',
        amount: 100,
      });
      await dashboardPage.isDashboardLoaded();

      const balanceAfter = await dashboardPage.getBalance();
      expect(balanceAfter - balanceBefore).toBe(-100);
    });

    test('should add money 2 times successfully', async () => {
      // first money transfer

      await dashboardPage.goToSendMoneyPage();
      await transactionPage.isSendMoneyPageLoaded();

      await transactionPage.fillAndSubmitSendMoneyForm({
        title: 'Zakupy',
        recipient: 'Jan Kowalski',
        amount: 1000,
      });
      await dashboardPage.isDashboardLoaded();

      // second money transfer

      await dashboardPage.goToSendMoneyPage();
      await transactionPage.isSendMoneyPageLoaded();

      await transactionPage.fillAndSubmitSendMoneyForm({
        title: 'Loteria',
        recipient: 'Jan Kowalski',
        amount: 1000,
      });
      await dashboardPage.isDashboardLoaded();
    });
  });
});
