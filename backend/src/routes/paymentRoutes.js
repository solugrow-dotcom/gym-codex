import { Router } from 'express';
import { createPayment, sendInvoice, sendPaymentReminder } from '../controllers/paymentController.js';
import { protect, restrictTo } from '../middleware/auth.js';

const router = Router();
router.use(protect);
router.post('/', restrictTo('super_admin', 'gym_owner'), createPayment);
router.get('/:id/invoice', restrictTo('super_admin', 'gym_owner'), sendInvoice);
router.post('/:id/reminder', restrictTo('super_admin', 'gym_owner'), sendPaymentReminder);

export default router;
