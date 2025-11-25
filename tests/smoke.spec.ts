import { test, expect } from '@playwright/test';

test('smoke test - app loads', async ({ page }) => {
  await page.goto('/');

  // <title>Mini Bank</title>
  await expect(page).toHaveTitle('Mini Bank');

  // <h1>Mini Bank</h1>
  const heading1 = page.getByText('Mini Bank');
  await expect(heading1).toBeVisible();

  // <h1>Mini Bank</h1>
  const heading2 = page.locator('h1').filter({ hasText: 'Mini Bank' });
  await expect(heading2).toBeVisible();

  // <h1>Mini Bank</h1>
  const heading3 = page.getByRole('heading', { level: 1, name: 'Mini Bank' });
  await expect(heading3).toBeVisible();

  // <h1>Mini Bank</h1>
  const heading4 = page.locator('h1');
  await expect(heading4).toContainText('Mini Bank');

  // <h1>Mini Bank</h1>
  const heading5 = page.getByRole('heading', { level: 1 });
  await expect(heading5).toContainText('Mini Bank');
});
