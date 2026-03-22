import QRCode from 'qrcode';
import Member from '../models/Member.js';
import { catchAsync } from '../utils/catchAsync.js';
import { ApiFeatures } from '../utils/apiFeatures.js';
import { AppError } from '../utils/appError.js';
import { logActivity } from '../services/logService.js';

export const createMember = catchAsync(async (req, res) => {
  const payload = { ...req.body, gym: req.gymId };
  const member = await Member.create(payload);
  member.qrCode = await QRCode.toDataURL(`${req.gymId}:${member._id}`);
  await member.save();
  await logActivity({ gym: req.gymId, actor: req.user._id, action: 'member_created', entityType: 'Member', entityId: member._id, ipAddress: req.ip });
  res.status(201).json({ status: 'success', data: member });
});

export const getMembers = catchAsync(async (req, res) => {
  const features = new ApiFeatures(Member.find({ gym: req.gymId }).populate('trainer activePlan'), req.query)
    .filter()
    .search(['fullName', 'email', 'phone'])
    .sort()
    .paginate();
  const members = await features.query;
  res.json({ status: 'success', results: members.length, data: members });
});

export const getMember = catchAsync(async (req, res) => {
  const member = await Member.findOne({ _id: req.params.id, gym: req.gymId }).populate('trainer activePlan');
  if (!member) throw new AppError('Member not found', 404);
  res.json({ status: 'success', data: member });
});

export const updateMember = catchAsync(async (req, res) => {
  const member = await Member.findOneAndUpdate({ _id: req.params.id, gym: req.gymId }, req.body, { new: true });
  if (!member) throw new AppError('Member not found', 404);
  res.json({ status: 'success', data: member });
});

export const appendProgress = catchAsync(async (req, res) => {
  const member = await Member.findOne({ _id: req.params.id, gym: req.gymId });
  if (!member) throw new AppError('Member not found', 404);
  member.progress.push(req.body);
  await member.save();
  res.json({ status: 'success', data: member.progress });
});
