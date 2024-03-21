"use server";

import { db } from "@/lib/db";
import { AuthFields, authSchema } from "../../validations/auth";
import { Argon2id } from "oslo/password";
import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";

export const signin = async (data: AuthFields) => {
  const parsed = authSchema.safeParse(data);

  if (!parsed.success) {
    return { success: false, error: parsed.error.toString() };
  }

  const { username, password } = parsed.data;

  try {
    const existingUser = await db.query.user.findFirst({
      where: (user, { eq }) => eq(user.username, username),
    });

    if (!existingUser) {
      return { success: false, error: "Incorrect username or password" };
    }

    const isValidPassword = await new Argon2id().verify(
      existingUser.hashed_password,
      password,
    );

    if (!isValidPassword) {
      return {
        error: "Incorrect username or password",
      };
    }

    const session = await lucia.createSession(existingUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    return { success: true };
  } catch (error) {
    console.log({ error });
    return { success: false, error: "Failed to sign in" };
  }
};
