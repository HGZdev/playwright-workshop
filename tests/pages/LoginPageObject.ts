import { expect, Page } from '@playwright/test';
import { UserInput } from '../../_server/database/types';

class LoginPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async isLoginPageLoaded() {
    console.log('Checking if login page is loaded...');
  }

  async goToRegistrationPage() {
    console.log('Going to registration page...');
  }

  async fillAndSubmitUserLoginForm({ email, password }: Pick<UserInput, 'email' | 'password'>) {
    console.log(`Filling and submitting user login form [${email}, ${password}]...`);
  }

  async login({ email, password }: Pick<UserInput, 'email' | 'password'>) {
    console.log(`Logging in as user [${email}, ${password}]...`);
  }

  async loginAdmin() {
    console.log('Logging in as admin...');
  }

  async hasError(text: string) {
    console.log(`Checking if error "${text}" is visible...`);
  }
}

export default LoginPage;
