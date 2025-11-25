import fs from 'fs/promises';
import path from 'path';
import { User, Transaction } from './mockData.js';

const DB_PATH = path.join(process.cwd(), 'db.json');

export interface DatabaseSchema {
  users: User[];
  balance: number;
  transactions: Transaction[];
}

const INITIAL_DB: DatabaseSchema = {
  users: [
    { id: '1', username: 'user1', password: 'user1', name: 'Jan Kowalski', role: 'client' },
    { id: '2', username: 'user2', password: 'user2', name: 'Irena Nowak', role: 'client' },
    { id: '3', username: 'admin', password: 'admin', name: 'Admin User', role: 'admin' },
  ],
  balance: 1000.0,
  transactions: [
    { id: '1', date: '2023-10-26', title: 'Wypłata', amount: 5000, type: 'incoming' },
    { id: '2', date: '2023-10-27', title: 'Zakupy', amount: -150, type: 'outgoing' },
  ],
};

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
  get balance() {
    return this.data.balance;
  }
  get transactions() {
    return this.data.transactions;
  }

  set balance(value: number) {
    this.data.balance = value;
  }

  addTransaction(transaction: Transaction) {
    this.data.transactions.unshift(transaction);
  }

  async addUser(user: User) {
    this.data.users.push(user);
    await this.save();
  }

  async updateUser(id: string, updates: Partial<User>) {
    const userIndex = this.data.users.findIndex((u) => u.id === id);
    if (userIndex !== -1) {
      this.data.users[userIndex] = { ...this.data.users[userIndex], ...updates };
      await this.save();
      return this.data.users[userIndex];
    }
    return null;
  }

  async deleteUser(id: string) {
    const initialLength = this.data.users.length;
    this.data.users = this.data.users.filter((u) => u.id !== id);
    if (this.data.users.length !== initialLength) {
      await this.save();
      return true;
    }
    return false;
  }
}

export const db = new Database();
