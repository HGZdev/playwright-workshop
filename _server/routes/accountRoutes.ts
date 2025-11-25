import { Router } from 'express';
import { accountController } from '../controllers/accountController.js';

const router = Router();

router.get('/balance', (req, res) => accountController.getBalance(req, res));
router.get('/transactions', (req, res) => accountController.getTransactions(req, res));
router.post('/transfer', (req, res) => accountController.makeTransfer(req, res));

export default router;
