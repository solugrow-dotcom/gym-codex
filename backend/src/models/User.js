import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  gym: { type: mongoose.Schema.Types.ObjectId, ref: 'Gym' },
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  phone: String,
  password: { type: String, required: true, minlength: 8, select: false },
  role: { type: String, enum: ['super_admin', 'gym_owner', 'trainer', 'member'], required: true },
  avatarUrl: String,
  refreshToken: { type: String, select: false },
  passwordResetToken: String,
  passwordResetExpires: Date,
  lastLoginAt: Date,
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

userSchema.pre('save', async function save(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = function comparePassword(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model('User', userSchema);
