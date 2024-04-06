"use server";

import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
import { Product } from "../types";

const isStripeProduct = (product: any): product is Stripe.Product => {
  return "name" in product && "description" in product;
};

export const getProducts = async () => {
  try {
    const prices = await stripe.prices.list({
      expand: ["data.product"],
    });

    const result: Product[] = [];

    prices.data.forEach((price) => {
      const { id, unit_amount, product } = price;

      if (!isStripeProduct(product)) {
        return;
      }

      result.push({
        priceId: id,
        priceAmount: (unit_amount ?? 0) / 100,
        name: product.name ?? "",
        description: product.description ?? "",
        image: product.images[0],
      });
    });

    return result.reverse();
  } catch (error) {
    throw new Error("Failed to get products");
  }
};
