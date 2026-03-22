import Stripe from 'stripe';
import { env } from '../config/env.js';

const stripe = env.stripeSecretKey ? new Stripe(env.stripeSecretKey) : null;

export const createStripeCheckoutSession = async ({ amount, currency = 'inr', metadata = {} }) => {
  if (!stripe) {
    return { mocked: true, id: `mock_${Date.now()}`, amount, currency, metadata };
  }

  return stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    line_items: [{
      price_data: {
        currency,
        product_data: { name: metadata.description || 'Gym Membership' },
        unit_amount: Math.round(amount * 100)
      },
      quantity: 1
    }],
    success_url: `${env.clientUrl}/payments/success`,
    cancel_url: `${env.clientUrl}/payments/cancel`,
    metadata
  });
};
