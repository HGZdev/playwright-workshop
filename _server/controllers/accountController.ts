import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware.js';
import { accountService } from '../services/accountService.js';

export class AccountController {
  async getAccountById(req: AuthRequest, res: Response) {
    const { accountId } = req.params;

    try {
      const account = await accountService.getAccount(Number(accountId));
      res.json(account);
    } catch (error) {
      console.error('Error in getAccountById:', error);
      res.status(500).json({ error: 'Something went wrong' });
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
    } catch (error: any) {
      if (error.message === 'Invalid amount' || error.message === 'Insufficient funds') {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Something went wrong' });
      }
    }
  }
}

export const accountController = new AccountController();
