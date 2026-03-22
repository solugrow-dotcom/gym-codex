import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { env } from '../config/env.js';
import { AppError } from '../utils/appError.js';
import { catchAsync } from '../utils/catchAsync.js';

export const protect = catchAsync(async (req, res, next) => {
  const token = req.headers.authorization?.startsWith('Bearer ')
    ? req.headers.authorization.split(' ')[1]
    : null;

  if (!token) throw new AppError('Authentication required', 401);

  const decoded = jwt.verify(token, env.jwtSecret);
  const user = await User.findById(decoded.id);
  if (!user || !user.isActive) throw new AppError('User not found or inactive', 401);

  req.user = user;
  req.gymId = user.gym;
  next();
});

export const restrictTo = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return next(new AppError('Insufficient permissions', 403));
  }
  next();
};
