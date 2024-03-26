import Replicate from "replicate";
import { env } from "@/common/const";

export const replicate = new Replicate({
  auth: env.REPLICATE_API_TOKEN,
});
