import { expect, Page } from '@playwright/test';
import { TransactionInput } from '../../_server/database/types';

class TransactionPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async hasError(text: string) {
    console.log(`Checking if error "${text}" is visible...`);
  }

  async isAddMoneyPageLoaded() {
    console.log('Checking if add money page is loaded...');
  }

  async isSendMoneyPageLoaded() {
    console.log('Checking if send money page is loaded...');
  }

  async fillAndSubmitAddMoneyForm({ title, amount }: Pick<TransactionInput, 'title' | 'amount'>) {
    console.log(`Filling and submitting add money form [${title}, ${amount}]...`);
  }

  async fillAndSubmitSendMoneyForm({
    title,
    amount,
    recipient,
  }: Pick<TransactionInput, 'title' | 'amount' | 'recipient'>) {
    console.log(`Filling and submitting send money form [${title}, ${amount}, ${recipient}]...`);
  }
}

export default TransactionPage;
