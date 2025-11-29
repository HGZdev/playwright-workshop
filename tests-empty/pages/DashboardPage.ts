import { Page } from '@playwright/test';
import parseBalanceText from '../utils/parseBalanceText';

class DashboardPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async getBalance(): Promise<number> {
    console.log('Getting balance...');
    const text = await this.page.getByTestId('balance-amount').textContent();
    return parseBalanceText(text || '');
  }

  async isDashboardLoaded() {
    console.log('Checking if dashboard is loaded...');
  }

  async logout() {
    console.log('Logging out...');
  }

  async goToAddMoneyPage() {
    console.log('Going to add money page...');
  }

  async goToSendMoneyPage() {
    console.log('Going to send money page...');
  }

  async goToAdminPage() {
    console.log('Going to admin page...');
  }
}

export default DashboardPage;
