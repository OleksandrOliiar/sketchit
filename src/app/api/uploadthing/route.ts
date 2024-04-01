import { fileRouter } from "@/lib/uploadThing";
import { createRouteHandler } from "uploadthing/next";

export const { GET, POST } = createRouteHandler({
  router: fileRouter,
});
