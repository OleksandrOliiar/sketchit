"use server";

import { z } from "zod";
import { createSketchSchema } from "../validations/sketch";
import { replicate } from "../lib/replicate";
import { generateId } from "lucia";
import { db, sketch } from "@/lib/db";
import { getUser } from "@/common/utils/auth";

const schema = createSketchSchema.merge(
  z.object({
    image: z.string(),
  }),
);

type Props = z.infer<typeof schema>;

export const createSketch = async (data: Props) => {
  const parsed = schema.safeParse(data);

  if (!parsed.success) {
    return { success: false, error: parsed.error.toString() };
  }

  const { prompt, height, width, image, numOutputs } = parsed.data;

  try {
    const { user } = await getUser();
    if (!user) throw new Error("Anuthorized");

    const output = (await replicate.run(
      "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
      {
        input: {
          image,
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
      userId: user.id,
    });

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message ?? "Failed to create sketch",
    };
  }
};
