import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware.js';
import { accountService } from '../services/accountService.js';

export class AccountController {
  async getBalance(req: AuthRequest, res: Response) {
    const { accountId } = req.params;

    try {
      const balance = await accountService.getBalance(Number(accountId));
      res.json({ balance });
    } catch {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getAccount(req: AuthRequest, res: Response) {
    const { accountId } = req.params;

    try {
      const account = await accountService.getAccount(Number(accountId));
      res.json(account);
    } catch {
      res.status(500).json({ error: 'Internal server error' });
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
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }
}

export const accountController = new AccountController();
