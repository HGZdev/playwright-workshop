import { test, expect } from '@playwright/test';
import RegistrationPage from './pages/RegistrationPage';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import TransactionPage from './pages/TransactionPage';

test.describe('Money Sending Flows', () => {
  let registrationPage: RegistrationPage;
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;
  let transactionPage: TransactionPage;

  test.beforeEach(async ({ page }) => {
    registrationPage = new RegistrationPage(page);
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    transactionPage = new TransactionPage(page);
  });

  test('should send money successfully', async ({ page }) => {
    const user = {
      email: `grazyna@gmail.com`,
      password: `grazyna@gmail.com`,
      name: 'grazyna',
    };

    /* zarejestruj klienta */

    await page.goto('/');
    await loginPage.isLoginPageLoaded();
    await loginPage.goToRegistrationPage();
    await registrationPage.register(user);

    /* zaloguj się na konto */

    await loginPage.isLoginPageLoaded();
    await loginPage.login(user);
    await dashboardPage.isDashboardLoaded();

    /* otwórz panel wykonywania przelewu na inne konto */

    await dashboardPage.goToSendMoneyPage();
    await transactionPage.isSendMoneyPageLoaded();

    /* wypełnij formularz i zatwierdź */

    await transactionPage.fillAndSubmitSendMoneyForm({
      title: 'Zakupy',
      recipient: 'Jan Kowalski',
      amount: 100,
    });

    /* sprawdź, czy bilans na koncie jest prawidłowy */
    await dashboardPage.isDashboardLoaded();
    expect(await dashboardPage.getBalance()).toBe(-100);
  });

  // test('should add money 2 times successfully - longer action timeout and test timeout', async ({
  //   page,
  // }) => {
  //   // test.setTimeout(30000);
  //   const user = {
  //     email: `halina@gmail.com`,
  //     password: `halina@gmail.com`,
  //     name: 'halina',
  //   };

  //   /* zarejestruj klienta */

  //   await page.goto('/');
  //   await loginPage.isLoginPageLoaded();
  //   await loginPage.goToRegistrationPage();
  //   await registrationPage.register(user);

  //   /* zaloguj się na konto */

  //   await loginPage.isLoginPageLoaded();
  //   await loginPage.login(user);
  //   await dashboardPage.isDashboardLoaded();

  //   /* Pierwszy przelew */

  //   /* otwórz panel wykonywania przelewu na inne konto */

  //   await dashboardPage.goToSendMoneyPage();
  //   await transactionPage.isSendMoneyPageLoaded();

  //   /* wypełnij formularz i zatwierdź */

  //   await transactionPage.fillAndSubmitSendMoneyForm({
  //     title: 'Zakupy',
  //     recipient: 'Jan Kowalski',
  //     amount: 100,
  //   });

  //   /* sprawdź, czy bilans na koncie jest prawidłowy */
  //   await dashboardPage.isDashboardLoaded();
  //   expect(await dashboardPage.getBalance()).toBe(-100);

  //   /* Drugi przelew */

  //   /* otwórz panel wykonywania przelewu na inne konto */

  //   await dashboardPage.goToSendMoneyPage();
  //   await transactionPage.isSendMoneyPageLoaded();

  //   /* wypełnij formularz i zatwierdź */

  //   await transactionPage.fillAndSubmitSendMoneyForm({
  //     title: 'Zakupy',
  //     recipient: 'Jan Kowalski',
  //     amount: 100,
  //   });

  //   /* sprawdź, czy bilans na koncie jest prawidłowy */
  //   await dashboardPage.isDashboardLoaded();
  //   expect(await dashboardPage.getBalance()).toBe(-200);
  // });

  // test('should add money 2 times successfully - mocked API', async ({ page }) => {
  //   // Mock ANY POST request to /api/send-money/* (using wildcard for ID)
  //   // await page.route('**/api/send-money/**', async (route) => {
  //   //   await route.fulfill({
  //   //     status: 200,
  //   //     contentType: 'application/json',
  //   //     body: JSON.stringify({ success: true }),
  //   //   });
  //   // });

  //   const user = {
  //     email: `irena@gmail.com`,
  //     password: `irena@gmail.com`,
  //     name: 'irena',
  //   };

  //   /* zarejestruj klienta */

  //   await page.goto('/');
  //   await loginPage.isLoginPageLoaded();
  //   await loginPage.goToRegistrationPage();
  //   await registrationPage.register(user);

  //   /* zaloguj się na konto */

  //   await loginPage.isLoginPageLoaded();
  //   await loginPage.login(user);
  //   await dashboardPage.isDashboardLoaded();

  //   /* Pierwszy przelew */

  //   /* otwórz panel wykonywania przelewu na inne konto */

  //   await dashboardPage.goToSendMoneyPage();
  //   await transactionPage.isSendMoneyPageLoaded();

  //   /* wypełnij formularz i zatwierdź */

  //   await transactionPage.fillAndSubmitSendMoneyForm({
  //     title: 'Zakupy',
  //     recipient: 'Jan Kowalski',
  //     amount: 100,
  //   });

  //   /* sprawdź, czy bilans na koncie jest prawidłowy */
  //   await dashboardPage.isDashboardLoaded();
  //   expect(await dashboardPage.getBalance()).toBe(0);

  //   /* Drugi przelew */

  //   /* otwórz panel wykonywania przelewu na inne konto */

  //   await dashboardPage.goToSendMoneyPage();
  //   await transactionPage.isSendMoneyPageLoaded();

  //   /* wypełnij formularz i zatwierdź */

  //   await transactionPage.fillAndSubmitSendMoneyForm({
  //     title: 'Zakupy',
  //     recipient: 'Jan Kowalski',
  //     amount: 100,
  //   });

  //   /* sprawdź, czy bilans na koncie jest prawidłowy */
  //   await dashboardPage.isDashboardLoaded();
  //   expect(await dashboardPage.getBalance()).toBe(0);
  // });
});
