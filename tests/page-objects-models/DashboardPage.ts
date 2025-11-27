import { expect, Page } from '@playwright/test';

class DashboardPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async isDashboardLoaded() {
    await expect(this.page).toHaveURL('/dashboard');
    await expect(this.page.getByRole('heading', { name: 'Dostępne saldo' })).toBeVisible();
    await expect(this.page.getByTestId('balance-amount')).toContainText('zł');
  }

  async logout() {
    await this.page.getByRole('button', { name: 'Wyloguj się z konta' }).click();
    await this.page.waitForURL('/login');
  }

  async getBalance(): Promise<number> {
    const text = await this.page.getByTestId('balance-amount').textContent();
    return parseFloat(text?.replace(/[^\d,-]/g, '').replace(',', '.') || '0');
  }

  goToAdminPage = async () => {
    await this.page.getByRole('link', { name: 'Panel administratora' }).click();
    await this.page.waitForURL('/admin');
  };

  goToAddMoneyPage = async () => {
    await this.page.getByRole('link', { name: 'Doładuj konto' }).click();
    await this.page.waitForURL('/add-money');
  };

  goToTransferMoneyPage = async () => {
    await this.page.getByRole('link', { name: 'Wykonaj przelew' }).click();
    await this.page.waitForURL('/send-money');
  };
}

export default DashboardPage;
