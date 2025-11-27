import fs from 'fs/promises';
import path from 'path';
import { User, Transaction, Account } from './types.js';
import { INITIAL_DB } from './initalData.js';

const DB_FILENAME = 'database.db';
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
    await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
    await fs.writeFile(DB_PATH, JSON.stringify(this.data, null, 2));
  }

  async reset() {
    this.data = JSON.parse(JSON.stringify(INITIAL_DB));
    await this.save();
  }

  async getUserById(id: User['id']) {
    return this.data.users.find((user) => user.id === id);
  }

  async getUserByEmail(email: User['email']) {
    return this.data.users.find((user) => user.email === email);
  }

  async getUsers() {
    return this.data.users;
  }

  async addUser(user: User) {
    this.data.users.push(user);
    await this.save();
    return user.id;
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

  async getAccountById(id: Account['id']) {
    return this.data.accounts.find((account) => account.id === id);
  }

  async getAccounts() {
    return this.data.accounts;
  }

  async addAccount(account: Account) {
    this.data.accounts.push(account);
    await this.save();
    return account.id;
  }

  async getTransactions() {
    return this.data.transactions;
  }

  async addTransaction(transaction: Transaction) {
    this.data.transactions.unshift(transaction);
    await this.save();
  }
}

export const db = new Database();
