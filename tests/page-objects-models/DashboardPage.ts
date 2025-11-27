import { expect, Page } from '@playwright/test';

class DashboardPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async isDashboardLoaded() {
    console.log('Checking if dashboard is loaded...');
    await expect(this.page).toHaveURL('/dashboard');
    await expect(this.page.getByRole('heading', { name: 'Dostępne saldo' })).toBeVisible();
    await expect(this.page.getByTestId('balance-amount')).toContainText('zł');
  }

  async logout() {
    console.log('Logging out...');
    await this.page.getByRole('button', { name: 'Wyloguj się' }).click();
  }

  async getBalance(): Promise<number> {
    console.log('Getting balance...');
    const text = await this.page.getByTestId('balance-amount').textContent();
    return parseFloat(text?.replace(/[^\d,-]/g, '').replace(',', '.') || '0');
  }

  async goToAdminPage() {
    console.log('Going to admin page...');
    // await this.page.getByRole('link', { name: 'Panel administratora' }).click();
    await this.page.getByRole('button', { name: 'Panel administratora' }).click();
  }

  async goToAddMoneyPage() {
    console.log('Going to add money page...');
    await this.page.getByRole('button', { name: 'Doładuj konto' }).click();
  }

  async goToTransferMoneyPage() {
    console.log('Going to transfer money page...');
    await this.page.getByRole('button', { name: 'Wykonaj przelew' }).click();
  }
}

export default DashboardPage;
