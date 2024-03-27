import { z } from "zod";

export const createSketchSchema = z.object({
  prompt: z.string().min(2, {
    message: "Enter at least 2 characters",
  }),
  width: z.number(),
  height: z.number(),
  numOutputs: z.number().min(1).max(4),
});

export type createSketchFields = z.infer<typeof createSketchSchema>;
