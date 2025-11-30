import test, { expect } from 'playwright/test';
import userGen from './utils/userGen';
test.describe('User Registration and Login Flow - version 1', () => {
  test.beforeEach(async ({ page }) => {
    /* nawiguj do strony głównej */
  });

  test('should register a new user successfully', async ({ page }) => {
    const user = userGen();
    /* przejdz do strony z formularzem rejestracyjnym za pomocą linku */

    /* upewnij się, że znajdujesz się na stronie z formularzem rejestracyjnym */

    /* wypełnij pola formularza rejestracyjnego */

    /* zatwierdz formularz rejestracyjny */

    /* upewnij się, że znajdujesz się na stronie z formularzem logowania */

    /* zaloguj się za pomocą danych nowo utworzonego klienta */

    /* zatwierdz formularz logowania */

    /* upewnij się, że`await page.goto('chrome-error://chromewebdata/'); znajdujesz się na stronie z formularzem logowania */
  });
});
