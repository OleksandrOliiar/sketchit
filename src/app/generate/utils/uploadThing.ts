import { generateReactHelpers } from "@uploadthing/react";

import type { OurFileRouter } from "@/lib/uploadThing";

export const { useUploadThing, uploadFiles } =
  generateReactHelpers<OurFileRouter>();
