"use server";

import { tags } from "@/common/const";
import { db } from "@/lib/db";
import { unstable_cache } from "next/cache";

export const getPublicSketches = unstable_cache(
  async () => {
    try {
      const sketches = await db.query.sketch.findMany({
        where: (sketch, { eq }) => eq(sketch.isPublic, true),
        columns: {
          id: true,
          results: true,
          prompt: true,
        },
        orderBy: (sketch, { desc }) => desc(sketch.createdAt),
        limit: 5,
      });

      return sketches;
    } catch (error) {
      throw new Error("Failed to get public sketches");
    }
  },
  [tags.community],
  {
    tags: [tags.community],
    revalidate: 3600,
  },
);
