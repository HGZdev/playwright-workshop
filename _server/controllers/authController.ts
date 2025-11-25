import { Request, Response } from 'express';
import { authService } from '../services/authService.js';

export class AuthController {
  async login(req: Request, res: Response) {
    const { username, password } = req.body;

    try {
      const result = await authService.login(username, password);
      if (result) {
        res.json(result);
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    } catch {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async register(req: Request, res: Response) {
    const { username, password, name } = req.body;

    try {
      const result = await authService.register(username, password, name);
      res.status(201).json(result);
    } catch (error: unknown) {
      if (error instanceof Error && error.message === 'Username already exists') {
        res.status(409).json({ error: 'Username already exists' });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }
}

export const authController = new AuthController();
