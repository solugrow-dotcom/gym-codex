import mongoose from 'mongoose';

export const tenantFields = {
  gym: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Gym',
    required: true,
    index: true
  }
};
