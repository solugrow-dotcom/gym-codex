import nodemailer from 'nodemailer';
import { env } from '../config/env.js';

const transporter = nodemailer.createTransport({
  host: env.smtp.host,
  port: env.smtp.port,
  auth: env.smtp.user ? { user: env.smtp.user, pass: env.smtp.pass } : undefined
});

export const sendEmail = async ({ to, subject, html }) => {
  if (!env.smtp.host) {
    console.log('[mock-email]', { to, subject });
    return { mocked: true };
  }

  return transporter.sendMail({ from: env.emailFrom, to, subject, html });
};
