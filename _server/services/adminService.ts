import { db } from '../database/database.js';
import { User } from '../database/types.js';
import { randomDelay } from '../utils/delay.js';

export class AdminService {
  async getAllUsers() {
    await randomDelay(200, 1000);
    return db.getUsers();
  }

  async updateUser(id: User['id'], updates: Partial<User>) {
    await randomDelay(200, 1000);
    return db.updateUser(id, updates);
  }

  async deleteUser(id: User['id']) {
    await randomDelay(200, 1000);
    return db.deleteUser(id);
  }
}

export const adminService = new AdminService();
