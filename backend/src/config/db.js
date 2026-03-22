import mongoose from 'mongoose';
import { env } from './env.js';

export const connectDb = async () => {
  await mongoose.connect(env.mongodbUri, {
    autoIndex: true
  });
  console.log(`MongoDB connected: ${mongoose.connection.host}`);
};
