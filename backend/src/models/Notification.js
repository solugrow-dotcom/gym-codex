import mongoose from 'mongoose';
import { tenantFields } from './BaseTenantModel.js';

const notificationSchema = new mongoose.Schema({
  ...tenantFields,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  channel: { type: String, enum: ['email', 'whatsapp', 'broadcast'], required: true },
  subject: String,
  message: { type: String, required: true },
  status: { type: String, enum: ['queued', 'sent', 'failed'], default: 'queued' },
  sentAt: Date
}, { timestamps: true });

export default mongoose.model('Notification', notificationSchema);
