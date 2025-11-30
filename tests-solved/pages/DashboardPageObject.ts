import { expect, Page } from '@playwright/test';
import parseBalanceText from '../utils/parseBalanceText';

class DashboardPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async isDashboardLoaded() {
    console.log('Checking if dashboard is loaded...');
    await expect(this.page).toHaveURL('/dashboard', { timeout: 15000 });
    await expect(this.page.getByRole('heading', { name: 'Dostępne środki' })).toBeVisible();
    await expect(this.page.getByTestId('balance-amount')).toContainText('zł');
  }

  async logout() {
    console.log('Logging out...');
    await this.page.getByRole('button', { name: 'Wyloguj się' }).click();
  }

  async goToAdminPage() {
    console.log('Going to admin page...');
    await this.page.getByRole('link', { name: 'Panel administratora' }).click();
  }

  async goToAddMoneyPage() {
    console.log('Going to add money page...');
    await this.page.getByRole('link', { name: 'Doładuj konto' }).click();
  }

  async goToSendMoneyPage() {
    console.log('Going to send money page...');
    await this.page.getByRole('link', { name: 'Wykonaj przelew' }).click();
  }

  async getBalance(): Promise<number> {
    console.log('Getting balance...');
    const text = await this.page.getByTestId('balance-amount').textContent();
    return parseBalanceText(text || '');
  }
}

export default DashboardPage;
