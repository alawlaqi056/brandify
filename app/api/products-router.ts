import { z } from "zod";
import { eq, desc } from "drizzle-orm";
import { createRouter, publicQuery, adminTokenQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { products } from "@db/schema";

export const productsRouter = createRouter({
  list: publicQuery
    .input(z.object({ categoryId: z.string().optional() }).optional())
    .query(async ({ input }) => {
      const db = getDb();
      if (input?.categoryId) {
        return db.query.products.findMany({
          where: eq(products.categoryId, input.categoryId),
          orderBy: [desc(products.createdAt)],
        });
      }
      return db.query.products.findMany({ orderBy: [desc(products.createdAt)] });
    }),

  create: adminTokenQuery
    .input(z.object({
      categoryId: z.string(),
      name: z.string(),
      nameAr: z.string().optional(),
      description: z.string().optional(),
      descriptionAr: z.string().optional(),
      priceMin: z.number().optional(),
      priceMax: z.number().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = getDb();
      const result = db.insert(products).values(input).run();
      return { id: Number(result.lastInsertRowid) };
    }),

  update: adminTokenQuery
    .input(z.object({
      id: z.number(),
      name: z.string().optional(),
      nameAr: z.string().optional(),
      description: z.string().optional(),
      priceMin: z.number().optional(),
      priceMax: z.number().optional(),
      isActive: z.boolean().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = getDb();
      const { id, ...data } = input;
      await db.update(products).set(data).where(eq(products.id, id));
      return { success: true };
    }),

  delete: adminTokenQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(products).where(eq(products.id, input.id));
      return { success: true };
    }),
});
