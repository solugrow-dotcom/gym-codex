import mongoose from 'mongoose';
import { tenantFields } from './BaseTenantModel.js';

const workoutPlanSchema = new mongoose.Schema({
  ...tenantFields,
  member: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', required: true },
  trainer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  goal: String,
  schedule: [{ day: String, exercises: [{ name: String, sets: Number, reps: Number, restSeconds: Number }] }],
  dietPlan: [{ meal: String, foodItems: [String], calories: Number }],
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('WorkoutPlan', workoutPlanSchema);
