import { expect, test } from '@playwright/test';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import DashboardPage from './pages/DashboardPage';
import TransactionPage from './pages/TransactionPage';

test.describe('Money Addition Flows', () => {
  let loginPage: LoginPage;
  let registrationPage: RegistrationPage;
  let dashboardPage: DashboardPage;
  let transactionPage: TransactionPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    registrationPage = new RegistrationPage(page);
    dashboardPage = new DashboardPage(page);
    transactionPage = new TransactionPage(page);
    await page.goto('/');
  });

  test('should add money successfully', async () => {
    const user = {
      email: `franek@gmail.com`,
      password: `franek@gmail.com`,
      name: 'franek',
    };

    /* zarejestruj klienta */

    await loginPage.goToRegistrationPage();
    await registrationPage.register(user);

    /* zaloguj się na konto */

    await loginPage.login(user);
    await dashboardPage.isDashboardLoaded();

    /* otwórz panel doładowywania konta */

    await dashboardPage.goToAddMoneyPage();
    await transactionPage.isAddMoneyPageLoaded();

    /* wypełnij formularz i zatwierdź */
    await transactionPage.fillAndSubmitAddMoneyForm({
      title: 'Pensja',
      amount: 100000,
    });

    /* sprawdź, czy bilans na koncie jest prawidłowy */
    await dashboardPage.isDashboardLoaded();
    expect(await dashboardPage.getBalance()).toBe(100000);
  });

  test('should show all errors when submitting empty form', async () => {});
});
