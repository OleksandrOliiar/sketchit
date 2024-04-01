import { generateUploadDropzone } from "@uploadthing/react";
import type { OurFileRouter } from "@/lib/uploadThing";

export const UploadDropzone = generateUploadDropzone<OurFileRouter>();
