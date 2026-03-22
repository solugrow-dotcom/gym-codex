import mongoose from 'mongoose';
import { tenantFields } from './BaseTenantModel.js';

const memberSchema = new mongoose.Schema({
  ...tenantFields,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  trainer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  fullName: { type: String, required: true },
  phone: String,
  email: { type: String, lowercase: true },
  dateOfBirth: Date,
  gender: { type: String, enum: ['male', 'female', 'other'] },
  photoUrl: String,
  emergencyContact: String,
  activePlan: { type: mongoose.Schema.Types.ObjectId, ref: 'MembershipPlan' },
  membershipStatus: { type: String, enum: ['active', 'expired', 'pending', 'cancelled'], default: 'pending' },
  membershipStartedAt: Date,
  membershipExpiresAt: Date,
  autoRenew: { type: Boolean, default: false },
  qrCode: String,
  remarks: [{ message: String, createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, createdAt: { type: Date, default: Date.now } }],
  notes: [{ title: String, content: String, createdAt: { type: Date, default: Date.now } }],
  progress: [{ date: { type: Date, default: Date.now }, weight: Number, bmi: Number, bodyFat: Number, chest: Number, waist: Number, notes: String }],
  membershipHistory: [{ plan: { type: mongoose.Schema.Types.ObjectId, ref: 'MembershipPlan' }, startDate: Date, endDate: Date, amount: Number, status: String }]
}, { timestamps: true });

export default mongoose.model('Member', memberSchema);
