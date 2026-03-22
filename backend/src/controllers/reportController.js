import Payment from '../models/Payment.js';
import Member from '../models/Member.js';
import Attendance from '../models/Attendance.js';
import { catchAsync } from '../utils/catchAsync.js';

export const getReports = catchAsync(async (req, res) => {
  const [revenueDaily, revenueMonthly, memberGrowth, attendanceTrends] = await Promise.all([
    Payment.aggregate([{ $match: { gym: req.gymId, status: 'paid' } }, { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$paidAt' } }, total: { $sum: '$amount' } } }, { $sort: { _id: 1 } }]),
    Payment.aggregate([{ $match: { gym: req.gymId, status: 'paid' } }, { $group: { _id: { $dateToString: { format: '%Y-%m', date: '$paidAt' } }, total: { $sum: '$amount' } } }, { $sort: { _id: 1 } }]),
    Member.aggregate([{ $match: { gym: req.gymId } }, { $group: { _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } }, total: { $sum: 1 } } }, { $sort: { _id: 1 } }]),
    Attendance.aggregate([{ $match: { gym: req.gymId } }, { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$checkInAt' } }, total: { $sum: 1 } } }, { $sort: { _id: 1 } }])
  ]);

  res.json({ status: 'success', data: { revenueDaily, revenueMonthly, memberGrowth, attendanceTrends } });
});

export const exportCsv = catchAsync(async (req, res) => {
  const payments = await Payment.find({ gym: req.gymId }).populate('member');
  const rows = ['invoice,member,amount,status,method'];
  payments.forEach((payment) => rows.push([payment.invoiceNumber, payment.member?.fullName, payment.amount, payment.status, payment.method].join(',')));
  res.setHeader('Content-Type', 'text/csv');
  res.send(rows.join('\n'));
});
