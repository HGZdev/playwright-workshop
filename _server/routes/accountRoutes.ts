import { Router } from 'express';
import { accountController } from '../controllers/accountController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = Router();

// All account routes require authentication
router.use(authenticateToken);

router.get('/balance', (req, res) => accountController.getBalance(req, res));
router.get('/transactions', (req, res) => accountController.getTransactions(req, res));
router.post('/transfer', (req, res) => accountController.makeTransfer(req, res));

export default router;
