import fs from 'fs/promises';
import path from 'path';
import { User, Transaction, Account } from './types.js';
import { INITIAL_DB } from './initalData.js';

const isTestEnv = process.env.NODE_ENV === 'test';
const DB_FILENAME = isTestEnv ? 'testing.db' : 'production.db';
const DB_PATH = path.join(process.cwd(), 'data', DB_FILENAME);

export interface DatabaseSchema {
  users: User[];
  transactions: Transaction[];
  accounts: Account[];
}

export class Database {
  private data: DatabaseSchema = INITIAL_DB;

  async init() {
    try {
      const content = await fs.readFile(DB_PATH, 'utf-8');
      this.data = JSON.parse(content);
    } catch {
      // If file doesn't exist, create it with initial data
      await this.save();
    }
  }

  async save() {
    await fs.writeFile(DB_PATH, JSON.stringify(this.data, null, 2));
  }

  get users() {
    return this.data.users;
  }

  get accounts() {
    return this.data.accounts;
  }

  get transactions() {
    return this.data.transactions;
  }

  async addTransaction(transaction: Transaction) {
    this.data.transactions.unshift(transaction);
    await this.save();
  }

  async addUser(user: User) {
    this.data.users.push(user);
    await this.save();
  }

  async addAccount(account: Account) {
    this.data.accounts.push(account);
    await this.save();
    return account.id;
  }

  async updateUser(id: User['id'], updates: Partial<User>) {
    const userIndex = this.data.users.findIndex((u) => u.id === id);
    if (userIndex !== -1) {
      this.data.users[userIndex] = { ...this.data.users[userIndex], ...updates };
      await this.save();
      return this.data.users[userIndex];
    }
    return null;
  }

  async deleteUser(id: User['id']) {
    const userIndex = this.data.users.findIndex((u) => u.id === id);

    if (userIndex !== -1) {
      this.data.users.splice(userIndex, 1);
      await this.save();
      return true;
    }
    return false;
  }

  async reset() {
    this.data = { ...INITIAL_DB };
    await this.save();
  }
}

export const db = new Database();
