import { test, expect } from '@playwright/test';

test.describe('Admin Flow', () => {
  test('should login as admin and see dashboard', async ({ page }) => {
    await page.goto('/login');
    await page.getByTestId('login-input').fill('admin@gmail.com');
    await page.getByTestId('password-input').fill('admin');
    await page.getByTestId('login-button').click();

    await expect(page).toHaveURL('/admin');
    await expect(page.getByRole('heading', { name: 'Panel Administratora' })).toBeVisible();
    await expect(page.getByText('client1@gmail.com')).toBeVisible();
  });

  test('should edit user', async ({ page }) => {
    await page.goto('/login');
    await page.getByTestId('login-input').fill('admin@gmail.com');
    await page.getByTestId('password-input').fill('admin');
    await page.getByTestId('login-button').click();

    // Find client1 row and click Edit
    const userRow = page.getByRole('row', { name: 'client1@gmail.com' });
    await userRow.getByRole('button', { name: 'Edytuj' }).click();

    await expect(page).toHaveURL(/\/admin\/user\//);

    // Wait for form to be populated
    await expect(page.getByLabel('E-mail')).toHaveValue('client1@gmail.com');

    const newName = `Updated Name ${Date.now()}`;
    await page.getByLabel('Imię i nazwisko').fill(newName);
    await page.getByRole('button', { name: 'Zaktualizuj użytkownika' }).click();

    await expect(page).toHaveURL('/admin');
    await expect(page.getByText(newName)).toBeVisible();
  });

  test('should delete user', async ({ page }) => {
    // Register a user to delete
    await page.goto('/register');
    const email = `todelete_${Date.now()}@gmail.com`;
    await page.getByLabel('E-mail').fill(email);
    await page.getByLabel('Hasło').fill('password');
    await page.getByLabel('Imię i nazwisko').fill('To Delete');
    await page.getByRole('button', { name: 'Zarejestruj się' }).click();

    // Login as admin
    await page.goto('/login');
    await page.getByTestId('login-input').fill('admin@gmail.com');
    await page.getByTestId('password-input').fill('admin');
    await page.getByTestId('login-button').click();

    // Handle confirm dialog
    page.on('dialog', (dialog) => dialog.accept());

    // Find user row and click Delete
    const userRow = page.getByRole('row', { name: email });
    await userRow.getByRole('button', { name: 'Usuń' }).click();

    await expect(page.getByText(email)).not.toBeVisible();
  });
});
