import { UserInput } from '../../_server/database/types';

export const generateUserInput = (
  name: string = 'Anna',
  role: UserInput['role'] = 'client',
): UserInput => {
  return {
    email: `${name.replace(' ', '_').toLowerCase()}_${new Date().getTime()}@example.com`,
    password: 'secret123',
    name,
    role,
  };
};
