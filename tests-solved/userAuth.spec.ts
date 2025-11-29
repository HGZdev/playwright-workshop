import { test, expect } from '@playwright/test';
import generateUserInput from './utils/userDataGenerator';
import DashboardPage from './pages/DashboardPage';
import RegistrationPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage';

test.describe('User Registration and Login Flow - version 1', () => {
  test.beforeEach(async ({ page }) => {
    // nawiguj do strony głównej
    await page.goto('/');
    await page.waitForURL('/login');
    await expect(page).toHaveURL('/login');
  });

  test('should register a new user successfully', async ({ page }) => {
    const user = {
      email: `client_${new Date().getTime()}@gmail.com`,
      password: `client_${new Date().getTime()}@gmail.com`,
      name: 'client',
    };

    // przejdz do strony z formularzem rejestracyjnym za pomocą linku

    // await page.getByText('Zarejestruj nowe konto').click();
    // await page.locator('a').filter({ hasText: 'Zarejestruj nowe konto' }).click();
    await page.getByRole('link', { name: 'Zarejestruj nowe konto' }).click();

    // upewnij się, ze jesteś na stronie rejestracji

    await page.waitForURL('/register');

    // wypełnij pola formularza logowania

    // await page.locator('#email').fill('client@gmail.com');
    await page.getByLabel('E-mail').click();
    await page.getByLabel('E-mail').fill(user.email);
    await page.getByLabel('Hasło').click();
    await page.getByLabel('Hasło').fill(user.password);
    await page.getByRole('textbox', { name: 'Imię i nazwisko' }).click();
    await page.getByRole('textbox', { name: 'Imię i nazwisko' }).fill(user.name);

    // zatwierdz formularz rejestracyjny

    await page.getByRole('button', { name: 'Zarejestruj się' }).click();

    // sprawdz, czy trafilas na wlasciwa strone

    await page.waitForURL('/login');

    // zaloguj się za pomocą danych nowo utworzonego klienta

    await page.getByLabel('E-mail').click();
    await page.getByLabel('E-mail').fill(user.email);
    await page.getByLabel('Hasło').click();
    await page.getByLabel('Hasło').fill(user.password);

    // zatwierdz formularz logowania

    await page.getByRole('button', { name: 'Zaloguj się' }).click();

    // sprawdz, czy trafilas na wlasciwa strone

    await page.waitForURL('/dashboard');
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
    const user = {
      email: `client_${new Date().getTime()}@gmail.com`,
      password: `client_${new Date().getTime()}@gmail.com`,
      name: 'client',
    };

    await loginPage.isLoginPageLoaded();
    await loginPage.goToRegistrationPage();
    await registrationPage.register(user);
    await loginPage.isLoginPageLoaded();
    await loginPage.login(user);
    await dashboardPage.isDashboardLoaded();
  });

  test('should show error if email already exists', async () => {
    const user = {
      email: `client_${new Date().getTime()}@gmail.com`,
      password: `client_${new Date().getTime()}@gmail.com`,
      name: 'client',
    };

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
