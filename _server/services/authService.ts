import { db } from '../data/database.js';
import { randomDelay } from '../utils/delay.js';

export class AuthService {
  async login(username: string, password: string) {
    await randomDelay(500, 1000); // Simulate network delay
    const user = db.users.find((u) => u.username === username && u.password === password);

    if (user) {
      return {
        token: 'fake-jwt-token',
        user: { id: user.id, name: user.name, username: user.username, role: user.role },
      };
    }

    return null;
  }

  async register(username: string, password: string, name: string) {
    await randomDelay(500, 1000);
    const existingUser = db.users.find((u) => u.username === username);
    if (existingUser) {
      throw new Error('Username already exists');
    }

    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      username,
      password,
      name,
      role: 'client' as const,
    };

    await db.addUser(newUser);
    return {
      token: 'fake-jwt-token',
      user: { id: newUser.id, name: newUser.name, username: newUser.username, role: newUser.role },
    };
  }
}

export const authService = new AuthService();
