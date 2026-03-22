import Gym from '../models/Gym.js';
import User from '../models/User.js';
import Payment from '../models/Payment.js';
import { catchAsync } from '../utils/catchAsync.js';

export const listGyms = catchAsync(async (req, res) => {
  const gyms = await Gym.find().populate('owner');
  res.json({ status: 'success', data: gyms });
});

export const updateGymFeatures = catchAsync(async (req, res) => {
  const gym = await Gym.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json({ status: 'success', data: gym });
});

export const backupData = catchAsync(async (req, res) => {
  const [gyms, users, payments] = await Promise.all([Gym.find(), User.find(), Payment.find()]);
  res.json({ status: 'success', data: { gyms, users, payments, exportedAt: new Date() } });
});
