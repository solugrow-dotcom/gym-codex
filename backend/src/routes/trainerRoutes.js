import { Router } from 'express';
import { assignTrainer, createWorkoutPlan, listTrainers, trainerDashboard } from '../controllers/trainerController.js';
import { protect, restrictTo } from '../middleware/auth.js';

const router = Router();
router.use(protect);
router.get('/dashboard', restrictTo('trainer', 'gym_owner', 'super_admin'), trainerDashboard);
router.get('/', restrictTo('trainer', 'gym_owner', 'super_admin'), listTrainers);
router.post('/members/:memberId/assign', restrictTo('gym_owner', 'super_admin'), assignTrainer);
router.post('/workouts', restrictTo('trainer', 'gym_owner'), createWorkoutPlan);

export default router;
