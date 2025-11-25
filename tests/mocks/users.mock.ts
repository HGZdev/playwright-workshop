import { UserInput } from '../../_server/database/types';

export const CLIENT_INPUT_1: Omit<UserInput, 'id' | 'accountId'> = {
  username: 'emma_watson',
  password: 'emma123',
  name: 'Emma Watson',
  role: 'client',
};

export const CLIENT_INPUT_2: Omit<UserInput, 'id' | 'accountId'> = {
  username: 'mala_mi',
  password: 'mala_mi',
  name: 'Mala Mi',
  role: 'client',
};
