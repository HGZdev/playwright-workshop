import { TransactionInput } from '../../_server/database/types';

export const TRANSACTION1: TransactionInput = {
  title: 'Transaction One',
  amount: 100,
  type: 'incoming',
};

export const TRANSACTION2: TransactionInput = {
  title: 'Transaction Two',
  amount: 200,
  type: 'outgoing',
};

export const TRANSACTION3: TransactionInput = {
  title: 'Transaction Three',
  amount: 300,
  type: 'incoming',
};

export const TRANSACTION4: TransactionInput = {
  title: 'Transaction Four',
  amount: 400,
  type: 'outgoing',
};

export const TRANSACTION5: TransactionInput = {
  title: 'Transaction Five',
  amount: 500,
  type: 'incoming',
};

export const TRANSACTION6: TransactionInput = {
  title: 'Transaction Six',
  amount: 600,
  type: 'outgoing',
};

export const TRANSACTION7: TransactionInput = {
  title: 'Transaction Seven',
  amount: 700,
  type: 'incoming',
};

export const TRANSACTION8: TransactionInput = {
  title: 'Transaction Eight',
  amount: 800,
  type: 'outgoing',
};

export const TRANSACTION_SET1: TransactionInput[] = [
  TRANSACTION1,
  TRANSACTION2,
  TRANSACTION3,
  TRANSACTION4,
];
export const TRANSACTION_SET2: TransactionInput[] = [
  TRANSACTION5,
  TRANSACTION6,
  TRANSACTION7,
  TRANSACTION8,
];
