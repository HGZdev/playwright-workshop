import { DatabaseSchema } from './database.js';
import { User, Account } from './types.js';

export const ACCOUNTS: Account[] = [
  { id: 1, transactions: [] },
  { id: 2, transactions: [] },
];

export const USERS: User[] = [
  {
    id: 1,
    email: 'admin@gmail.com',
    password: 'admin@gmail.com',
    name: 'Ania Admin',
    role: 'admin',
    accountId: ACCOUNTS[0].id,
  },
  {
    id: 2,
    email: 'client1@gmail.com',
    password: 'client1@gmail.com',
    name: 'Janina Kowalska',
    role: 'client',
    accountId: ACCOUNTS[1].id,
  },
];

export const INITIAL_DB: DatabaseSchema = {
  users: USERS,
  accounts: ACCOUNTS,
  transactions: [],
};
