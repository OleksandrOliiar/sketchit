import { z } from "zod";

type Props = {
  maxNumOutputs: number;
};

export const generateSketchSchema = ({ maxNumOutputs }: Props) => {
  return z.object({
    prompt: z.string().min(2, {
      message: "Enter at least 2 characters",
    }),
    width: z.number(),
    height: z.number(),
    numOutputs: z.number().min(1).max(maxNumOutputs),
    isPublic: z.boolean().default(false),
  });
};

export type CreateSketchFields = z.infer<
  ReturnType<typeof generateSketchSchema>
>;
