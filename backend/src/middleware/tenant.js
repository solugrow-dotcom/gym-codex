import Gym from '../models/Gym.js';
import { catchAsync } from '../utils/catchAsync.js';

export const resolveTenant = catchAsync(async (req, res, next) => {
  const host = req.headers['x-tenant-subdomain'] || req.hostname.split('.')[0];
  if (host && !['localhost', '127'].includes(host)) {
    const gym = await Gym.findOne({ slug: host });
    if (gym) {
      req.tenant = gym;
    }
  }
  next();
});
