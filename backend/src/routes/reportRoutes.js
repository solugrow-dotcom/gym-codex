import { Router } from 'express';
import { exportCsv, getReports } from '../controllers/reportController.js';
import { protect, restrictTo } from '../middleware/auth.js';

const router = Router();
router.use(protect);
router.get('/', restrictTo('super_admin', 'gym_owner'), getReports);
router.get('/export/csv', restrictTo('super_admin', 'gym_owner'), exportCsv);

export default router;
