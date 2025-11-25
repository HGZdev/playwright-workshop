import { Router } from 'express';
import { accountController } from '../controllers/accountController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = Router();

// All account routes require authentication
router.use(authenticateToken);

router.get('/account/:accountId', (req, res) => accountController.getAccount(req, res));
router.post('/transfer/:accountId', (req, res) => accountController.makeTransaction(req, res));

export default router;
