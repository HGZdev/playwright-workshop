import { expect, Page } from '@playwright/test';
import { UserInput } from '../../_server/database/types';

class UserAuthPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async submitButtonIsBusy() {
    await expect(this.page.locator('button[type="submit"][aria-busy="true"]')).toBeVisible();
  }

  async submitButtonIsIdle() {
    await expect(this.page.locator('button[type="submit"][aria-busy="false"]')).toBeVisible();
  }

  async hasError(text: string) {
    return expect(this.page.getByRole('alert')).toHaveText(text);
  }

  // Registration

  async goToRegistrationPage() {
    await this.page.goto('/');
    await this.page.getByRole('link', { name: 'Zarejestruj nowe konto' }).click();
    await this.page.waitForURL('/register');
  }

  async fillAndSubmitUserRegistrationForm({
    email,
    password,
    name,
  }: Pick<UserInput, 'email' | 'password' | 'name'>) {
    await this.page.getByRole('textbox', { name: 'E-mail' }).click();
    await this.page.getByRole('textbox', { name: 'E-mail' }).fill(email);
    await this.page.getByRole('textbox', { name: 'Hasło' }).fill(password);
    await this.page.getByRole('textbox', { name: 'Imię i nazwisko' }).fill(name);

    await this.page.getByRole('button', { name: 'Zarejestruj się' }).click();
  }

  async register({ email, password, name }: Pick<UserInput, 'email' | 'password' | 'name'>) {
    await this.goToRegistrationPage();
    await this.fillAndSubmitUserRegistrationForm({ email, password, name });
    await this.page.waitForURL('/login');
  }

  // Login

  async goToLoginPage() {
    await this.page.goto('/login');
  }

  async fillAndSubmitUserLoginForm({ email, password }: Pick<UserInput, 'email' | 'password'>) {
    await this.page.getByRole('textbox', { name: 'E-mail' }).click();
    await this.page.getByRole('textbox', { name: 'E-mail' }).fill(email);
    await this.page.getByRole('textbox', { name: 'Hasło' }).fill(password);

    await this.page.getByRole('button', { name: 'Zaloguj się' }).click();
  }

  async login({ email, password }: Pick<UserInput, 'email' | 'password'>) {
    await this.goToLoginPage();
    await this.fillAndSubmitUserLoginForm({ email, password });
    await this.page.waitForURL('/dashboard');
  }

  async loginAdmin() {
    await this.goToLoginPage();
    await this.fillAndSubmitUserLoginForm({
      email: 'admin@gmail.com',
      password: 'admin@gmail.com',
    });
    await this.page.waitForURL('/dashboard');
  }
}

export default UserAuthPage;
