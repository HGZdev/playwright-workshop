import { TransactionInput } from '../../_server/database/types';

export const TRANSACTION1: Omit<TransactionInput, 'accountId'> = {
  title: 'Transaction One',
  amount: 100,
  type: 'incoming',
};

export const TRANSACTION2: Omit<TransactionInput, 'accountId'> = {
  title: 'Transaction Two',
  amount: 200,
  type: 'outgoing',
};

export const TRANSACTION3: Omit<TransactionInput, 'accountId'> = {
  title: 'Transaction Three',
  amount: 300,
  type: 'incoming',
};

export const TRANSACTION4: Omit<TransactionInput, 'accountId'> = {
  title: 'Transaction Four',
  amount: 400,
  type: 'outgoing',
};

export const TRANSACTION5: Omit<TransactionInput, 'accountId'> = {
  title: 'Transaction Five',
  amount: 500,
  type: 'incoming',
};

export const TRANSACTION6: Omit<TransactionInput, 'accountId'> = {
  title: 'Transaction Six',
  amount: 600,
  type: 'outgoing',
};

export const TRANSACTION7: Omit<TransactionInput, 'accountId'> = {
  title: 'Transaction Seven',
  amount: 700,
  type: 'incoming',
};

export const TRANSACTION8: Omit<TransactionInput, 'accountId'> = {
  title: 'Transaction Eight',
  amount: 800,
  type: 'outgoing',
};

export const TRANSACTION_SET1: Omit<TransactionInput, 'accountId'>[] = [
  TRANSACTION1,
  TRANSACTION2,
  TRANSACTION3,
  TRANSACTION4,
];
export const TRANSACTION_SET2: Omit<TransactionInput, 'accountId'>[] = [
  TRANSACTION5,
  TRANSACTION6,
  TRANSACTION7,
  TRANSACTION8,
];
