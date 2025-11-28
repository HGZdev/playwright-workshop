import { db } from '../database/database.js';
import { Account, Transaction } from '../database/types.js';
import { randomDelay } from '../utils/delay.js';

export class AccountService {
  async getAccount(accountId: number) {
    await randomDelay(300, 1000);
    const account = await db.getAccountById(accountId);
    const transactions = await this.getTransactions(accountId);

    if (!account) {
      throw new Error('Account not found');
    }

    account.transactions = transactions;
    return account;
  }

  async createAccount() {
    await randomDelay(300, 1000);
    const newAccount: Account = {
      id: Date.now(),
      transactions: [],
    };
    await db.addAccount(newAccount);

    await db.save();
    return newAccount;
  }

  async getTransactions(accountId: number) {
    await randomDelay(300, 1000);
    const transactions = await db.getTransactions();
    return transactions.filter((transaction) => transaction.accountId === accountId);
  }

  async addMoney({
    title,
    amount,
    accountId,
  }: {
    title: string;
    amount: number;
    accountId: number;
  }) {
    await randomDelay(300, 700);

    if (amount <= 0) {
      throw new Error('Invalid amount');
    }

    const newTransaction: Transaction = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      recipient: 'Ja',
      title,
      amount: amount,
      accountId,
      type: 'incoming',
    };

    await db.addTransaction(newTransaction);
    await db.save();

    return {
      success: true,
      transaction: newTransaction,
    };
  }

  async sendMoney({
    recipient,
    title,
    amount,
    accountId,
  }: {
    recipient: string;
    title: string;
    amount: number;
    accountId: number;
  }) {
    await randomDelay(6000, 6000); // Longer delay for incoming transaction processing

    if (amount <= 0) {
      throw new Error('Invalid amount');
    }

    const newTransaction: Transaction = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      recipient,
      title,
      amount: -amount,
      accountId,
      type: 'outgoing',
    };

    await db.addTransaction(newTransaction);
    await db.save();

    return {
      success: true,
      transaction: newTransaction,
    };
  }
}

export const accountService = new AccountService();
