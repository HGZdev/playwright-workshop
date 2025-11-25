import { expect, Page } from '@playwright/test';
import { UserInput } from '../../_server/database/types';

class UserAuthPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goToRegistrationPage() {
    await this.page.goto('/');
    await this.page.getByRole('link', { name: 'Register new account' }).click();
  }

  async fillUserRegistrationForm({
    email,
    password,
    name,
  }: Pick<UserInput, 'email' | 'password' | 'name'>) {
    await this.page.getByRole('textbox', { name: 'Email' }).click();
    await this.page.getByRole('textbox', { name: 'Email' }).fill(email);
    await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
    await this.page.getByRole('textbox', { name: 'Full Name' }).fill(name);
    await this.page.getByRole('button', { name: 'Register' }).click();
  }

  async registerUser({ email, password, name }: Pick<UserInput, 'email' | 'password' | 'name'>) {
    await this.goToRegistrationPage();
    await this.fillUserRegistrationForm({ email, password, name });
    await this.page.getByRole('button', { name: 'Register' }).click();
    await this.page.waitForURL('/login');
  }

  async goToLoginPage() {
    await this.page.goto('/login');
  }

  async fillUserLoginForm({ email, password }: Pick<UserInput, 'email' | 'password'>) {
    await this.page.getByRole('textbox', { name: 'Email' }).click();
    await this.page.getByRole('textbox', { name: 'Email' }).fill(email);
    await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
    await this.page.getByRole('button', { name: 'Login' }).click();
  }

  async loginUser({ email, password }: Pick<UserInput, 'email' | 'password'>) {
    await this.goToLoginPage();
    await this.fillUserLoginForm({ email, password });
    await this.page.getByRole('button', { name: 'Login' }).click();

    await this.page.waitForURL('/dashboard');
  }

  async hasError(text: string) {
    return expect(this.page.getByRole('alert')).toHaveText(text);
  }
}

export default UserAuthPage;
