import { Router } from 'express';
import { adminController } from '../controllers/adminController.js';

const router = Router();

router.get('/users', (req, res) => adminController.getAllUsers(req, res));
router.put('/users/:id', (req, res) => adminController.updateUser(req, res));
router.delete('/users/:id', (req, res) => adminController.deleteUser(req, res));

export default router;
