import { z } from "zod";

export const sketchOperationSchema = z.object({
  sketchId: z.string(),
});

export type SketchOperationFields = z.infer<typeof sketchOperationSchema>;
