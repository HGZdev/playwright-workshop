import { db } from '../data/database.js';
import { Transaction } from '../data/mockData.js';
import { randomDelay } from '../utils/delay.js';

export class AccountService {
  async getBalance() {
    await randomDelay(300, 1000);
    return db.balance;
  }

  async getTransactions() {
    await randomDelay(300, 1000);
    return db.transactions;
  }

  async makeTransfer(recipient: string, title: string, amount: number) {
    await randomDelay(800, 1000); // Longer delay for transaction processing

    if (amount <= 0) {
      throw new Error('Invalid amount');
    }

    if (amount > db.balance) {
      throw new Error('Insufficient funds');
    }

    db.balance -= amount;

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      title: `Przelew do: ${recipient} - ${title}`,
      amount: -amount,
      type: 'outgoing',
    };

    db.addTransaction(newTransaction);
    await db.save(); // Persist changes

    return {
      success: true,
      balance: db.balance,
      transaction: newTransaction,
    };
  }
}

export const accountService = new AccountService();
