import { getDb } from "./connection";
import { users } from "@db/schema";
import { eq } from "drizzle-orm";

export function findUserByUnionId(unionId: string) {
  return getDb().query.users.findFirst({
    where: eq(users.unionId, unionId),
  });
}

export async function upsertUser(data: {
  unionId: string;
  name?: string | null;
  email?: string | null;
  avatar?: string | null;
  lastSignInAt?: Date;
}) {
  const db = getDb();
  const existing = await db.query.users.findFirst({
    where: eq(users.unionId, data.unionId),
  });

  if (existing) {
    await db
      .update(users)
      .set({
        name: data.name ?? existing.name,
        email: data.email ?? existing.email,
        avatar: data.avatar ?? existing.avatar,
        lastSignInAt: new Date(),
      })
      .where(eq(users.id, existing.id));
    return { ...existing, ...data, lastSignInAt: new Date() };
  } else {
    const result = db.insert(users).values({
      unionId: data.unionId,
      name: data.name,
      email: data.email,
      avatar: data.avatar,
    }).run();
    return {
      id: Number(result.lastInsertRowid),
      unionId: data.unionId,
      name: data.name ?? null,
      email: data.email ?? null,
      avatar: data.avatar ?? null,
      role: "user" as const,
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignInAt: new Date(),
    };
  }
}
