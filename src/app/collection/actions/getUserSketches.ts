"use server";

import { db } from "@/lib/db";

export const getUserSketches = async (userId: string) => {
  try {
    const userSketches = await db.query.sketch.findMany({
      where: (sketch, { eq }) => eq(sketch.userId, userId),
      columns: {
        id: true,
        createdAt: true,
        prompt: true,
        results: true,
      },
    });

    return userSketches;
  } catch (error) {
    throw new Error("Failed to get user sketches");
  }
};
