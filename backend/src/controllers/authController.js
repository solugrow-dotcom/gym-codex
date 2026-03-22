import crypto from 'crypto';
import User from '../models/User.js';
import Gym from '../models/Gym.js';
import { catchAsync } from '../utils/catchAsync.js';
import { AppError } from '../utils/appError.js';
import { signAccessToken, signRefreshToken } from '../utils/token.js';
import { sendEmail } from '../services/emailService.js';

const createAuthResponse = async (user) => {
  const payload = { id: user._id, role: user.role, gym: user.gym };
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);
  user.refreshToken = refreshToken;
  user.lastLoginAt = new Date();
  await user.save();
  return { accessToken, refreshToken };
};

export const registerOwner = catchAsync(async (req, res) => {
  const gym = await Gym.create({
    name: req.body.gymName,
    slug: req.body.slug,
    email: req.body.email,
    phone: req.body.phone,
    subscriptionPlan: 'free',
    subscriptionStatus: 'trial',
    trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    enabledFeatures: ['dashboard', 'members', 'attendance', 'payments']
  });

  const user = await User.create({
    gym: gym._id,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
    role: 'gym_owner'
  });

  gym.owner = user._id;
  await gym.save();

  const tokens = await createAuthResponse(user);
  res.status(201).json({ status: 'success', data: { user, gym, ...tokens } });
});

export const login = catchAsync(async (req, res) => {
  const user = await User.findOne({ email: req.body.email }).select('+password +refreshToken');
  if (!user || !(await user.comparePassword(req.body.password))) throw new AppError('Invalid credentials', 401);
  const tokens = await createAuthResponse(user);
  res.json({ status: 'success', data: { user, ...tokens } });
});

export const refresh = catchAsync(async (req, res) => {
  const { refreshToken } = req.body;
  const user = await User.findOne({ refreshToken }).select('+refreshToken');
  if (!user) throw new AppError('Invalid refresh token', 401);
  const tokens = await createAuthResponse(user);
  res.json({ status: 'success', data: tokens });
});

export const forgotPassword = catchAsync(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) throw new AppError('No user found with that email', 404);

  const resetToken = crypto.randomBytes(32).toString('hex');
  user.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  user.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000);
  await user.save({ validateBeforeSave: false });

  await sendEmail({
    to: user.email,
    subject: 'Reset your Gym SaaS password',
    html: `<p>Use this token to reset your password: <strong>${resetToken}</strong></p>`
  });

  res.json({ status: 'success', message: 'Reset instructions sent' });
});

export const resetPassword = catchAsync(async (req, res) => {
  const hashedToken = crypto.createHash('sha256').update(req.body.token).digest('hex');
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: new Date() }
  }).select('+password');

  if (!user) throw new AppError('Token invalid or expired', 400);
  user.password = req.body.password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  const tokens = await createAuthResponse(user);
  res.json({ status: 'success', data: tokens });
});
