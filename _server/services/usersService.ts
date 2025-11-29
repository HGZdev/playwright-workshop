import { db } from '../database/database.js';
import { User } from '../database/types.js';
import { randomDelay } from '../utils/delay.js';

export class UsersService {
  async getAllUsers() {
    await randomDelay('getAllUsers');
    return db.getUsers();
  }

  async updateUser(id: User['id'], updates: Partial<User>) {
    await randomDelay('updateUser');
    return db.updateUser(id, updates);
  }

  async deleteUser(id: User['id']) {
    await randomDelay('deleteUser');
    return db.deleteUser(id);
  }
}

export const usersService = new UsersService();
