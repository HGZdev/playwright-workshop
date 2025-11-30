import test, { expect } from 'playwright/test';
import RegistrationPage from './pages/RegistrationPageObject';
import DashboardPage from './pages/DashboardPageObject';
import LoginPage from './pages/LoginPageObject';
import TransactionPage from './pages/TransactionPageObject';
import userGen from './utils/userGen';

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
    const user = userGen();

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

  test('should add money 3 times successfully - longer action timeout and test timeout', async ({
    page,
  }) => {
    const user = userGen();

    /* zarejestruj klienta */

    await page.goto('/');
    await loginPage.isLoginPageLoaded();
    await loginPage.goToRegistrationPage();
    await registrationPage.register(user);

    /* zaloguj się na konto */

    await loginPage.isLoginPageLoaded();
    await loginPage.login(user);
    await dashboardPage.isDashboardLoaded();

    /* Pierwszy przelew */

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

    /* Drugi przelew */

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
    expect(await dashboardPage.getBalance()).toBe(-200);

    /* Trzeci przelew */

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
    expect(await dashboardPage.getBalance()).toBe(-200);
  });

  test('should add money 3 times successfully - mocked API', async ({ page }) => {
    const user = userGen();

    /* zarejestruj klienta */

    await page.goto('/');
    await loginPage.isLoginPageLoaded();
    await loginPage.goToRegistrationPage();
    await registrationPage.register(user);

    /* zaloguj się na konto */

    await loginPage.isLoginPageLoaded();
    await loginPage.login(user);
    await dashboardPage.isDashboardLoaded();

    /* Pierwszy przelew */

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
    expect(await dashboardPage.getBalance()).toBe(0);

    /* Drugi przelew */

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
    expect(await dashboardPage.getBalance()).toBe(0);

    /* Trzeci przelew */

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
    expect(await dashboardPage.getBalance()).toBe(0);
  });
});
