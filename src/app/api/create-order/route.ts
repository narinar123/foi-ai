import { NextResponse } from 'next/server';
import { Cashfree } from 'cashfree-pg';

// Initialize Cashfree only if keys exist to prevent crashing on Vercel if missing
if (process.env.CASHFREE_APP_ID && process.env.CASHFREE_SECRET_KEY) {
  // @ts-ignore
  Cashfree.XClientId = process.env.CASHFREE_APP_ID;
  // @ts-ignore
  Cashfree.XClientSecret = process.env.CASHFREE_SECRET_KEY;
  // @ts-ignore
  Cashfree.XEnvironment = process.env.CASHFREE_ENVIRONMENT === 'PRODUCTION' ? Cashfree.Environment.PRODUCTION : Cashfree.Environment.SANDBOX;
}

export async function POST(req: Request) {
  try {
    const { amount, currency, customer_id, customer_phone, customer_email } = await req.json();

    if (!process.env.CASHFREE_APP_ID) {
      // Mock mode for demo if not configured
      return NextResponse.json({
        mock: true,
        payment_session_id: "mock_session_" + Date.now(),
        order_id: "order_" + Date.now()
      });
    }

    const order_id = "order_" + Date.now() + "_" + Math.floor(Math.random() * 1000);

    const request = {
      order_amount: amount,
      order_currency: currency || 'INR',
      order_id: order_id,
      customer_details: {
        customer_id: customer_id || 'demo_user',
        customer_phone: customer_phone || '9999999999',
        customer_email: customer_email || 'demo@foi.ai'
      },
      order_meta: {
        return_url: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/payment-status?order_id=${order_id}`
      }
    };

    // @ts-ignore
    const response = await Cashfree.PGCreateOrder("2023-08-01", request);
    return NextResponse.json(response.data);

  } catch (error: any) {
    console.error("Cashfree order creation failed", error);
    return NextResponse.json({ error: error.message || 'Payment initiation failed' }, { status: 500 });
  }
}
