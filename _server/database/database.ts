// import fs from 'fs/promises';
import path from 'path';
import { User, Transaction, Account } from './types.js';
import { INITIAL_DB } from './initalData.js';
import { dbLogger } from '../utils/loggers.js';

const DB_FILENAME = 'testing-db.json';
const DB_PATH = path.join(process.cwd(), 'data', DB_FILENAME);

export interface DatabaseSchema {
  users: User[];
  transactions: Transaction[];
  accounts: Account[];
}

// Zawsze pracujemy na KOPII INITIAL_DB, nie na referencji
const cloneInitialDb = (): DatabaseSchema => JSON.parse(JSON.stringify(INITIAL_DB));

export class Database {
  private data: DatabaseSchema = cloneInitialDb();

  async init() {
    dbLogger(`Initializing database from ${DB_PATH}`);
    this.data = cloneInitialDb();
    // await this.save();
    // try {
    //   const content = await fs.readFile(DB_PATH, 'utf-8');
    //   this.data = JSON.parse(content);
    // } catch (err) {
    //   // Jeśli plik nie istnieje albo jest uszkodzony – logujemy i tworzymy od nowa
    //   console.error('Failed to load DB, recreating from initial data', err);
    //   this.data = cloneInitialDb();
    // await this.save();
    // }
  }

  // private _savePromise: Promise<void> = Promise.resolve();

  // // "promise chaining" included
  // async save() {
  //   dbLogger('Scheduling DB save...');
  //   this._savePromise = this._savePromise.then(this._save);
  //   return this._savePromise;
  // }

  // _save = async () => {
  //   dbLogger('Saving DB to', DB_PATH);
  //   await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
  //   await fs.writeFile(DB_PATH, JSON.stringify(this.data, null, 2));
  // };

  async reset() {
    dbLogger('Resetting database to initial state...');
    this.data = cloneInitialDb();
    // await this.save();
  }

  async getUserByEmail(email: User['email']) {
    dbLogger(`Getting user by email: ${email}`);
    return this.data.users.find((user) => user.email === email);
  }

  async getUsers() {
    dbLogger('Getting all users');
    return this.data.users;
  }

  async addUser(user: User) {
    dbLogger(`Adding new user: ${user.email}`);
    this.data.users.push(user);
    // await this.save();
    return user.id;
  }

  async updateUser(id: User['id'], updates: Partial<User>) {
    dbLogger(`Updating user id=${id} with ${updates}`);
    const userIndex = this.data.users.findIndex((u) => u.id === id);
    if (userIndex !== -1) {
      this.data.users[userIndex] = { ...this.data.users[userIndex], ...updates };
      // await this.save();
      return this.data.users[userIndex];
    }
    return null;
  }

  async deleteUser(id: User['id']) {
    dbLogger(`Deleting user id=${id}`);
    const userIndex = this.data.users.findIndex((u) => u.id === id);

    if (userIndex !== -1) {
      this.data.users.splice(userIndex, 1);
      // await this.save();
      return true;
    }
    return false;
  }

  async getAccountById(id: Account['id']) {
    dbLogger(`Getting account by id: ${id}`);
    const account = this.data.accounts.find((account) => account.id === id);
    return account;
  }

  async getAccounts() {
    dbLogger('Getting all accounts');
    return this.data.accounts;
  }

  async addAccount(account: Account) {
    dbLogger(`Adding new account: ${account.id}`);
    this.data.accounts.push(account);
    // await this.save();
    return account.id;
  }

  async getTransactions() {
    dbLogger('Getting all transactions');
    return this.data.transactions;
  }

  async addTransaction(transaction: Transaction) {
    dbLogger(`Adding new transaction: ${transaction.id}`);
    this.data.transactions.unshift(transaction);
    // await this.save();
  }
}

export const db = new Database();
