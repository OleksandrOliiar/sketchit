"use client";

import { Button } from "@/ui";
import { createCheckoutSession } from "../actions";
import { toast } from "sonner";

export default function CheckoutButton() {
  const handleClick = async () => {
    const result = await createCheckoutSession({ credits: 50 });

    if (!result.success || !result.data || result.data.url === null) {
      toast.error("Failed to create checkout session");
      return;
    }

    const { data } = result;
    window.location.assign(data.url as string);
  };

  return <Button onClick={handleClick}>Buy 50 credits</Button>;
}
