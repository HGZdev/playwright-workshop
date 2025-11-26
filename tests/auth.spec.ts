import { test, expect } from '@playwright/test';
import { generateUserInput } from './mocks/users.mock';
import UserAuthPage from './page-objects/UserAuthPage';

const user1 = generateUserInput('Emma Watson', 'client');

test.describe('Registration Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should register a new user successfully', async ({ page }) => {
    await page.getByRole('link', { name: 'Register new account' }).click();
    await page.waitForURL('/register');

    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill(user1.email);
    await page.getByRole('textbox', { name: 'Password' }).fill(user1.password);
    await page.getByRole('textbox', { name: 'Full Name' }).fill(user1.name);
    await page.getByRole('button', { name: 'Register' }).click();

    await page.waitForURL('/login');

    await page.getByRole('textbox', { name: 'Email' }).fill(user1.email);
    await page.getByRole('textbox', { name: 'Password' }).fill(user1.password);
    await page.getByRole('button', { name: 'Login' }).click();

    await page.waitForURL('/dashboard');
  });

  test('should show error if email already exists', async ({ page }) => {
    await page.getByRole('link', { name: 'Register new account' }).click();
    await page.waitForURL('/register');

    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill(user1.email);
    await page.getByRole('textbox', { name: 'Password' }).fill(user1.password);
    await page.getByRole('textbox', { name: 'Full Name' }).fill(user1.name);
    await page.getByRole('button', { name: 'Register' }).click();

    await expect(page.locator('.error-text')).toHaveText(
      'An account with this email already exists. Please use a different email or try logging in.',
    );
  });
});

const user2 = generateUserInput('Sokrates', 'client');
const user3 = generateUserInput('', 'client');

test.describe('Registration Flow with Page Object', () => {
  let userAuthPage: UserAuthPage;
  test.beforeEach(async ({ page }) => {
    userAuthPage = new UserAuthPage(page);
    await page.goto('/');
  });

  test('should register a new user successfully', async ({ page }) => {
    await userAuthPage.registerUser(user2);
    await userAuthPage.loginUser(user2);
  });

  test('should show error if email already exists', async ({ page }) => {
    await userAuthPage.registerUser(user3);
    await userAuthPage.loginUser(user3);

    await userAuthPage.goToRegistrationPage();
    await userAuthPage.fillUserRegistrationForm(user3);

    await userAuthPage.hasError(
      'An account with this email already exists. Please use a different email or try logging in.',
    );
  });
});
