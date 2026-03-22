import Notification from '../models/Notification.js';
import { catchAsync } from '../utils/catchAsync.js';
import { sendEmail } from '../services/emailService.js';
import { sendWhatsApp } from '../services/whatsappService.js';

export const sendNotification = catchAsync(async (req, res) => {
  const payload = { ...req.body, gym: req.gymId, status: 'sent', sentAt: new Date() };
  const notification = await Notification.create(payload);
  if (req.body.channel === 'email') await sendEmail({ to: req.body.to, subject: req.body.subject, html: `<p>${req.body.message}</p>` });
  if (req.body.channel === 'whatsapp') await sendWhatsApp({ to: req.body.to, body: req.body.message });
  res.status(201).json({ status: 'success', data: notification });
});
