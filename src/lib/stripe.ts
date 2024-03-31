import Stripe, { Stripe as TStripe } from "stripe";
import { env } from "@/common/const";

export const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
  typescript: true,
});

TStripe.PricesResource;
