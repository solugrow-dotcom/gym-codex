import { Router } from 'express';
import { backupData, listGyms, updateGymFeatures } from '../controllers/adminController.js';
import { protect, restrictTo } from '../middleware/auth.js';

const router = Router();
router.use(protect, restrictTo('super_admin'));
router.get('/gyms', listGyms);
router.patch('/gyms/:id', updateGymFeatures);
router.get('/backup', backupData);

export default router;
