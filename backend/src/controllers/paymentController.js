import Payment from '../models/Payment.js';
import Member from '../models/Member.js';
import Gym from '../models/Gym.js';
import { catchAsync } from '../utils/catchAsync.js';
import { createStripeCheckoutSession } from '../services/paymentService.js';
import { generateInvoiceBuffer } from '../utils/pdf.js';
import { sendEmail } from '../services/emailService.js';
import { sendWhatsApp } from '../services/whatsappService.js';
import { AppError } from '../utils/appError.js';

export const createPayment = catchAsync(async (req, res) => {
  const member = await Member.findOne({ _id: req.body.memberId, gym: req.gymId });
  if (!member) throw new AppError('Member not found', 404);

  const invoiceNumber = `INV-${Date.now()}`;
  const payment = await Payment.create({
    gym: req.gymId,
    member: member._id,
    plan: req.body.planId,
    amount: req.body.amount,
    method: req.body.method,
    status: req.body.method === 'cash' || req.body.method === 'upi' ? 'paid' : 'pending',
    invoiceNumber,
    paidAt: req.body.method === 'cash' || req.body.method === 'upi' ? new Date() : undefined
  });

  const checkout = ['stripe', 'razorpay'].includes(req.body.method)
    ? await createStripeCheckoutSession({ amount: req.body.amount, metadata: { paymentId: payment._id.toString(), memberId: member._id.toString() } })
    : null;

  res.status(201).json({ status: 'success', data: { payment, checkout } });
});

export const sendInvoice = catchAsync(async (req, res) => {
  const payment = await Payment.findOne({ _id: req.params.id, gym: req.gymId }).populate('member');
  const gym = await Gym.findById(req.gymId);
  if (!payment) throw new AppError('Payment not found', 404);

  const buffer = await generateInvoiceBuffer({
    invoiceNumber: payment.invoiceNumber,
    memberName: payment.member.fullName,
    gymName: gym.name,
    amount: payment.amount,
    currency: payment.currency,
    method: payment.method,
    paidAt: payment.paidAt || new Date()
  });

  await sendEmail({
    to: payment.member.email,
    subject: `Invoice ${payment.invoiceNumber}`,
    html: `<p>Your invoice amount is ${payment.amount} ${payment.currency}</p>`
  });

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=${payment.invoiceNumber}.pdf`);
  res.send(buffer);
});

export const sendPaymentReminder = catchAsync(async (req, res) => {
  const payment = await Payment.findOne({ _id: req.params.id, gym: req.gymId }).populate('member');
  if (!payment) throw new AppError('Payment not found', 404);
  await sendEmail({ to: payment.member.email, subject: 'Payment reminder', html: `<p>Please clear pending payment ${payment.invoiceNumber}</p>` });
  if (payment.member.phone) {
    await sendWhatsApp({ to: `whatsapp:${payment.member.phone}`, body: `Reminder: pending gym payment ${payment.invoiceNumber}` });
  }
  res.json({ status: 'success', message: 'Reminder sent' });
});
