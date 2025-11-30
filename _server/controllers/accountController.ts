import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware.js';
import { accountService } from '../services/accountService.js';
import { ErrorMessages } from '../utils/errorMessages.js';

export class AccountController {
  async getAccount(req: AuthRequest, res: Response) {
    const { accountId } = req.params;
    try {
      const account = await accountService.getAccount(Number(accountId));
      res.json(account);
    } catch (error) {
      console.error('Error in getAccountById:', error);
      res.status(500).json({ message: ErrorMessages.ACCOUNT.LOAD_FAILED });
    }
  }

  async addMoney(req: AuthRequest, res: Response) {
    const { title, amount } = req.body;
    const { accountId } = req.params;

    try {
      const result = await accountService.addMoney({
        accountId: Number(accountId),
        title,
        amount: Number(amount),
      });
      res.json(result);
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message === 'Invalid amount') {
          res.status(400).json({ message: ErrorMessages.ACCOUNT.INVALID_AMOUNT });
        } else {
          res.status(500).json({ message: ErrorMessages.ACCOUNT.TRANSACTION_FAILED });
        }
      } else {
        res.status(500).json({ message: ErrorMessages.ACCOUNT.TRANSACTION_FAILED });
      }
    }
  }

  async sendMoney(req: AuthRequest, res: Response) {
    const { recipient, title, amount } = req.body;
    const { accountId } = req.params;

    try {
      const result = await accountService.sendMoney({
        accountId: Number(accountId),
        recipient,
        title,
        amount: Number(amount),
      });
      res.json(result);
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message === 'Invalid amount') {
          res.status(400).json({ message: ErrorMessages.ACCOUNT.INVALID_AMOUNT });
        } else if (error.message === 'Insufficient funds') {
          res.status(400).json({ message: ErrorMessages.ACCOUNT.INSUFFICIENT_FUNDS });
        } else {
          res.status(500).json({ message: ErrorMessages.ACCOUNT.TRANSACTION_FAILED });
        }
      } else {
        res.status(500).json({ message: ErrorMessages.ACCOUNT.TRANSACTION_FAILED });
      }
    }
  }
}

export const accountController = new AccountController();
