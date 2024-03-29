"use server";

import { db } from "@/lib/db";

export const getPublicSketches = async () => {
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
};
