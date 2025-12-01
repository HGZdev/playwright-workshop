import LoginPage from './pages/LoginPageObject';
import RegistrationPage from './pages/RegistrationPageObject';
import DashboardPage from './pages/DashboardPageObject';
import userGen from './utils/userGen';
import test, { expect } from 'playwright/test';

test.describe('User Registration and Login Flow - version 3', () => {
  let loginPage: LoginPage;
  let registrationPage: RegistrationPage;
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    registrationPage = new RegistrationPage(page);
    dashboardPage = new DashboardPage(page);

    /* nawiguj do strony głównej */
    await page.goto('/login');
    await expect(page).toHaveURL('/login');
  });

  test('should register a new user successfully', async ({ page }) => {
    const user = userGen();

    await loginPage.goToRegistrationPage();
    await registrationPage.register(user);
    await loginPage.login(user);

    await expect(page).toHaveURL('/dashboard');
    await expect(page.getByRole('heading', { name: 'Mini Bank' })).toBeVisible();
  });

  test('should show error if email already exists', async () => {
    const user = userGen();

    await loginPage.goToRegistrationPage();
    await registrationPage.register(user);
    await loginPage.login(user);

    await dashboardPage.isDashboardLoaded();
    await dashboardPage.logout();

    await loginPage.isLoginPageLoaded();
    await loginPage.goToRegistrationPage();
    await registrationPage.register(user);
    await registrationPage.hasError('An account with this email');
  });
});
