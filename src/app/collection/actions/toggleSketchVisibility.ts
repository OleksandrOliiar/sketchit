"use server";

import { db, sketch } from "@/lib/db";
import { eq, not } from "drizzle-orm";
import { revalidateTag } from "next/cache";
import {
  SketchOperationFields,
  sketchOperationSchema,
} from "../validations/sketchOperationSchema";

export const toggleSketchVisibility = async (data: SketchOperationFields) => {
  const parsed = sketchOperationSchema.safeParse(data);

  if (!parsed.success) {
    return { success: false, error: parsed.error.toString() };
  }

  const { sketchId } = parsed.data;

  try {
    await db
      .update(sketch)
      .set({
        isPublic: not(sketch.isPublic),
      })
      .where(eq(sketch.id, sketchId));

    revalidateTag("sketches");

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message ?? "Failed to toggle sketch visibility",
    };
  }
};
