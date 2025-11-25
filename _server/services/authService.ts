import { randomInt } from 'crypto';
import { db } from '../database/database.js';
import { randomDelay } from '../utils/delay.js';
import { User } from '../database/types.js';

export class AuthService {
  async login(username: User['username'], password: User['password']) {
    await randomDelay(500, 1000); // Simulate network delay
    const user = db.users.find((u) => u.username === username && u.password === password);

    if (user) {
      // Encode user data in base64 for the fake token
      const userData = { id: user.id, name: user.name, username: user.username, role: user.role };
      const token = Buffer.from(JSON.stringify(userData)).toString('base64');

      return {
        token,
        user: userData,
      };
    }

    return null;
  }

  async register(username: string, password: string, name: string) {
    await randomDelay(500, 1000);
    const exists = await this.userExists(username);
    if (exists) {
      throw new Error('Username already exists');
    }

    const newAccount = {
      id: randomInt(1, 1000),
      transactionIds: [],
    };

    const accountId = await db.addAccount(newAccount);

    const newUser = {
      id: randomInt(1, 1000),
      accountId,
      username,
      password,
      name,
      role: 'client' as const,
    };

    await db.addUser(newUser);

    // Encode user data in base64 for the fake token
    const userData = {
      id: newUser.id,
      name: newUser.name,
      username: newUser.username,
      role: newUser.role,
    };
    const token = Buffer.from(JSON.stringify(userData)).toString('base64');

    return {
      token,
      user: userData,
    };
  }

  async userExists(username: string) {
    await randomDelay(500, 1000);
    const user = db.users.find((u) => u.username === username);

    return !!user;
  }
}

export const authService = new AuthService();
