import MembershipPlan from '../models/MembershipPlan.js';
import Coupon from '../models/Coupon.js';
import { catchAsync } from '../utils/catchAsync.js';

export const createPlan = catchAsync(async (req, res) => {
  const plan = await MembershipPlan.create({ ...req.body, gym: req.gymId });
  res.status(201).json({ status: 'success', data: plan });
});

export const listPlans = catchAsync(async (req, res) => {
  const plans = await MembershipPlan.find({ gym: req.gymId }).sort('price');
  res.json({ status: 'success', data: plans });
});

export const createCoupon = catchAsync(async (req, res) => {
  const coupon = await Coupon.create({ ...req.body, gym: req.gymId });
  res.status(201).json({ status: 'success', data: coupon });
});
