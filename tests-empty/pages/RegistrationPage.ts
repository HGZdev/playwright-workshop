import { expect, Page } from '@playwright/test';
import { UserInput } from '../../_server/database/types';

class UserAuthPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async hasError(text: string) {
    console.log(`Checking if error "${text}" is visible...`);
  }

  async isRegistrationPageLoaded() {
    console.log('Checking if registration page is loaded...');
  }

  async fillAndSubmitUserRegistrationForm({
    email,
    password,
    name,
  }: Pick<UserInput, 'email' | 'password' | 'name'>) {
    console.log(
      `Filling and submitting user registration form [${email}, ${password}, ${name}]...`,
    );
  }

  async register({ email, password, name }: Pick<UserInput, 'email' | 'password' | 'name'>) {
    console.log(`Registering user [${email}, ${password}, ${name}]...`);
  }

  async goToLoginPage() {
    console.log('Going to login page...');
  }
}

export default UserAuthPage;
