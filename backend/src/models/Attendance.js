import mongoose from 'mongoose';
import { tenantFields } from './BaseTenantModel.js';

const attendanceSchema = new mongoose.Schema({
  ...tenantFields,
  member: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', required: true },
  checkInAt: { type: Date, required: true },
  method: { type: String, enum: ['qr', 'manual', 'scan'], default: 'manual' },
  status: { type: String, enum: ['present', 'late', 'absent'], default: 'present' },
  notes: String
}, { timestamps: true });

export default mongoose.model('Attendance', attendanceSchema);
