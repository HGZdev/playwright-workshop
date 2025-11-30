import test, { expect } from 'playwright/test';

test('smoke test - app loading', async ({ page }) => {
  await page.goto('/');

  await page.waitForURL('/login');
  await expect(page).toHaveURL('/login');

  const header = page.getByText('Mini Bank');
  await expect(header).toBeVisible();
});
