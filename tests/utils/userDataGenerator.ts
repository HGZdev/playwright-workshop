import { UserInput } from '../../_server/database/types';

const generateUserInput = (
  name: string = 'Anna',
  role: UserInput['role'] = 'client',
): UserInput => {
  const timestamp = new Date().getTime();
  const email = `${name.replace(' ', '_').toLowerCase()}_${timestamp}@gmail.com`;
  return {
    email,
    password: email,
    name,
    role,
  };
};

export default generateUserInput;
