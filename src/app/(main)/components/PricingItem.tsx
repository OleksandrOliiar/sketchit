"use client";

import { Button } from "@/ui";
import Image from "next/image";
import { useTransition } from "react";
import { toast } from "sonner";
import { createCheckoutSession } from "../actions";
import { Product } from "../types";

export default function PricingItem({
  description,
  name,
  priceId,
  priceAmount,
  image,
}: Product) {
  const [isPending, startTransition] = useTransition();

  const handleClick = () =>
    startTransition(async () => {
      const result = await createCheckoutSession({ priceId });

      if (!result.success || !result.data || !result.data.url) {
        toast.error("Failed to create checkout session");
        return;
      }

      const { data } = result;
      window.location.assign(data.url as string);
    });

  return (
    <div className="flex flex-col items-center gap-8 rounded-md bg-secondary p-7">
      <div className="relative h-[120px] w-[85px] overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="absolite left-0 top-0 h-full w-full object-cover"
        />
      </div>
      <h3>{name}</h3>
      <p className="!mt-0 text-center text-lg text-muted-foreground">
        {description}
      </p>
      <Button
        className="w-full"
        size="lg"
        onClick={handleClick}
        disabled={isPending}
      >
        {isPending ? "Wait..." : `Buy for ${priceAmount}$`}
      </Button>
    </div>
  );
}
