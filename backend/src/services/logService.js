import ActivityLog from '../models/ActivityLog.js';

export const logActivity = (payload) => ActivityLog.create(payload);
