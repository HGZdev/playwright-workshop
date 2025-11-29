import { expect, test } from '@playwright/test';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import DashboardPage from './pages/DashboardPage';

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

    await test.step('przejdz do strony z formularzem rejestracyjnym za pomocą linku', async () => {
      // await page.getByText('Zarejestruj nowe konto').click();
      // await page.locator('a').filter({ hasText: 'Zarejestruj nowe konto' }).click();
      await page.getByRole('link', { name: 'Zarejestruj nowe konto' }).click();
    });

    await test.step('upewnij się, że znajdujesz się na stronie z formularzem rejestracyjnym', async () => {
      await page.waitForURL('/register');
    });

    await test.step('wypełnij pola formularza rejestracyjnego', async () => {
      // await page.locator('#email').click();
      await page.getByLabel('E-mail').click();
      await page.getByLabel('E-mail').fill(user.email);
      await page.getByLabel('Hasło').click();
      await page.getByLabel('Hasło').fill(user.password);
      await page.getByRole('textbox', { name: 'Imię i nazwisko' }).click();
      await page.getByRole('textbox', { name: 'Imię i nazwisko' }).fill(user.name);
    });

    await test.step('zatwierdz formularz rejestracyjny', async () => {
      await page.getByRole('button', { name: 'Zarejestruj się' }).click();
    });

    await test.step('upewnij się, że znajdujesz się na stronie z formularzem logowania', async () => {
      await page.waitForURL('/login');
      await expect(page.getByRole('heading', { name: 'Logowanie' })).toBeVisible();
    });

    await test.step('zaloguj się za pomocą danych nowo utworzonego klienta', async () => {
      await page.getByLabel('E-mail').click();
      await page.getByLabel('E-mail').fill(user.email);
      await page.getByLabel('Hasło').click();
      await page.getByLabel('Hasło').fill(user.password);
    });

    await test.step('zatwierdz formularz logowania', async () => {
      await page.getByRole('button', { name: 'Zaloguj się' }).click();
    });

    await test.step('upewnij się, że znajdujesz się na stronie z formularzem logowania', async () => {
      await page.waitForURL('/dashboard');
      await expect(page.getByRole('heading', { name: 'Mini Bank' })).toBeVisible();
    });
  });
});

test.describe('User Registration and Login Flow - version 2', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.waitForURL('/login');
  });

  test('should register a new user successfully', async ({ page }) => {
    const user = {
      email: `client_${new Date().getTime()}@gmail.com`,
      password: `client_${new Date().getTime()}@gmail.com`,
      name: 'client',
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
      email: `client_${new Date().getTime()}@gmail.com`,
      password: `client_${new Date().getTime()}@gmail.com`,
      name: 'client',
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

    // nawiguj do strony głównej
    await page.goto('/login');
    await page.waitForURL('/login');
  });

  test('should register a new user successfully', async ({ page }) => {
    const user = {
      email: `client_${new Date().getTime()}@gmail.com`,
      password: `client_${new Date().getTime()}@gmail.com`,
      name: 'client',
    };

    await loginPage.goToRegistrationPage();
    await registrationPage.register(user);
    await loginPage.login(user);

    await page.waitForURL('/dashboard');
    await expect(page.getByRole('heading', { name: 'Mini Bank' })).toBeVisible();
  });

  test('should show error if email already exists', async () => {
    const user = {
      email: `client_${new Date().getTime()}@gmail.com`,
      password: `client_${new Date().getTime()}@gmail.com`,
      name: 'client',
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
