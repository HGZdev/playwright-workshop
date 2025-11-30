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
