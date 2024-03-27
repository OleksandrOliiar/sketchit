"use server";

import { db, sketch } from "@/lib/db";
import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";

export const deleteSketch = async (sketchId: string) => {
  try {
    await db.delete(sketch).where(eq(sketch.id, sketchId));

    revalidateTag("sketches");

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message ?? "Failed to delete sketch",
    };
  }
};
