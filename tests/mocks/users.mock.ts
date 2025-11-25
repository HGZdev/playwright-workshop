import { UserInput } from '../../_server/database/types';

export const CLIENT_INPUT_1: Omit<UserInput, 'id' | 'accountId'> = {
  username: 'client1',
  password: 'client1',
  name: 'Client One',
  role: 'client',
};
