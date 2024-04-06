"use server";

import { GenerateFields, generateSchema } from "../validations";
import { replicate } from "../lib/replicate";
import { generateId } from "lucia";
import { db, sketch, user } from "@/lib/db";
import { getUser } from "@/common/utils/auth";
import { revalidateTag } from "next/cache";
import { eq, sql } from "drizzle-orm";
import { tags } from "@/common/const";

export const generate = async (data: GenerateFields) => {
  try {
    const { user: currentUser } = await getUser();
    if (!currentUser) throw new Error("Anuthorized");

    const { id: currentUserId, credits } = currentUser;

    const schema = generateSchema({ maxNumOutputs: credits });
    const parsed = schema.safeParse(data);

    if (!parsed.success) {
      return { success: false, error: parsed.error.toString() };
    }

    const { prompt, numOutputs, isPublic, imageToBecome, originalImage } =
      parsed.data;

    const output = (await replicate.run(
      "fofr/become-image:8d0b076a2aff3904dfcec3253c778e0310a68f78483c4699c7fd800f3051d2b3",
      {
        input: {
          image: originalImage,
          image_to_become: imageToBecome,
          prompt,
          number_of_images: numOutputs,
          prompt_strength: 2,
          denoising_strength: 1,
          instant_id_strength: 1,
          image_to_become_noise: 0.3,
          control_depth_strength: 0.8,
          image_to_become_strength: 0.75,
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

    revalidateTag(tags.collection);

    if (isPublic) {
      revalidateTag(tags.community);
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message ?? "Failed to generate",
    };
  }
};
