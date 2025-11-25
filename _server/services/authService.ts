import { db } from '../database/database.js';
import { randomDelay } from '../utils/delay.js';
import { Account, User } from '../database/types.js';

export class AuthService {
  async login(username: User['username'], password: User['password']) {
    await randomDelay(500, 1000); // Simulate network delay
    const user = await db.getUserByUsername(username);

    if (!user || user.password !== password) {
      return null;
    }

    // Encode user data in base64 for the fake token
    const userData = {
      id: user.id,
      accountId: user.accountId,
      name: user.name,
      role: user.role,
      username: user.username,
    };
    const token = Buffer.from(JSON.stringify(userData)).toString('base64');

    return {
      token,
      user: userData,
    };
  }

  async register(username: string, password: string, name: string) {
    await randomDelay(500, 1000);
    const exists = await this.userExists(username);
    if (exists) {
      throw new Error('Username already exists');
    }

    const newAccount: Account = { id: Date.now(), transactions: [] };

    console.log('Creating account with ID:', newAccount.id);
    const accountId = await db.addAccount(newAccount);
    console.log('Account ID returned from db.addAccount:', accountId);

    // Small delay to ensure unique ID for user
    await new Promise((resolve) => setTimeout(resolve, 1));

    const newUser = {
      id: Date.now(),
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
      accountId: newUser.accountId,
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
    const users = await db.getUsers();
    const user = users.find((u) => u.username === username);

    return !!user;
  }
}

export const authService = new AuthService();
