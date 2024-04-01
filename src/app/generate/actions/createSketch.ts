"use server";

import { z } from "zod";
import { CreateSketchFields, generateSketchSchema } from "../validations";
import { replicate } from "../lib/replicate";
import { generateId } from "lucia";
import { db, sketch, user } from "@/lib/db";
import { getUser } from "@/common/utils/auth";
import { revalidateTag } from "next/cache";
import { eq, sql } from "drizzle-orm";

type Props = CreateSketchFields & {
  image: string;
};

export const createSketch = async (data: Props) => {
  try {
    const { user: currentUser } = await getUser();
    if (!currentUser) throw new Error("Anuthorized");

    const { id: currentUserId, credits } = currentUser;

    const schema = generateSketchSchema({ maxNumOutputs: credits }).merge(
      z.object({
        image: z.string(),
      }),
    );

    const parsed = schema.safeParse(data);

    if (!parsed.success) {
      return { success: false, error: parsed.error.toString() };
    }

    const { prompt, height, width, image, numOutputs, isPublic } = parsed.data;

    const output = (await replicate.run(
      "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
      {
        input: {
          // image,
          width,
          height,
          prompt,
          num_outputs: numOutputs,
          refine: "expert_ensemble_refiner",
          apply_watermark: false,
          num_inference_steps: 25,
        },
      },
    )) as string[];

    const sketchId = generateId(15);

    await db.insert(sketch).values({
      id: sketchId,
      prompt,
      results: output,
      userId: currentUserId,
      isPublic,
    });

    await db
      .update(user)
      .set({
        credits: sql`${user.credits} - ${numOutputs}`,
      })
      .where(eq(user.id, currentUserId));

    revalidateTag("sketches");

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message ?? "Failed to create sketch",
    };
  }
};
