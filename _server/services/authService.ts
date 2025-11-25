import { db } from '../database/database.js';
import { randomDelay } from '../utils/delay.js';
import { Account, User } from '../database/types.js';

export class AuthService {
  async login(email: User['email'], password: User['password']) {
    await randomDelay(500, 1000); // Simulate network delay
    const user = await db.getUserByEmail(email);

    if (!user || user.password !== password) {
      return null;
    }

    // Encode user data in base64 for the fake token
    const userData = {
      id: user.id,
      accountId: user.accountId,
      name: user.name,
      role: user.role,
      email: user.email,
    };
    const token = Buffer.from(JSON.stringify(userData)).toString('base64');

    return {
      token,
      user: userData,
    };
  }

  async register(email: string, password: string, name: string) {
    await randomDelay(500, 1000);
    const exists = await this.userExists(email);
    if (exists) {
      throw new Error('Email already exists');
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
      email,
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
      email: newUser.email,
      role: newUser.role,
    };
    const token = Buffer.from(JSON.stringify(userData)).toString('base64');

    return {
      token,
      user: userData,
    };
  }

  async userExists(email: string) {
    await randomDelay(500, 1000);
    const users = await db.getUsers();
    const user = users.find((u) => u.email === email);

    return !!user;
  }
}

export const authService = new AuthService();
