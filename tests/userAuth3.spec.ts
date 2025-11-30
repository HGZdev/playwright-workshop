// import LoginPage from './pages/LoginPageObject';
// import RegistrationPage from './pages/RegistrationPageObject';
// import DashboardPage from './pages/DashboardPageObject';
import userGen from './utils/userGen';
import test, { expect } from 'playwright/test';

test.describe('User Registration and Login Flow - version 3', () => {
  // let loginPage: LoginPage;
  // let registrationPage: RegistrationPage;
  // let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    // loginPage = new LoginPage(page);
    // registrationPage = new RegistrationPage(page);
    // dashboardPage = new DashboardPage(page);
    /* nawiguj do strony głównej */
    // await page.goto('/login');
    // await page.waitForURL('/login');
  });

  test('should register a new user successfully', async ({ page }) => {
    // const user = userGen();
  });

  test('should show error if email already exists', async () => {
    // const user = userGen();
  });
});
