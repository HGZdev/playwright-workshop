import { Request, Response } from 'express';
import { usersService } from '../services/usersService.js';

export class AdminController {
  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await usersService.getAllUsers();
      res.json(users);
    } catch {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async updateUser(req: Request, res: Response) {
    const { id } = req.params;
    const updates = req.body;
    try {
      const updatedUser = await usersService.updateUser(Number(id), updates);
      if (updatedUser) {
        res.json(updatedUser);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async deleteUser(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const success = await usersService.deleteUser(Number(id));
      if (success) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export const adminController = new AdminController();
