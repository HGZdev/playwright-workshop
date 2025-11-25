import { DatabaseSchema } from './database.js';
import { User, Account } from './types.js';

export const ACCOUNTS: Account[] = [
  { id: 1, transactions: [] },
  { id: 2, transactions: [] },
];

export const USERS: User[] = [
  {
    id: 1,
    username: 'admin',
    password: 'admin',
    name: 'Ania Admin',
    role: 'admin',
    accountId: ACCOUNTS[0].id,
  },
  {
    id: 2,
    username: 'client1',
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
