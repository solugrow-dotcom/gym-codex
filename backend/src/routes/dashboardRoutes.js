import { Router } from 'express';
import { getDashboard, getGlobalAdminAnalytics } from '../controllers/dashboardController.js';
import { protect, restrictTo } from '../middleware/auth.js';

const router = Router();
router.get('/', protect, getDashboard);
router.get('/global', protect, restrictTo('super_admin'), getGlobalAdminAnalytics);

export default router;
