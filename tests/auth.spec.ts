import { test, expect } from '@playwright/test';
import { generateUserInput } from './mocks/users.mock';
import UserAuthPage from './page-objects-models/UserAuthPage';
import DashboardPage from './page-objects-models/DashboardPage';

test.describe('User Registration and Login Flow', () => {
  const user1 = generateUserInput('Posejdon');
  const user2 = generateUserInput('Herkules');
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should register a new user successfully', async ({ page }) => {
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
  let userAuthPage: UserAuthPage;
  let dashboardPage: DashboardPage;

  const user3 = generateUserInput('Zeus');
  const user4 = generateUserInput('Atena');

  test.beforeEach(async ({ page }) => {
    userAuthPage = new UserAuthPage(page);
    dashboardPage = new DashboardPage(page);
    await page.goto('/');
  });

  test('should register a new user successfully', async ({ page }) => {
    await userAuthPage.register(user3);
    await userAuthPage.login(user3);
  });

  test('should show error if email already exists', async () => {
    await userAuthPage.register(user4);
    await userAuthPage.login(user4);

    await dashboardPage.logout();

    await userAuthPage.goToRegistrationPage();
    await userAuthPage.fillAndSubmitUserRegistrationForm(user4);

    await userAuthPage.hasError(
      'An account with this email already exists. Please use a different email or try logging in.',
    );
  });
});

test.describe('Admin Registration and Login Flow with Page Object', () => {
  let userAuthPage: UserAuthPage;
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    userAuthPage = new UserAuthPage(page);
    dashboardPage = new DashboardPage(page);
    await page.goto('/');
  });

  test('should login to admin account successfully', async () => {
    await userAuthPage.goToLoginPage();
    await userAuthPage.loginAdmin();
    await dashboardPage.isDashboardLoaded();

    await dashboardPage.goToAdminPage();
  });

  // test('should register a new user successfully', async () => {
  //   await userAuthPage.register(admin1);
  //   await userAuthPage.login(admin1);

  //   // await dashboardPage.to();
  // });
});
