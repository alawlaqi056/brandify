import { z } from "zod";
import { eq } from "drizzle-orm";
import { createRouter, publicQuery, adminTokenQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { settings } from "@db/schema";

export const settingsRouter = createRouter({
  get: publicQuery
    .input(z.object({ key: z.string() }))
    .query(async ({ input }) => {
      const db = getDb();
      const setting = await db.query.settings.findFirst({
        where: eq(settings.key, input.key),
      });
      return setting?.value || null;
    }),

  set: adminTokenQuery
    .input(z.object({ key: z.string(), value: z.string() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      const existing = await db.query.settings.findFirst({
        where: eq(settings.key, input.key),
      });
      if (existing) {
        await db.update(settings).set({ value: input.value }).where(eq(settings.id, existing.id));
      } else {
        await db.insert(settings).values({ key: input.key, value: input.value });
      }
      return { success: true };
    }),

  list: adminTokenQuery.query(async () => {
    const db = getDb();
    return db.query.settings.findMany();
  }),
});
