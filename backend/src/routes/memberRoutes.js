import { Router } from 'express';
import { appendProgress, createMember, getMember, getMembers, updateMember } from '../controllers/memberController.js';
import { protect, restrictTo } from '../middleware/auth.js';

const router = Router();
router.use(protect);
router.route('/').get(restrictTo('super_admin', 'gym_owner', 'trainer'), getMembers).post(restrictTo('super_admin', 'gym_owner', 'trainer'), createMember);
router.route('/:id').get(getMember).patch(restrictTo('super_admin', 'gym_owner', 'trainer'), updateMember);
router.post('/:id/progress', restrictTo('super_admin', 'gym_owner', 'trainer'), appendProgress);

export default router;
