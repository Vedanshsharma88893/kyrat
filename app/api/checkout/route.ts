'use server';

import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

import { ticketTypes } from '@/lib/data';
import * as gtag from '@/lib/gtag';

// Make sure to use environment variables for your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

export async function POST(req: Request) {
  const body = await req.json();
  const { ticketTypeId, quantity } = body;

  const ticketType = ticketTypes.find((t) => t.id === ticketTypeId);

  if (!ticketType) {
    return NextResponse.json({ error: 'Ticket type not found' }, { status: 404 });
  }

  const origin = headers().get('origin') || 'http://localhost:3000';

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: ticketType.name,
              description: ticketType.description,
            },
            unit_amount: ticketType.price,
          },
          quantity: quantity,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/canceled`,
      metadata: {
        ticketTypeId: ticketTypeId,
        quantity: quantity,
      }
    });

    // Fire a GA event for initiating checkout
    gtag.event({
        action: "begin_checkout",
        params: {
            currency: "USD",
            value: (ticketType.price / 100) * quantity,
            items: [{
                item_id: ticketType.id,
                item_name: ticketType.name,
                price: ticketType.price / 100,
                quantity: quantity
            }]
        }
    })

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error creating Stripe session:', error);
    // Return a generic error message to the user
    return NextResponse.json({ error: 'Could not create checkout session' }, { status: 500 });
  }
}
