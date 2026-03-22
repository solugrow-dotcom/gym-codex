import mongoose from 'mongoose';
import { tenantFields } from './BaseTenantModel.js';

const couponSchema = new mongoose.Schema({
  ...tenantFields,
  code: { type: String, required: true, uppercase: true },
  type: { type: String, enum: ['percentage', 'fixed'], default: 'percentage' },
  value: { type: Number, required: true },
  expiresAt: Date,
  maxUses: Number,
  usedCount: { type: Number, default: 0 },
  active: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('Coupon', couponSchema);
