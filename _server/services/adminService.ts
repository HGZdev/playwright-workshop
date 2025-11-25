import { db } from '../database/database.js';
import { User } from '../database/initalData.js';
import { randomDelay } from '../utils/delay.js';

export class AdminService {
  async getAllUsers() {
    await randomDelay(200, 1000);
    return db.users;
  }

  async updateUser(id: string, updates: Partial<User>) {
    await randomDelay(200, 1000);
    return db.updateUser(id, updates);
  }

  async deleteUser(id: string) {
    await randomDelay(200, 1000);
    return db.deleteUser(id);
  }
}

export const adminService = new AdminService();
