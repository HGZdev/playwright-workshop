import test, { expect } from 'playwright/test';
import userGen from './utils/userGen';

test.describe('User Registration and Login Flow - version 2', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.waitForURL('/login');
  });

  test('should register a new user successfully', async ({ page }) => {
    const user = userGen();

    await page.getByRole('link', { name: 'Zarejestruj nowe konto' }).click();
    await expect(page).toHaveURL('/register');

    await page.getByRole('textbox', { name: 'E-mail' }).click();
    await page.getByRole('textbox', { name: 'E-mail' }).fill(user.email);
    await page.getByRole('textbox', { name: 'Hasło' }).click();
    await page.getByRole('textbox', { name: 'Hasło' }).fill(user.password);
    await page.getByRole('textbox', { name: 'Imię i nazwisko' }).click();
    await page.getByRole('textbox', { name: 'Imię i nazwisko' }).fill(user.name);

    await page.getByRole('button', { name: 'Zarejestruj się' }).click();
    await expect(page).toHaveURL('/login');

    await page.getByRole('textbox', { name: 'E-mail' }).click();
    await page.getByRole('textbox', { name: 'E-mail' }).fill(user.email);
    await page.getByRole('textbox', { name: 'Hasło' }).click();
    await page.getByRole('textbox', { name: 'Hasło' }).fill(user.password);
    await page.getByRole('button', { name: 'Zaloguj się' }).click();

    await expect(page).toHaveURL('/dashboard');
    await expect(page.getByRole('heading', { name: 'Dostępne środki' })).toBeVisible();
    await expect(page.getByTestId('balance-amount')).toContainText('zł');
  });

  test('should show error if email already exists', async ({ page }) => {
    const user = userGen();

    await page.getByRole('link', { name: 'Zarejestruj nowe konto' }).click();
    await expect(page).toHaveURL('/register');

    await page.getByRole('textbox', { name: 'E-mail' }).click();
    await page.getByRole('textbox', { name: 'E-mail' }).fill(user.email);
    await page.getByRole('textbox', { name: 'Hasło' }).click();
    await page.getByRole('textbox', { name: 'Hasło' }).fill(user.password);
    await page.getByRole('textbox', { name: 'Imię i nazwisko' }).click();
    await page.getByRole('textbox', { name: 'Imię i nazwisko' }).fill(user.name);

    await page.getByRole('button', { name: 'Zarejestruj się' }).click();
    await expect(page).toHaveURL('/login');

    await page.getByRole('textbox', { name: 'E-mail' }).click();
    await page.getByRole('textbox', { name: 'E-mail' }).fill(user.email);
    await page.getByRole('textbox', { name: 'Hasło' }).click();
    await page.getByRole('textbox', { name: 'Hasło' }).fill(user.password);
    await page.getByRole('button', { name: 'Zaloguj się' }).click();

    await expect(page).toHaveURL('/dashboard');
    await expect(page.getByRole('heading', { name: 'Dostępne środki' })).toBeVisible();
    await expect(page.getByTestId('balance-amount')).toContainText('zł');

    await page.getByRole('button', { name: 'Wyloguj się z konta' }).click();

    await expect(page).toHaveURL('/login');
    await page.getByRole('link', { name: 'Zarejestruj nowe konto' }).click();

    await expect(page).toHaveURL('/register');
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
