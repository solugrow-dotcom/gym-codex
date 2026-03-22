import mongoose from 'mongoose';
import { tenantFields } from './BaseTenantModel.js';

const paymentSchema = new mongoose.Schema({
  ...tenantFields,
  member: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', required: true },
  plan: { type: mongoose.Schema.Types.ObjectId, ref: 'MembershipPlan' },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'INR' },
  method: { type: String, enum: ['stripe', 'razorpay', 'cash', 'upi'], required: true },
  status: { type: String, enum: ['paid', 'pending', 'failed', 'refunded'], default: 'pending' },
  invoiceNumber: { type: String, required: true, unique: true },
  transactionId: String,
  paidAt: Date,
  metadata: mongoose.Schema.Types.Mixed
}, { timestamps: true });

export default mongoose.model('Payment', paymentSchema);
