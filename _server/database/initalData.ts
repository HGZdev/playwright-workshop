import { DatabaseSchema } from './database.js';
import { User, Account } from './types.js';

export const ACCOUNTS: Account[] = [
  { id: 1, transactions: [] },
  { id: 2, transactions: [] },
];

export const USERS: User[] = [
  {
    id: 1,
    email: 'admin@example.com',
    password: 'admin',
    name: 'Ania Admin',
    role: 'admin',
    accountId: ACCOUNTS[0].id,
  },
  {
    id: 2,
    email: 'client1@example.com',
    password: 'client1',
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
