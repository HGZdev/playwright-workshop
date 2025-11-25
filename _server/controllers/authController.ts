import { Request, Response } from 'express';
import { authService } from '../services/authService.js';
import { ErrorMessages } from '../utils/errorMessages.js';

export class AuthController {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const result = await authService.login(email, password);
      if (result) {
        res.json(result);
      } else {
        res.status(401).json({ message: ErrorMessages.AUTH.INVALID_CREDENTIALS });
      }
    } catch {
      res.status(500).json({ message: ErrorMessages.AUTH.LOGIN_FAILED });
    }
  }

  async register(req: Request, res: Response) {
    const { email, password, name } = req.body;

    try {
      const result = await authService.register(email, password, name);
      res.status(201).json(result);
    } catch (error: unknown) {
      if (error instanceof Error && error.message === 'Email already exists') {
        res.status(409).json({ message: ErrorMessages.AUTH.EMAIL_ALREADY_EXISTS });
      } else {
        res.status(500).json({ message: ErrorMessages.AUTH.REGISTRATION_FAILED });
      }
    }
  }
}

export const authController = new AuthController();
