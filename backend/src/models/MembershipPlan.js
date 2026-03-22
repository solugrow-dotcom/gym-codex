import mongoose from 'mongoose';
import { tenantFields } from './BaseTenantModel.js';

const membershipPlanSchema = new mongoose.Schema({
  ...tenantFields,
  name: { type: String, required: true },
  durationMonths: { type: Number, required: true },
  price: { type: Number, required: true },
  compareAtPrice: Number,
  features: [{ type: String }],
  autoRenewAvailable: { type: Boolean, default: true },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('MembershipPlan', membershipPlanSchema);
