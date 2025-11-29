import { expect, test } from '@playwright/test';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import DashboardPage from './pages/DashboardPage';

test.describe('User Registration and Login Flow - version 1', () => {
  test.beforeEach(async ({ page }) => {
    /* nawiguj do strony głównej */
  });

  test('should register a new user successfully', async ({ page }) => {
    const user = {
      email: `anna@gmail.com`,
      password: `anna@gmail.com`,
      name: 'anna',
    };

    /* przejdz do strony z formularzem rejestracyjnym za pomocą linku */

    /* upewnij się, że znajdujesz się na stronie z formularzem rejestracyjnym */

    /* wypełnij pola formularza rejestracyjnego */

    /* zatwierdz formularz rejestracyjny */

    /* upewnij się, że znajdujesz się na stronie z formularzem logowania */

    /* zaloguj się za pomocą danych nowo utworzonego klienta */

    /* zatwierdz formularz logowania */

    /* upewnij się, że znajdujesz się na stronie z formularzem logowania */
  });
});

// test.describe('User Registration and Login Flow - version 2', () => {
//   test.beforeEach(async ({ page }) => {});

//   test('should register a new user successfully', async ({ page }) => {
//     const user = {
//       email: `barbara@gmail.com`,
//       password: `barbara@gmail.com`,
//       name: 'barbara',
//     };
//   });

//   test('should show error if email already exists', async ({ page }) => {
//     const user = {
//       email: `cecylia@gmail.com`,
//       password: `cecylia@gmail.com`,
//       name: 'cecylia',
//     };
//   });
// });

// test.describe('User Registration and Login Flow - version 3', () => {
//   test.beforeEach(async ({ page }) => {});

//   test('should register a new user successfully', async ({ page }) => {
//     const user = {
//       email: `daniela@gmail.com`,
//       password: `daniela@gmail.com`,
//       name: 'daniela',
//     };
//   });

//   test('should show error if email already exists', async () => {
//     const user = {
//       email: `ewa@gmail.com`,
//       password: `ewa@gmail.com`,
//       name: 'ewa',
//     };
//   });
// });
