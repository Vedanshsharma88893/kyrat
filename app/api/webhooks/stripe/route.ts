import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { db } from '@/firebase/config';
import { collection, addDoc, doc, updateDoc, getDocs, query, where } from 'firebase/firestore';
import * as gtag from '@/lib/gtag';

// Ensure the Stripe secret and webhook secret are stored in environment variables
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

async function findOrCreateCustomer(stripeCustomerId: string, email: string) {
  const customersRef = collection(db, 'customers');
  const q = query(customersRef, where('stripeId', '==', stripeCustomerId));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    return querySnapshot.docs[0].id;
  } else {
    const docRef = await addDoc(customersRef, {
      stripeId: stripeCustomerId,
      email: email,
    });
    return docRef.id;
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const sig = req.headers.get('stripe-signature') as string;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    } catch (err: any) {
      console.warn(`⚠️  Webhook signature verification failed.`, err.message);
      return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;

      if (!session.customer_details?.email || !session.customer) {
         return NextResponse.json({ error: 'Missing customer details' }, { status: 400 });
      }
      
      const customerId = await findOrCreateCustomer(session.customer.toString(), session.customer_details.email);

      // Create Order
      const orderRef = await addDoc(collection(db, 'orders'), {
        customerId: doc(db, 'customers', customerId),
        total: session.amount_total,
        status: 'paid',
        createdAt: new Date(),
        stripeCheckoutSessionId: session.id,
      });

      // In a real scenario, you would have more details about the tickets
      // in the session metadata to create the individual tickets.
      // For now, we'll create a generic ticket entry.
      const ticketDoc = await addDoc(collection(db, 'tickets'), {
        orderId: orderRef,
        userId: doc(db, 'customers', customerId),
        status: 'active',
        createdAt: new Date(),
      });

      if (session.amount_total && session.metadata) {
        gtag.event({
            action: 'purchase',
            params: {
                transaction_id: session.id,
                value: session.amount_total / 100,
                currency: 'USD',
                items: [{
                    item_id: session.metadata.ticketTypeId,
                    item_name: "Festival Ticket", // You might want to fetch the real name
                    quantity: parseInt(session.metadata.quantity)
                }]
            }
        });
      }
    }

    return NextResponse.json({ received: true });
  } catch(error) {
      console.error("Error processing webhook:", error)
      // Return a generic error to prevent leaking implementation details
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
