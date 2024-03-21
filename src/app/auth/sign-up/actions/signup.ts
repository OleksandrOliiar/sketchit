"use server";

import { AuthFields, authSchema } from "../../validations/auth";
import { Argon2id } from "oslo/password";
import { generateId } from "lucia";
import { db, user } from "@/lib/db";
import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";

export const signup = async (data: AuthFields) => {
  const parsed = authSchema.safeParse(data);

  if (!parsed.success) {
    return { success: false, error: parsed.error.toString() };
  }

  const { password, username } = parsed.data;

  try {
    const hashedPassword = await new Argon2id().hash(password);
    const userId = generateId(15);

    const existingUser = await db.query.user.findFirst({
      where: (user, { eq }) => eq(user.username, username),
    });

    if (existingUser) {
      return { success: false, error: "Username is already taken" };
    }

    await db.insert(user).values({
      id: userId,
      username: username,
      hashed_password: hashedPassword,
    });

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, error: "Failed to sign up" };
  }
};
