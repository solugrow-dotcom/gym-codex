import mongoose from 'mongoose';
import { tenantFields } from './BaseTenantModel.js';

const activityLogSchema = new mongoose.Schema({
  ...tenantFields,
  actor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  action: { type: String, required: true },
  entityType: String,
  entityId: mongoose.Schema.Types.ObjectId,
  metadata: mongoose.Schema.Types.Mixed,
  ipAddress: String
}, { timestamps: true });

export default mongoose.model('ActivityLog', activityLogSchema);
