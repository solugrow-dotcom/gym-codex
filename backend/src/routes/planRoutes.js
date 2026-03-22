import { Router } from 'express';
import { createCoupon, createPlan, listPlans } from '../controllers/planController.js';
import { protect, restrictTo } from '../middleware/auth.js';

const router = Router();
router.use(protect);
router.route('/').get(listPlans).post(restrictTo('super_admin', 'gym_owner'), createPlan);
router.post('/coupons', restrictTo('super_admin', 'gym_owner'), createCoupon);

export default router;
