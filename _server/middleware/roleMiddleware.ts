import { Response, NextFunction } from 'express';
import { AuthRequest } from './authMiddleware.js';
import { ErrorMessages } from '../utils/errorMessages.js';

export const requireAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({ message: ErrorMessages.AUTHORIZATION.AUTHENTICATION_REQUIRED });
  }

  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: ErrorMessages.AUTHORIZATION.ADMIN_ACCESS_REQUIRED });
  }

  next();
};
