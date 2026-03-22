import Attendance from '../models/Attendance.js';
import Member from '../models/Member.js';
import { catchAsync } from '../utils/catchAsync.js';
import { AppError } from '../utils/appError.js';

export const checkIn = catchAsync(async (req, res) => {
  const member = await Member.findOne({ _id: req.body.memberId, gym: req.gymId });
  if (!member) throw new AppError('Member not found', 404);

  const record = await Attendance.create({
    gym: req.gymId,
    member: member._id,
    checkInAt: req.body.checkInAt || new Date(),
    method: req.body.method || 'manual',
    status: req.body.status || 'present',
    notes: req.body.notes
  });

  res.status(201).json({ status: 'success', data: record });
});

export const attendanceAnalytics = catchAsync(async (req, res) => {
  const summary = await Attendance.aggregate([
    { $match: { gym: req.gymId } },
    { $group: { _id: '$status', count: { $sum: 1 } } }
  ]);
  const dailyTrend = await Attendance.aggregate([
    { $match: { gym: req.gymId } },
    { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$checkInAt' } }, count: { $sum: 1 } } },
    { $sort: { _id: 1 } }
  ]);
  res.json({ status: 'success', data: { summary, dailyTrend } });
});
