export type User = UserInput & {
  id: number;
};

export interface UserInput {
  username: string;
  password: string;
  name: string;
  role: 'admin' | 'client';
  accountId: Account['id'];
}

export type Account = AccountInput & {
  id: number;
};

export interface AccountInput {
  transactionIds?: Transaction['id'][];
}

export type Transaction = TransactionInput & {
  id: number;
  date: string;
  title: string;
  amount: number;
  type: 'incoming' | 'outgoing';
};

export interface TransactionInput {
  title: string;
  amount: number;
  type: 'incoming' | 'outgoing';
}
