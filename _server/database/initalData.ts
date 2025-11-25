import { DatabaseSchema } from './database.js';
import { User, Account } from './types.js';

export const USERS: User[] = [
  {
    id: 1,
    username: 'user1',
    password: 'user1',
    name: 'Jan Kowalski',
    role: 'client',
    accountId: 1,
  },
  {
    id: 2,
    username: 'user2',
    password: 'user2',
    name: 'Irena Nowak',
    role: 'client',
    accountId: 2,
  },
  {
    id: 3,
    username: 'user3',
    password: 'user3',
    name: 'Admin User',
    role: 'admin',
    accountId: 3,
  },
  {
    id: 4,
    username: 'admin',
    password: 'admin',
    name: 'Admin User',
    role: 'admin',
    accountId: 4,
  },
];

export const ACCOUNTS: Account[] = [
  { id: 1, transactions: [] },
  { id: 2, transactions: [] },
  { id: 3, transactions: [] },
  { id: 4, transactions: [] },
];

export const INITIAL_DB: DatabaseSchema = {
  users: USERS,
  accounts: ACCOUNTS,
  transactions: [],
};
