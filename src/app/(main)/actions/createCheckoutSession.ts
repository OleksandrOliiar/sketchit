"use server";

import { getUser } from "@/common/utils/auth";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { env } from "@/common/const";

type Props = {
  priceId: string;
};

export const createCheckoutSession = async ({ priceId }: Props) => {
  try {
    const { user } = await getUser();

    if (!user) {
      throw new Error("You must be logged in to checkout");
    }

    const headerList = headers();
    const origin = headerList.get("origin");

    const stripeProducts = {
      [env["50_CREDITS_PRODUCT_ID"]]: 50,
      [env["100_CREDITS_PRODUCT_ID"]]: 100,
      [env["250_CREDITS_PRODUCT_ID"]]: 250,
    };

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      metadata: {
        userId: user.id,
        credits: stripeProducts[priceId],
      },
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${origin}/`,
      cancel_url: `${origin}/`,
    });

    return { success: true, data: checkoutSession };
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message ?? "Failed to create a checkout",
    };
  }
};
