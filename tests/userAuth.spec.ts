import { test, expect } from '@playwright/test';
import generateUserInput from './utils/userDataGenerator';
import DashboardPage from './pages/DashboardPage';
import RegistrationPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage';

test.describe('User Registration and Login Flow - version 1', () => {
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

test.describe('User Registration and Login Flow - version 2 with Page Object Models', () => {
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

  test('should not see admin link and not be able to access admin page from dashboard - redirect to unauthorized', async ({
    page,
  }) => {
    const user = generateUserInput('Artemida');
    await loginPage.isLoginPageLoaded();
    await loginPage.goToRegistrationPage();
    await registrationPage.register(user);
    await loginPage.isLoginPageLoaded();
    await loginPage.login(user);
    await dashboardPage.isDashboardLoaded();

    await expect(page.getByRole('heading', { name: 'Panel administratora' })).not.toBeVisible();
    await page.goto('/admin');
    await page.waitForURL('/unauthorized');
    await expect(page.getByRole('heading', { name: 'Brak dostępu' })).toBeVisible();
  });
});
