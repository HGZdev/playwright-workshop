import test from 'playwright/test';
// import LoginPage from './pages/LoginPageObject';
// import RegistrationPage from './pages/RegistrationPageObject';
// import DashboardPage from './pages/DashboardPageObject';
// import TransactionPage from './pages/TransactionPageObject';
import userGen from './utils/userGen';

test.describe('Money Addition Flows', () => {
  // let loginPage: LoginPage;
  // let registrationPage: RegistrationPage;
  // let dashboardPage: DashboardPage;
  // let transactionPage: TransactionPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    registrationPage = new RegistrationPage(page);
    dashboardPage = new DashboardPage(page);
    transactionPage = new TransactionPage(page);
    await page.goto('/');
  });

  test('should add money successfully', async () => {
    const user = userGen();

    /* zarejestruj klienta */

    /* zaloguj się na konto */

    /* otwórz panel doładowywania konta */

    /* wypełnij formularz i zatwierdź */

    /* sprawdź, czy bilans na koncie jest prawidłowy */
  });
});
