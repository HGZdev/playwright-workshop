import { Request, Response } from 'express';
import { adminService } from '../services/adminService.js';

export class AdminController {
  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await adminService.getAllUsers();
      res.json(users);
    } catch {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async updateUser(req: Request, res: Response) {
    const { id } = req.params;
    const updates = req.body;
    try {
      const updatedUser = await adminService.updateUser(id, updates);
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
      const success = await adminService.deleteUser(id);
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
