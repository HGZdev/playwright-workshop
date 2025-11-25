import { DatabaseSchema } from './database.js';
import { User, Transaction, Account } from './types.js';

export const USERS: User[] = [
  {
    id: '1',
    username: 'user1',
    password: 'user1',
    name: 'Jan Kowalski',
    role: 'client',
    accountId: '1',
  },
  {
    id: '2',
    username: 'user2',
    password: 'user2',
    name: 'Irena Nowak',
    role: 'client',
    accountId: '2',
  },
  {
    id: '3',
    username: 'user3',
    password: 'user3',
    name: 'Admin User',
    role: 'admin',
    accountId: '3',
  },
  {
    id: '4',
    username: 'admin',
    password: 'admin',
    name: 'Admin User',
    role: 'admin',
    accountId: '3',
  },
];

export const ACCOUNTS: Account[] = [
  { id: '1', transactionIds: ['1', '2', '3', '4', '5', '6', '7'] },
  { id: '2', transactionIds: ['8', '9', '10', '11', '12', '13', '14'] },
  { id: '3', transactionIds: ['15', '16', '17', '18', '19', '20', '21'] },
  { id: '4' },
];

export const TRANSACTIONS: Transaction[] = [
  { id: '1', date: '2023-10-26', title: 'Wpłata', amount: 15000, type: 'incoming' },
  { id: '2', date: '2023-10-27', title: 'Zakupy', amount: -150, type: 'outgoing' },
  { id: '3', date: '2023-10-28', title: 'Zakupy', amount: -150, type: 'outgoing' },
  { id: '4', date: '2023-10-29', title: 'Zakupy', amount: -150, type: 'outgoing' },
  { id: '5', date: '2023-10-30', title: 'Zakupy', amount: -150, type: 'outgoing' },
  { id: '6', date: '2023-10-31', title: 'Zakupy', amount: -150, type: 'outgoing' },
  { id: '7', date: '2023-11-01', title: 'Zakupy', amount: -150, type: 'outgoing' },
  { id: '8', date: '2023-11-02', title: 'Wpłata', amount: 150, type: 'incoming' },
  { id: '9', date: '2023-11-03', title: 'Wpłata', amount: 50, type: 'incoming' },
  { id: '10', date: '2023-11-04', title: 'Wpłata', amount: 130, type: 'incoming' },
  { id: '11', date: '2023-11-05', title: 'Zakupy', amount: -150, type: 'outgoing' },
  { id: '12', date: '2023-11-06', title: 'Zakupy', amount: -150, type: 'outgoing' },
  { id: '13', date: '2023-11-07', title: 'Zakupy', amount: -150, type: 'outgoing' },
  { id: '14', date: '2023-11-08', title: 'Zakupy', amount: -150, type: 'outgoing' },
  { id: '15', date: '2023-11-09', title: 'Wpłata', amount: 150, type: 'incoming' },
  { id: '16', date: '2023-11-10', title: 'Zakupy', amount: -150, type: 'outgoing' },
  { id: '17', date: '2023-11-11', title: 'Zakupy', amount: -150, type: 'outgoing' },
  { id: '18', date: '2023-11-12', title: 'Zakupy', amount: -150, type: 'outgoing' },
  { id: '19', date: '2023-11-13', title: 'Zakupy', amount: -150, type: 'outgoing' },
  { id: '20', date: '2023-11-14', title: 'Zakupy', amount: -150, type: 'outgoing' },
  { id: '21', date: '2023-11-15', title: 'Zakupy', amount: -150, type: 'outgoing' },
];

export const INITIAL_DB: DatabaseSchema = {
  users: USERS,
  accounts: ACCOUNTS,
  transactions: TRANSACTIONS,
};
