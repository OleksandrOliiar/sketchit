import { z } from "zod";

type Props = {
  maxNumOutputs: number;
};

export const generateSchema = ({ maxNumOutputs }: Props) => {
  return z.object({
    prompt: z.string().min(2, {
      message: "Enter at least 2 characters",
    }),
    numOutputs: z.number().min(1).max(maxNumOutputs),
    isPublic: z.boolean().default(false),
    originalImage: z.string().url({
      message: "Select original image",
    }),
    imageToBecome: z.string().url({
      message: "Select image to become",
    }),
  });
};

export type GenerateFields = z.infer<
  ReturnType<typeof generateSchema>
>;
