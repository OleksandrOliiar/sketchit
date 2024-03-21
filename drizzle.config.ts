import type { Config } from "drizzle-kit";
import { env } from "@/common/const";

export default {
  schema: "./src/lib/db.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: env.DATABASE_URL,
  },
} satisfies Config;
