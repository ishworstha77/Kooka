// app/ccehkotu - sessions / route.ts;
import { stripe } from "@/lib/stripe";
import { getServerSession, User } from "next-auth";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { authOptions } from "@/lib/auth";

// data needed for checkout
export interface CheckoutSubscriptionBody {
  plan: string;
  planDescription: string;
  amount: number;
  interval: "month" | "year";
  customerId?: string;
  productId?: string;
  items?: { productId: number; quantity: number };
}

export async function POST(req: Request) {
  const body = (await req.json()) as CheckoutSubscriptionBody;
  const origin = req.headers.get("origin") || "http://localhost:3000";
  const session = await getServerSession(authOptions);
  const userId = Number((session.user as User)?.id);

  // if user is logged in, redirect to thank you page, otherwise redirect to signup page.
  const success_url = !body.customerId
    ? `${origin}/?session_id={CHECKOUT_SESSION_ID}&`
    : `${origin}/thankyou?session_id={CHECKOUT_SESSION_ID}`;

  try {
    // this is MF
    const session = await stripe.checkout.sessions.create({
      // if user is logged in, stripe will set the email in the checkout page
      customer: body.customerId,
      payment_method_types: ["card"],
      mode: "payment",
      line_items: body?.map((b) => ({
        ...b,
        price_data: {
          ...b.price_data,
          product_data: {
            ...b.price_data.product_data,
            metadata: { ...b.price_data.product_data.metadata, userId },
          },
        },
      })),
      success_url: success_url,
      cancel_url: `${origin}/cancel?session_id={CHECKOUT_SESSION_ID}`,
      metadata: { userId },
    });
    return NextResponse.json(session);
  } catch (error) {
    if (error instanceof Stripe.errors.StripeError) {
      const { message } = error;
      return NextResponse.json({ message }, { status: error.statusCode });
    }
  }
}
