import { UserInput } from '../../_server/database/types';

export const CLIENT_INPUT_1: Omit<UserInput, 'id' | 'accountId'> = {
  email: 'emma.watson@example.com',
  password: 'emma123',
  name: 'Emma Watson',
  role: 'client',
};

export const CLIENT_INPUT_2: Omit<UserInput, 'id' | 'accountId'> = {
  email: 'mala.mi@example.com',
  password: 'mala_mi',
  name: 'Mala Mi',
  role: 'client',
};
