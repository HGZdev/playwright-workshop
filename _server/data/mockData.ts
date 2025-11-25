export interface User {
  id: string;
  username: string;
  password: string; // In real app, hash this!
  name: string;
  role: 'admin' | 'client';
}

export interface Transaction {
  id: string;
  date: string;
  title: string;
  amount: number;
  type: 'incoming' | 'outgoing';
}

export const USERS: User[] = [
  { id: '1', username: 'user1', password: 'password', name: 'Jan Kowalski', role: 'client' },
  { id: '2', username: 'user2', password: 'password', name: 'Irena Nowak', role: 'client' },
  { id: '3', username: 'admin', password: 'password', name: 'Admin User', role: 'admin' },
];

// We export a mutable object or class to handle state changes in this simple demo
export const BANK_STATE = {
  balance: 1000.0,
  transactions: [
    { id: '1', date: '2023-10-26', title: 'Wypłata', amount: 5000, type: 'incoming' },
    { id: '2', date: '2023-10-27', title: 'Zakupy', amount: -150, type: 'outgoing' },
  ] as Transaction[],
};
