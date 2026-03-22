import WorkoutPlan from '../models/WorkoutPlan.js';
import Member from '../models/Member.js';
import User from '../models/User.js';
import { catchAsync } from '../utils/catchAsync.js';

export const trainerDashboard = catchAsync(async (req, res) => {
  const [members, workouts] = await Promise.all([
    Member.find({ gym: req.gymId, trainer: req.user._id }),
    WorkoutPlan.find({ gym: req.gymId, trainer: req.user._id })
  ]);
  res.json({ status: 'success', data: { members, workouts } });
});

export const assignTrainer = catchAsync(async (req, res) => {
  const member = await Member.findOneAndUpdate({ _id: req.params.memberId, gym: req.gymId }, { trainer: req.body.trainerId }, { new: true });
  res.json({ status: 'success', data: member });
});

export const createWorkoutPlan = catchAsync(async (req, res) => {
  const workout = await WorkoutPlan.create({ ...req.body, gym: req.gymId, trainer: req.user._id });
  res.status(201).json({ status: 'success', data: workout });
});

export const listTrainers = catchAsync(async (req, res) => {
  const trainers = await User.find({ gym: req.gymId, role: 'trainer' });
  res.json({ status: 'success', data: trainers });
});
