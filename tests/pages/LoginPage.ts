import { expect, Page } from '@playwright/test';
import { UserInput } from '../../_server/database/types';

class UserAuthPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async hasError(text: string) {
    console.log(`Checking if error "${text}" is visible...`);
    this.page.getByRole('alert', { name: text });
  }

  async isLoginPageLoaded() {
    console.log('Checking if login page is loaded...');
    await this.page.waitForURL('/login');
    await expect(this.page.getByRole('heading', { name: 'Zaloguj się' })).toBeVisible();
  }

  async fillAndSubmitUserLoginForm({ email, password }: Pick<UserInput, 'email' | 'password'>) {
    console.log(`Filling and submitting user login form [${email}, ${password}]...`);
    await this.page.getByRole('textbox', { name: 'E-mail' }).click();
    await this.page.getByRole('textbox', { name: 'E-mail' }).fill(email);
    await this.page.getByRole('textbox', { name: 'Hasło' }).fill(password);

    await this.page.getByRole('button', { name: 'Zaloguj się' }).click();
  }

  async login({ email, password }: Pick<UserInput, 'email' | 'password'>) {
    console.log(`Logging in as user [${email}, ${password}]...`);
    await this.isLoginPageLoaded();
    await this.fillAndSubmitUserLoginForm({ email, password });
  }

  async loginAdmin() {
    console.log('Logging in as admin...');
    await this.isLoginPageLoaded();
    await this.fillAndSubmitUserLoginForm({
      email: 'admin@gmail.com',
      password: 'admin@gmail.com',
    });
  }

  async goToRegistrationPage() {
    console.log('Going to registration page...');
    await this.page.getByRole('link', { name: 'Zarejestruj nowe konto' }).click();
  }
}

export default UserAuthPage;
