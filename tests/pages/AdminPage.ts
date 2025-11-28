import { expect, Page } from '@playwright/test';

class AdminPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async isAdminPageLoaded() {
    console.log('Checking if admin page is loaded...');
    await this.page.waitForURL('/admin');
    await expect(this.page.getByRole('heading', { name: 'Panel administratora' })).toBeVisible();
  }

  async logout() {
    console.log('Logging out...');
    await this.page.getByRole('button', { name: 'Wyloguj się' }).click();
  }

  async goToDashboard() {
    console.log('Going to dashboard...');
    await this.page.getByRole('link', { name: 'Panel główny' }).click();
  }
}

export default AdminPage;
