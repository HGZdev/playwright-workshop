import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware.js';
import { accountService } from '../services/accountService.js';

export class AccountController {
  async getBalance(req: AuthRequest, res: Response) {
    try {
      const balance = await accountService.getBalance();
      res.json({ balance });
    } catch {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getTransactions(req: AuthRequest, res: Response) {
    try {
      const transactions = await accountService.getTransactions();
      res.json(transactions);
    } catch {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async makeTransfer(req: AuthRequest, res: Response) {
    const { recipient, title, amount } = req.body;

    try {
      const result = await accountService.makeTransfer(recipient, title, Number(amount));
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
