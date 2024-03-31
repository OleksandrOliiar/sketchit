"use server";

import { getUser } from "@/common/utils/auth";
import { stripeProducts } from "../const";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";

type Props = {
  credits: keyof typeof stripeProducts;
};

export const createCheckoutSession = async ({ credits }: Props) => {
  try {
    const { user } = await getUser();

    if (!user) {
      throw new Error("You must be logged in to checkout");
    }

    const priceId = stripeProducts[credits];

    if (!priceId) {
      throw new Error("Price id not found");
    }

    const headerList = headers();
    const origin = headerList.get("origin");

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      metadata: {
        userId: user.id,
        credits,
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
