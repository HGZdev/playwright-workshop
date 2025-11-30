import { expect, Page } from '@playwright/test';
import { TransactionInput } from '../../_server/database/types';

class TransactionPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async hasError(text: string) {
    console.log(`Checking if error "${text}" is visible...`);
    this.page.getByRole('alert', { name: text });
  }

  async isAddMoneyPageLoaded() {
    console.log('Checking if add money page is loaded...');
    await this.page.waitForURL('/add-money');
    await expect(this.page.getByRole('heading', { name: 'Doładuj konto' })).toBeVisible();
  }

  async isSendMoneyPageLoaded() {
    console.log('Checking if send money page is loaded...');
    await this.page.waitForURL('/send-money');
    await expect(this.page.getByRole('heading', { name: 'Wykonaj przelew' })).toBeVisible();
  }

  async fillAndSubmitAddMoneyForm({ title, amount }: Pick<TransactionInput, 'title' | 'amount'>) {
    console.log(`Filling and submitting add money form [${title}, ${amount}]...`);
    await this.page.getByRole('textbox', { name: 'Tytuł' }).fill(title);
    await this.page.getByRole('spinbutton', { name: 'Kwota' }).fill(amount.toString());

    await this.page.getByRole('button', { name: 'Doładuj' }).click();
  }

  async fillAndSubmitSendMoneyForm({
    title,
    amount,
    recipient,
  }: Pick<TransactionInput, 'title' | 'amount' | 'recipient'>) {
    console.log(`Filling and submitting send money form [${title}, ${amount}, ${recipient}]...`);
    await this.page.getByRole('textbox', { name: 'Tytuł' }).fill(title);
    await this.page.getByRole('spinbutton', { name: 'Kwota' }).fill(amount.toString());
    await this.page.getByRole('textbox', { name: 'Odbiorca' }).fill(recipient);

    await this.page.getByRole('button', { name: 'Wyślij przelew' }).click();
  }
}

export default TransactionPage;
