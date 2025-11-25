import { db } from '../database/database.js';
import { Account, Transaction } from '../database/types.js';
import { randomDelay } from '../utils/delay.js';

export class AccountService {
  async getBalance(accountId: number) {
    await randomDelay(300, 1000);
    const transactions = await this.getTransactions(accountId);
    return transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
  }

  async getAccount(accountId: number) {
    await randomDelay(300, 1000);
    const account = db.accounts.find((account) => account.id === accountId);
    const transactions = await this.getTransactions(accountId);

    account.transactions = transactions;
    return account;
  }

  async createAccount() {
    await randomDelay(300, 1000);
    const newAccount: Account = {
      id: Date.now(),
      transactionIds: [],
    };
    db.accounts.push(newAccount);

    await db.save();
    return newAccount;
  }

  async getTransactions(accountId: number) {
    await randomDelay(300, 1000);
    return db.transactions.filter((transaction) => transaction.accountId === accountId);
  }

  async makeTransaction({
    recipient,
    title,
    amount,
    type,
    accountId,
  }: {
    recipient: string;
    title: string;
    amount: number;
    type: 'incoming' | 'outgoing';
    accountId: number;
  }) {
    await randomDelay(800, 1000); // Longer delay for transaction processing

    if (type === 'outgoing' && amount <= 0) {
      throw new Error('Invalid amount');
    }

    if (type === 'incoming' && amount <= 0) {
      throw new Error('Invalid amount');
    }

    const newTransaction: Transaction = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      recipient,
      title,
      amount: type === 'outgoing' ? -amount : amount,
      accountId,
      type,
    };

    db.transactions.push(newTransaction);
    await db.save();

    return {
      success: true,
      transaction: newTransaction,
    };
  }
}

export const accountService = new AccountService();
