import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { env } from "@/common/const";
import { text, pgTable, timestamp } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  username: text("username").notNull().unique(),
  github_id: text("github_id").unique(),
  hashed_password: text("hashed_password").notNull(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export const sketch = pgTable("sketch", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  prompt: text("prompt"),
  results: text("results").array(4),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

const sql = neon(env.DATABASE_URL);

export const db = drizzle(sql, { schema: { user, session, sketch } });
