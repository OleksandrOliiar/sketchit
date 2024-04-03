"use server";

import { getUser } from "@/common/utils/auth";
import { UTApi } from "uploadthing/server";

export const deleteFiles = async (fileKeys: string[]) => {
  try {
    const user = await getUser();

    if (!user) {
      throw new Error("You must authorized to delete files");
    }

    const result = await new UTApi().deleteFiles(fileKeys);

    if (!result.success) {
      throw new Error("Failed to delete files");
    }

    return { success: true };
  } catch (error) {
    console.log(error);
    const message = (error as Error)?.message ?? "Failed to delete files";
    throw new Error(message);
  }
};
