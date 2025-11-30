import { Router } from 'express';
import { accountController } from '../controllers/accountController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = Router();

// All account routes require authentication
router.use(authenticateToken);

router.get('/account/:accountId', (req, res) => accountController.getAccount(req, res));
router.post('/add-money/:accountId', (req, res) => accountController.addMoney(req, res));
router.post('/send-money/:accountId', (req, res) => accountController.sendMoney(req, res));

export default router;
