export type User = UserInput & {
  id: number;
};

export interface UserInput {
  accountId: Account['id'];
  name: string;
  password: string;
  role: 'admin' | 'client';
  email: string;
}

export type Account = AccountInput & {
  id: number;
};

export type AccountInput = {
  transactions: Transaction[];
};

export type Transaction = TransactionInput & {
  id: number;
  date: string;
};

export interface TransactionInput {
  title: string;
  amount: number;
  recipient: string;
  type: 'incoming' | 'outgoing';
  accountId: Account['id'];
}
