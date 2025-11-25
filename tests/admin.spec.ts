import { test, expect } from '@playwright/test';

test.describe('Admin Flow', () => {
  test('should login as admin and see dashboard', async ({ page }) => {
    await page.goto('/login');
    await page.getByTestId('login-input').fill('admin');
    await page.getByTestId('password-input').fill('password');
    await page.getByTestId('login-button').click();

    await expect(page).toHaveURL('/admin');
    await expect(page.getByRole('heading', { name: 'Admin Dashboard' })).toBeVisible();
    await expect(page.getByText('user1')).toBeVisible();
  });

  test('should edit user', async ({ page }) => {
    await page.goto('/login');
    await page.getByTestId('login-input').fill('admin');
    await page.getByTestId('password-input').fill('password');
    await page.getByTestId('login-button').click();

    // Find user1 row and click Edit
    const userRow = page.getByRole('row', { name: 'user1' });
    await userRow.getByRole('button', { name: 'Edit' }).click();

    await expect(page).toHaveURL(/\/admin\/user\//);

    // Wait for form to be populated
    await expect(page.getByLabel('Username')).toHaveValue('user1');

    const newName = `Updated Name ${Date.now()}`;
    await page.getByLabel('Full Name').fill(newName);
    await page.getByRole('button', { name: 'Update User' }).click();

    await expect(page).toHaveURL('/admin');
    await expect(page.getByText(newName)).toBeVisible();
  });

  test('should delete user', async ({ page }) => {
    // Register a user to delete
    await page.goto('/register');
    const username = `todelete_${Date.now()}`;
    await page.getByLabel('Username').fill(username);
    await page.getByLabel('Password').fill('password');
    await page.getByLabel('Full Name').fill('To Delete');
    await page.getByRole('button', { name: 'Register' }).click();

    // Login as admin
    await page.goto('/login');
    await page.getByTestId('login-input').fill('admin');
    await page.getByTestId('password-input').fill('password');
    await page.getByTestId('login-button').click();

    // Handle confirm dialog
    page.on('dialog', (dialog) => dialog.accept());

    // Find user row and click Delete
    const userRow = page.getByRole('row', { name: username });
    await userRow.getByRole('button', { name: 'Delete' }).click();

    await expect(page.getByText(username)).not.toBeVisible();
  });
});
