import test, { expect } from 'playwright/test';
import userGen from './utils/userGen';
test.describe('User Registration and Login Flow - version 1', () => {
  test.beforeEach(async ({ page }) => {
    /* nawiguj do strony głównej */
    await page.goto('/');
    await expect(page).toHaveURL('/login');
  });

  test('should register a new user successfully', async ({ page }) => {
    const user = userGen();

    /* przejdz do strony z formularzem rejestracyjnym za pomocą linku */

    // await page.getByText('Zarejestruj nowe konto').click();
    // await page.locator('a').filter({ hasText: 'Zarejestruj nowe konto' }).click();
    await page.getByRole('link', { name: 'Zarejestruj nowe konto' }).click();

    /* upewnij się, że znajdujesz się na stronie z formularzem rejestracyjnym */
    await expect(page).toHaveURL('/register');

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
    await expect(page).toHaveURL('/login');
    await expect(page.getByRole('heading', { name: 'Logowanie' })).toBeVisible();

    /* zaloguj się za pomocą danych nowo utworzonego klienta */
    await page.getByLabel('E-mail').click();
    await page.getByLabel('E-mail').fill(user.email);
    await page.getByLabel('Hasło').click();
    await page.getByLabel('Hasło').fill(user.password);

    /* zatwierdz formularz logowania */
    await page.getByRole('button', { name: 'Zaloguj się' }).click();

    /* upewnij się, że znajdujesz się na stronie z formularzem logowania */
    await expect(page).toHaveURL('/dashboard');
    await expect(page.getByRole('heading', { name: 'Dostępne środki' })).toBeVisible();
    await expect(page.getByTestId('balance-amount')).toContainText('zł');
  });
});
