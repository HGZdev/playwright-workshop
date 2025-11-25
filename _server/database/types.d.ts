export interface User {
  id: string;
  username: string;
  password: string; // In real app, hash this!
  name: string;
  role: 'admin' | 'client';
  accountId: Account['id'];
  account?: Account;
}

export interface Account {
  id: string;
  transactionIds?: Transaction['id'][];
}

export interface Transaction {
  id: string;
  date: string;
  title: string;
  amount: number;
  type: 'incoming' | 'outgoing';
}
