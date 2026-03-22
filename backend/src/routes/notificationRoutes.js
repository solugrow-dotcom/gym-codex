import { Router } from 'express';
import { sendNotification } from '../controllers/notificationController.js';
import { protect, restrictTo } from '../middleware/auth.js';

const router = Router();
router.use(protect);
router.post('/', restrictTo('super_admin', 'gym_owner'), sendNotification);

export default router;
