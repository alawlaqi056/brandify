import { z } from "zod";
import { eq } from "drizzle-orm";
import { createRouter, adminTokenQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { quotations } from "@db/schema";

export const quotationsRouter = createRouter({
  list: adminTokenQuery.query(async () => {
    const db = getDb();
    return db.select().from(quotations).orderBy(quotations.createdAt);
  }),

  create: adminTokenQuery
    .input(z.object({
      orderId: z.number(),
      manufacturingCost: z.number(),
      packagingCost: z.number(),
      brandingCost: z.number(),
      websiteCost: z.number(),
      photographyCost: z.number(),
      marketingCost: z.number(),
      shippingCost: z.number(),
      profitMargin: z.number(),
      subtotal: z.number().optional(),
      totalPrice: z.number().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = getDb();
      const subtotal = input.manufacturingCost + input.packagingCost + input.brandingCost + input.websiteCost + input.photographyCost + input.marketingCost + input.shippingCost;
      const marginAmount = Math.round(subtotal * (input.profitMargin / 100));
      const totalPrice = subtotal + marginAmount;

      const result = db.insert(quotations).values({
        orderId: input.orderId,
        manufacturingCost: input.manufacturingCost,
        packagingCost: input.packagingCost,
        brandingCost: input.brandingCost,
        websiteCost: input.websiteCost,
        photographyCost: input.photographyCost,
        marketingCost: input.marketingCost,
        shippingCost: input.shippingCost,
        profitMargin: input.profitMargin,
        subtotal,
        totalPrice,
      }).run();

      // Update order status to quotation_sent
      const { orders } = await import("@db/schema");
      await db.update(orders).set({ status: "quotation_sent" }).where(eq(orders.id, input.orderId));

      return { id: Number(result.lastInsertRowid), totalPrice };
    }),

  update: adminTokenQuery
    .input(z.object({
      id: z.number(),
      status: z.enum(["draft", "sent", "accepted", "rejected", "revised"]).optional(),
      manufacturingCost: z.number().optional(),
      packagingCost: z.number().optional(),
      brandingCost: z.number().optional(),
      websiteCost: z.number().optional(),
      shippingCost: z.number().optional(),
      profitMargin: z.number().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = getDb();
      const { id, ...data } = input;
      await db.update(quotations).set(data).where(eq(quotations.id, id));
      return { success: true };
    }),

  delete: adminTokenQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(quotations).where(eq(quotations.id, input.id));
      return { success: true };
    }),
});
