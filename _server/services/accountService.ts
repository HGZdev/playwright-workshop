import { db } from '../database/database.js';
import { Transaction } from '../database/types.js';
import { randomDelay } from '../utils/delay.js';

export class AccountService {
  async getAccount(accountId: number) {
    if (!accountId) throw new Error('accountId is undefined');
    await randomDelay('getAccount', 300, 1000);
    const account = await db.getAccountById(accountId);
    const transactions = await this.getTransactions(accountId);

    if (!account) {
      throw new Error('Account not found');
    }

    account.transactions = transactions;
    return account;
  }

  async getTransactions(accountId: number) {
    await randomDelay('getTransactions');
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
    await randomDelay('addMoney');

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
    await randomDelay('sendMoney', 6000, 7000); // Longer delay for outgoing transaction processing

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
