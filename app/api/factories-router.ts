import { z } from "zod";
import { eq, desc } from "drizzle-orm";
import { createRouter, publicQuery, adminTokenQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { factories } from "@db/schema";

export const factoriesRouter = createRouter({
  list: publicQuery.query(async () => {
    const db = getDb();
    return db.query.factories.findMany({
      where: eq(factories.isActive, true),
      orderBy: [desc(factories.createdAt)],
    });
  }),

  create: adminTokenQuery
    .input(z.object({
      name: z.string(),
      country: z.string(),
      countryAr: z.string().optional(),
      specialty: z.string().optional(),
      specialtyAr: z.string().optional(),
      moq: z.number().optional(),
      unitCost: z.number().optional(),
      packagingCost: z.number().optional(),
      productionDays: z.number().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = getDb();
      const result = db.insert(factories).values(input).run();
      return { id: Number(result.lastInsertRowid) };
    }),

  update: adminTokenQuery
    .input(z.object({
      id: z.number(),
      name: z.string().optional(),
      country: z.string().optional(),
      specialty: z.string().optional(),
      moq: z.number().optional(),
      unitCost: z.number().optional(),
      isActive: z.boolean().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = getDb();
      const { id, ...data } = input;
      await db.update(factories).set(data).where(eq(factories.id, id));
      return { success: true };
    }),

  delete: adminTokenQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.update(factories).set({ isActive: false }).where(eq(factories.id, input.id));
      return { success: true };
    }),
});
