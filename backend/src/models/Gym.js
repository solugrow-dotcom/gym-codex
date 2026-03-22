import mongoose from 'mongoose';

const gymSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  email: { type: String, required: true, lowercase: true },
  phone: String,
  address: String,
  logoUrl: String,
  subscriptionPlan: { type: String, enum: ['free', 'pro', 'premium'], default: 'free' },
  trialEndsAt: Date,
  subscriptionStatus: { type: String, enum: ['trial', 'active', 'past_due', 'cancelled'], default: 'trial' },
  enabledFeatures: [{ type: String }],
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export default mongoose.model('Gym', gymSchema);
