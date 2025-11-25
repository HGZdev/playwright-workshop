import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware.js';
import { accountService } from '../services/accountService.js';
import { ErrorMessages } from '../utils/errorMessages.js';

export class AccountController {
  async getAccountById(req: AuthRequest, res: Response) {
    const { accountId } = req.params;

    try {
      const account = await accountService.getAccount(Number(accountId));
      res.json(account);
    } catch (error) {
      console.error('Error in getAccountById:', error);
      res.status(500).json({ message: ErrorMessages.ACCOUNT.LOAD_FAILED });
    }
  }

  async makeTransaction(req: AuthRequest, res: Response) {
    const { recipient, title, amount, type } = req.body;
    const { accountId } = req.params;

    try {
      const result = await accountService.makeTransaction({
        accountId: Number(accountId),
        recipient,
        title,
        amount: Number(amount),
        type,
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
