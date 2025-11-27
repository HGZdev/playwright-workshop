import { test, expect } from '@playwright/test';
import generateUserInput from './utils/userDataGenerator';
import DashboardPage from './page-object-models/DashboardPage';
import RegistrationPage from './page-object-models/RegistrationPage';
import LoginPage from './page-object-models/LoginPage';
import AdminPage from './page-object-models/AdminPage';

test.describe('User Registration and Login Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should register a new user successfully', async ({ page }) => {
    const user1 = generateUserInput('Posejdon');
    await page.getByRole('link', { name: 'Zarejestruj nowe konto' }).click();
    await page.waitForURL('/register');

    await page.getByRole('textbox', { name: 'E-mail' }).click();
    await page.getByRole('textbox', { name: 'E-mail' }).fill(user1.email);
    await page.getByRole('textbox', { name: 'Hasło' }).fill(user1.password);
    await page.getByRole('textbox', { name: 'Imię i nazwisko' }).fill(user1.name);
    await page.getByRole('button', { name: 'Zarejestruj się' }).click();

    await page.waitForURL('/login');

    await page.getByRole('textbox', { name: 'E-mail' }).fill(user1.email);
    await page.getByRole('textbox', { name: 'Hasło' }).fill(user1.password);
    await page.getByRole('button', { name: 'Zaloguj się' }).click();

    await page.waitForURL('/dashboard');
  });

  test('should show error if email already exists', async ({ page }) => {
    const user2 = generateUserInput('Herkules');
    await page.goto('/');
    await page.getByRole('link', { name: 'Zarejestruj nowe konto' }).click();
    await page.waitForURL('/register');

    await page.getByRole('textbox', { name: 'E-mail' }).click();
    await page.getByRole('textbox', { name: 'E-mail' }).fill(user2.email);
    await page.getByRole('textbox', { name: 'Hasło' }).fill(user2.password);
    await page.getByRole('textbox', { name: 'Imię i nazwisko' }).fill(user2.name);

    await page.getByRole('button', { name: 'Zarejestruj się' }).click();
    await page.waitForURL('/login');

    await page.getByRole('textbox', { name: 'E-mail' }).click();
    await page.getByRole('textbox', { name: 'E-mail' }).fill(user2.email);
    await page.getByRole('textbox', { name: 'Hasło' }).fill(user2.password);
    await page.getByRole('button', { name: 'Zaloguj się' }).click();

    await page.waitForURL('/dashboard');
    await page.getByRole('button', { name: 'Wyloguj się z konta' }).click();
    await page.waitForURL('/login');

    await page.getByRole('link', { name: 'Zarejestruj nowe konto' }).click();
    await page.waitForURL('/register');

    await page.getByRole('textbox', { name: 'E-mail' }).click();
    await page.getByRole('textbox', { name: 'E-mail' }).fill(user2.email);
    await page.getByRole('textbox', { name: 'Hasło' }).fill(user2.password);
    await page.getByRole('textbox', { name: 'Imię i nazwisko' }).fill(user2.name);
    await page.getByRole('button', { name: 'Zarejestruj się' }).click();

    await expect(page.locator('.error-text')).toHaveText(
      'An account with this email already exists. Please use a different email or try logging in.',
    );
  });
});

test.describe('User Registration and Login Flow with Page Object', () => {
  let registrationPage: RegistrationPage;
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    registrationPage = new RegistrationPage(page);
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    await page.goto('/');
  });

  test('should register a new user successfully', async () => {
    const user = generateUserInput('Zeus');

    await loginPage.isLoginPageLoaded();
    await loginPage.goToRegistrationPage();
    await registrationPage.register(user);
    await loginPage.isLoginPageLoaded();
    await loginPage.login(user);
    await dashboardPage.isDashboardLoaded();
  });

  test('should show error if email already exists', async () => {
    const user = generateUserInput('Atena');

    await loginPage.isLoginPageLoaded();
    await loginPage.goToRegistrationPage();
    await registrationPage.register(user);
    await loginPage.isLoginPageLoaded();
    await loginPage.login(user);
    await dashboardPage.isDashboardLoaded();
    await dashboardPage.logout();

    await loginPage.isLoginPageLoaded();
    await loginPage.goToRegistrationPage();
    await registrationPage.register(user);
    await registrationPage.hasError(
      'An account with this email already exists. Please use a different email or try logging in.',
    );
  });
});

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
    // TODO check if user role is changed
  });
});
