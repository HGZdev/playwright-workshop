import { expect, test } from '@playwright/test';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import DashboardPage from './pages/DashboardPage';

test.describe('User Registration and Login Flow - version 1', () => {
  test.beforeEach(async ({ page }) => {
    /* nawiguj do strony głównej */
    await page.goto('/');
    await page.waitForURL('/login');
    await expect(page).toHaveURL('/login');
  });

  test('should register a new user successfully', async ({ page }) => {
    const user = {
      email: `anna@gmail.com`,
      password: `anna@gmail.com`,
      name: 'anna',
    };

    /* przejdz do strony z formularzem rejestracyjnym za pomocą linku */

    // await page.getByText('Zarejestruj nowe konto').click();
    // await page.locator('a').filter({ hasText: 'Zarejestruj nowe konto' }).click();
    await page.getByRole('link', { name: 'Zarejestruj nowe konto' }).click();

    /* upewnij się, że znajdujesz się na stronie z formularzem rejestracyjnym */
    await page.waitForURL('/register');

    /* wypełnij pola formularza rejestracyjnego */
    await page.getByLabel('E-mail').click();
    await page.getByLabel('E-mail').fill(user.email);
    await page.getByLabel('Hasło').click();
    await page.getByLabel('Hasło').fill(user.password);
    await page.getByRole('textbox', { name: 'Imię i nazwisko' }).click();
    await page.getByRole('textbox', { name: 'Imię i nazwisko' }).fill(user.name);

    /* zatwierdz formularz rejestracyjny */
    await page.getByRole('button', { name: 'Zarejestruj się' }).click();

    /* upewnij się, że znajdujesz się na stronie z formularzem logowania */
    await page.waitForURL('/login');
    await expect(page.getByRole('heading', { name: 'Logowanie' })).toBeVisible();

    /* zaloguj się za pomocą danych nowo utworzonego klienta */
    await page.getByLabel('E-mail').click();
    await page.getByLabel('E-mail').fill(user.email);
    await page.getByLabel('Hasło').click();
    await page.getByLabel('Hasło').fill(user.password);

    /* zatwierdz formularz logowania */
    await page.getByRole('button', { name: 'Zaloguj się' }).click();

    /* upewnij się, że znajdujesz się na stronie z formularzem logowania */
    await page.waitForURL('/dashboard');
    await expect(page.getByRole('heading', { name: 'Mini Bank' })).toBeVisible();
  });
});

test.describe('User Registration and Login Flow - version 2', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.waitForURL('/login');
  });

  test('should register a new user successfully', async ({ page }) => {
    const user = {
      email: `barbara@gmail.com`,
      password: `barbara@gmail.com`,
      name: 'barbara',
    };

    await page.getByRole('link', { name: 'Zarejestruj nowe konto' }).click();
    await page.waitForURL('/register');

    await page.getByRole('textbox', { name: 'E-mail' }).click();
    await page.getByRole('textbox', { name: 'E-mail' }).fill(user.email);
    await page.getByRole('textbox', { name: 'Hasło' }).click();
    await page.getByRole('textbox', { name: 'Hasło' }).fill(user.password);
    await page.getByRole('textbox', { name: 'Imię i nazwisko' }).click();
    await page.getByRole('textbox', { name: 'Imię i nazwisko' }).fill(user.name);

    await page.getByRole('button', { name: 'Zarejestruj się' }).click();
    await page.waitForURL('/login');

    await page.getByRole('textbox', { name: 'E-mail' }).click();
    await page.getByRole('textbox', { name: 'E-mail' }).fill(user.email);
    await page.getByRole('textbox', { name: 'Hasło' }).click();
    await page.getByRole('textbox', { name: 'Hasło' }).fill(user.password);
    await page.getByRole('button', { name: 'Zaloguj się' }).click();

    await page.waitForURL('/dashboard');
    await expect(page.getByRole('heading', { name: 'Mini Bank' })).toBeVisible();
  });

  test('should show error if email already exists', async ({ page }) => {
    const user = {
      email: `cecylia@gmail.com`,
      password: `cecylia@gmail.com`,
      name: 'cecylia',
    };

    await page.getByRole('link', { name: 'Zarejestruj nowe konto' }).click();
    await page.waitForURL('/register');

    await page.getByRole('textbox', { name: 'E-mail' }).click();
    await page.getByRole('textbox', { name: 'E-mail' }).fill(user.email);
    await page.getByRole('textbox', { name: 'Hasło' }).click();
    await page.getByRole('textbox', { name: 'Hasło' }).fill(user.password);
    await page.getByRole('textbox', { name: 'Imię i nazwisko' }).click();
    await page.getByRole('textbox', { name: 'Imię i nazwisko' }).fill(user.name);

    await page.getByRole('button', { name: 'Zarejestruj się' }).click();
    await page.waitForURL('/login');

    await page.getByRole('textbox', { name: 'E-mail' }).click();
    await page.getByRole('textbox', { name: 'E-mail' }).fill(user.email);
    await page.getByRole('textbox', { name: 'Hasło' }).click();
    await page.getByRole('textbox', { name: 'Hasło' }).fill(user.password);
    await page.getByRole('button', { name: 'Zaloguj się' }).click();

    await page.waitForURL('/dashboard');
    await expect(page.getByRole('heading', { name: 'Mini Bank' })).toBeVisible();

    await page.getByRole('button', { name: 'Wyloguj się z konta' }).click();

    await page.waitForURL('/login');
    await page.getByRole('link', { name: 'Zarejestruj nowe konto' }).click();

    await page.waitForURL('/register');
    await page.getByRole('textbox', { name: 'E-mail' }).click();
    await page.getByRole('textbox', { name: 'E-mail' }).fill(user.email);
    await page.getByRole('textbox', { name: 'Hasło' }).click();
    await page.getByRole('textbox', { name: 'Hasło' }).fill(user.password);
    await page.getByRole('textbox', { name: 'Imię i nazwisko' }).click();
    await page.getByRole('textbox', { name: 'Imię i nazwisko' }).fill(user.name);
    await page.getByRole('button', { name: 'Zarejestruj się' }).click();

    await expect(page.getByText('An account with this email')).toBeVisible();
  });
});

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
    await page.waitForURL('/login');
  });

  test('should register a new user successfully', async ({ page }) => {
    const user = {
      email: `daniela@gmail.com`,
      password: `daniela@gmail.com`,
      name: 'daniela',
    };

    await loginPage.goToRegistrationPage();
    await registrationPage.register(user);
    await loginPage.login(user);

    await page.waitForURL('/dashboard');
    await expect(page.getByRole('heading', { name: 'Mini Bank' })).toBeVisible();
  });

  test('should show error if email already exists', async () => {
    const user = {
      email: `ewa@gmail.com`,
      password: `ewa@gmail.com`,
      name: 'ewa',
    };

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
