import twilio from 'twilio';
import { env } from '../config/env.js';

const client = env.twilio.accountSid && env.twilio.authToken ? twilio(env.twilio.accountSid, env.twilio.authToken) : null;

export const sendWhatsApp = async ({ to, body }) => {
  if (!client) {
    console.log('[mock-whatsapp]', { to, body });
    return { mocked: true };
  }

  return client.messages.create({ from: env.twilio.from, to, body });
};
