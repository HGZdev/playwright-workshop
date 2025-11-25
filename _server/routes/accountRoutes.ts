import { Router } from 'express';
import { accountController } from '../controllers/accountController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = Router();

// All account routes require authentication
router.use(authenticateToken);

router.get('/account/:accountId', (req, res) => accountController.getAccountById(req, res));
router.post('/transaction/:accountId', (req, res) => accountController.makeTransaction(req, res));

export default router;
