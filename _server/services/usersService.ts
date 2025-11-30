import { db } from '../database/database.js';
import { User } from '../database/types.js';

export class UsersService {
  async getAllUsers() {
    return db.getUsers();
  }

  async updateUser(id: User['id'], updates: Partial<User>) {
    return db.updateUser(id, updates);
  }

  async deleteUser(id: User['id']) {
    return db.deleteUser(id);
  }
}

export const usersService = new UsersService();
