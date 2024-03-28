"use server";

import { db } from "@/lib/db";
import { unstable_cache } from "next/cache";

type Props = {
  userId: string;
  prompt: string;
};

export const getUserSketches = unstable_cache(
  async ({ prompt, userId }: Props) => {
    try {
      const userSketches = await db.query.sketch.findMany({
        where: (sketch, { eq, and, like }) =>
          and(eq(sketch.userId, userId), like(sketch.prompt, `%${prompt}%`)),
        columns: {
          id: true,
          createdAt: true,
          prompt: true,
          results: true,
          isPublic: true,
        },
        orderBy: (sketch, { desc }) => desc(sketch.createdAt),
      });

      return userSketches;
    } catch (error) {
      throw new Error("Failed to get user sketches");
    }
  },
  ["sketches"],
  {
    tags: ["sketches"],
  },
);
