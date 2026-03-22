import Member from '../models/Member.js';
import Payment from '../models/Payment.js';
import Attendance from '../models/Attendance.js';
import User from '../models/User.js';
import Gym from '../models/Gym.js';
import { catchAsync } from '../utils/catchAsync.js';

export const getDashboard = catchAsync(async (req, res) => {
  const [memberCount, revenueAgg, attendanceCount, activeMembers, expiredMembers, pendingPayments, trainers] = await Promise.all([
    Member.countDocuments({ gym: req.gymId }),
    Payment.aggregate([{ $match: { gym: req.gymId, status: 'paid' } }, { $group: { _id: null, total: { $sum: '$amount' } } }]),
    Attendance.countDocuments({ gym: req.gymId }),
    Member.countDocuments({ gym: req.gymId, membershipStatus: 'active' }),
    Member.countDocuments({ gym: req.gymId, membershipStatus: 'expired' }),
    Payment.countDocuments({ gym: req.gymId, status: 'pending' }),
    User.countDocuments({ gym: req.gymId, role: 'trainer' })
  ]);

  const revenueTrend = await Payment.aggregate([
    { $match: { gym: req.gymId, status: 'paid' } },
    { $group: { _id: { $dateToString: { format: '%Y-%m', date: '$paidAt' } }, revenue: { $sum: '$amount' } } },
    { $sort: { _id: 1 } }
  ]);

  const trainerPerformance = await Member.aggregate([
    { $match: { gym: req.gymId, trainer: { $ne: null } } },
    { $group: { _id: '$trainer', assignedMembers: { $sum: 1 }, activeMembers: { $sum: { $cond: [{ $eq: ['$membershipStatus', 'active'] }, 1, 0] } } } }
  ]);

  res.json({
    status: 'success',
    data: {
      stats: {
        memberCount,
        revenue: revenueAgg[0]?.total || 0,
        attendanceCount,
        activeMembers,
        expiredMembers,
        pendingPayments,
        trainers
      },
      revenueTrend,
      trainerPerformance
    }
  });
});

export const getGlobalAdminAnalytics = catchAsync(async (req, res) => {
  const [gyms, gymRevenue, users] = await Promise.all([
    Gym.countDocuments(),
    Payment.aggregate([{ $match: { status: 'paid' } }, { $group: { _id: null, total: { $sum: '$amount' } } }]),
    User.countDocuments()
  ]);
  res.json({ status: 'success', data: { gyms, platformRevenue: gymRevenue[0]?.total || 0, users } });
});
