import { UserInput } from '../../_server/database/types';

export const CLIENT_INPUT_1: Omit<UserInput, 'id' | 'accountId'> = {
  username: 'user1',
  password: 'user1',
  name: 'Client One',
  role: 'client',
};
