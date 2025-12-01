import { UserInput } from '../../_server/database/types';

const getRandomName = (): string => {
  const names = [
    'Anna Kowalska',
    'Barbara Nowak',
    'Cecylia Wisniewska',
    'Daniela Wojcik',
    'Ewa Kowalczyk',
    'Felicja Kaminska',
    'Grazyna Lewandowska',
    'Halina Zielinska',
    'Irena Szymanska',
    'Jadwiga Wozniak',
  ];

  return names[Math.floor(Math.random() * names.length)];
};

/**
 * Generates a user with random name and email.
 * @example
 * const newUser = userGen();
 * // newUser = {
 * //   name: 'Anna Kowalska',
 * //   email: 'anna_kowalska_1234567890@gmail.com',
 * //   password: 'anna_kowalska_1234567890@gmail.com',
 * //   role: 'client',
 * // }
 */
const userGen = (role: UserInput['role'] = 'client'): UserInput => {
  const timestamp = new Date().getTime();
  const name = getRandomName();
  const email = `${name.replace(' ', '_').toLowerCase()}_${timestamp}@gmail.com`;
  return {
    email,
    password: email,
    name,
    role,
  };
};

export default userGen;
