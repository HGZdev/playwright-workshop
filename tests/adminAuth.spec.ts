import { test, expect } from '@playwright/test';
import generateUserInput from './utils/userDataGenerator';
import DashboardPage from './pages/DashboardPage';
import RegistrationPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';

test.describe('Admin Registration and Login Flow with Page Object', () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;
  let registrationPage: RegistrationPage;
  let adminPage: AdminPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    registrationPage = new RegistrationPage(page);
    adminPage = new AdminPage(page);
    await page.goto('/');
  });

  test('should login to admin account successfully', async () => {
    await loginPage.isLoginPageLoaded();
    await loginPage.loginAdmin();
    await dashboardPage.isDashboardLoaded();
    await dashboardPage.goToAdminPage();
    await adminPage.isAdminPageLoaded();
  });

  test('should register a new user successfully and change role to admin by other admin', async ({
    page,
  }) => {
    const user = generateUserInput('Posejdon');

    await loginPage.isLoginPageLoaded();
    await loginPage.goToRegistrationPage();
    await registrationPage.register(user);
    await loginPage.isLoginPageLoaded();
    await loginPage.login(user);
    await dashboardPage.isDashboardLoaded();
    await dashboardPage.logout();

    await loginPage.isLoginPageLoaded();
    await loginPage.loginAdmin();
    await dashboardPage.isDashboardLoaded();
    await dashboardPage.goToAdminPage();
    await adminPage.isAdminPageLoaded();

    await page.getByRole('link', { name: `Edytuj użytkownika ${user.email}` }).click();

    await page.waitForURL(/user\/\d+/);
    await expect(page.getByRole('heading', { name: 'Edytuj użytkownika' })).toBeVisible();

    await page.getByLabel('Rola').selectOption('admin');
    await page.getByRole('button', { name: 'Zaktualizuj użytkownika' }).click();
    await adminPage.isAdminPageLoaded();
    // TODO check if user role has changed
  });
});
