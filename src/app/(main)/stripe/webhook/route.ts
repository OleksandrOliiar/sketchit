import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import Stripe from "stripe";
import { env } from "@/common/const";
import { db, user } from "@/lib/db";
import { eq, sql } from "drizzle-orm";

type Metadata = {
  userId: string;
  credits: string;
};

export async function POST(request: Request) {
  const body = await request.text();
  const signature = headers().get("Stripe-Signature") ?? "";

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (error) {
    const message = (error as Error).message ?? "Unknown stripe webhook error";
    return new Response(`Webhook error: ${message}`, { status: 400 });
  }

  if (event.type !== "checkout.session.completed") {
    return new Response(null, { status: 200 });
  }

  const completedEvent = event.data.object as Stripe.Checkout.Session & {
    metadata: Metadata;
  };

  const { credits, userId } = completedEvent.metadata;

  try {
    await db
      .update(user)
      .set({
        credits: sql`${user.credits} + ${credits}`,
      })
      .where(eq(user.id, userId));

    return new Response("Updated user successfully", { status: 200 });
  } catch (error) {
    const message = (error as Error).message ?? "Failed to update user";
    return new Response(message, { status: 500 });
  }
}
