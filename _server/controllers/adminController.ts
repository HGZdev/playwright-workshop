import { Request, Response } from 'express';
import { usersService } from '../services/usersService.js';
import { ErrorMessages } from '../utils/errorMessages.js';

export class AdminController {
  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await usersService.getAllUsers();
      res.json(users);
    } catch {
      res.status(500).json({ message: ErrorMessages.USER.FETCH_FAILED });
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
        res.status(404).json({ message: ErrorMessages.USER.NOT_FOUND });
      }
    } catch {
      res.status(500).json({ message: ErrorMessages.USER.UPDATE_FAILED });
    }
  }

  async deleteUser(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const success = await usersService.deleteUser(Number(id));
      if (success) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: ErrorMessages.USER.NOT_FOUND });
      }
    } catch {
      res.status(500).json({ message: ErrorMessages.USER.DELETE_FAILED });
    }
  }
}

export const adminController = new AdminController();
