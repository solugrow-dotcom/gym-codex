import { Router } from 'express';
import { body } from 'express-validator';
import { forgotPassword, login, refresh, registerOwner, resetPassword } from '../controllers/authController.js';
import { validate } from '../middleware/validate.js';

const router = Router();

router.post('/register-owner', [body('email').isEmail(), body('password').isLength({ min: 8 }), body('gymName').notEmpty(), body('slug').notEmpty()], validate, registerOwner);
router.post('/login', [body('email').isEmail(), body('password').notEmpty()], validate, login);
router.post('/refresh', [body('refreshToken').notEmpty()], validate, refresh);
router.post('/forgot-password', [body('email').isEmail()], validate, forgotPassword);
router.post('/reset-password', [body('token').notEmpty(), body('password').isLength({ min: 8 })], validate, resetPassword);

export default router;
