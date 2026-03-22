import { Router } from 'express';
import { attendanceAnalytics, checkIn } from '../controllers/attendanceController.js';
import { protect, restrictTo } from '../middleware/auth.js';

const router = Router();
router.use(protect);
router.post('/check-in', restrictTo('super_admin', 'gym_owner', 'trainer'), checkIn);
router.get('/analytics', restrictTo('super_admin', 'gym_owner', 'trainer'), attendanceAnalytics);

export default router;
