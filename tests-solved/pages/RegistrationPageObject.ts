import { expect, Page } from '@playwright/test';
import { UserInput } from '../../_server/database/types';

class RegistrationPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async isRegistrationPageLoaded() {
    console.log('Checking if registration page is loaded...');
    await expect(this.page).toHaveURL('/register');
    await expect(this.page.getByRole('heading', { name: 'Rejestracja' })).toBeVisible();
  }

  async fillAndSubmitUserRegistrationForm({
    email,
    password,
    name,
  }: Pick<UserInput, 'email' | 'password' | 'name'>) {
    console.log(
      `Filling and submitting user registration form [${email}, ${password}, ${name}]...`,
    );
    await this.isRegistrationPageLoaded();
    await this.page.getByRole('textbox', { name: 'E-mail' }).click();
    await this.page.getByRole('textbox', { name: 'E-mail' }).fill(email);
    await this.page.getByRole('textbox', { name: 'Hasło' }).click();
    await this.page.getByRole('textbox', { name: 'Hasło' }).fill(password);
    await this.page.getByRole('textbox', { name: 'Imię i nazwisko' }).click();
    await this.page.getByRole('textbox', { name: 'Imię i nazwisko' }).fill(name);

    await this.page.getByRole('button', { name: 'Zarejestruj się' }).click();
  }

  async register({ email, password, name }: Pick<UserInput, 'email' | 'password' | 'name'>) {
    console.log(`Registering user [${email}, ${password}, ${name}]...`);
    await this.isRegistrationPageLoaded();
    await this.fillAndSubmitUserRegistrationForm({ email, password, name });
  }

  async hasError(text: string) {
    console.log(`Checking if error "${text}" is visible...`);
    this.page.getByRole('alert', { name: text });
  }

  async goToLoginPage() {
    console.log('Going to login page...');
    await this.page.goto('/login');
  }
}

export default RegistrationPage;
