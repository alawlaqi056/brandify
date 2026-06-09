import { z } from "zod";
import { eq, desc } from "drizzle-orm";
import { createRouter, publicQuery, adminTokenQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { orders, orderStatusHistory, customers, quotations } from "@db/schema";

const optionalImageDataUrl = z.string()
  .max(1_400_000, "Image must be 1 MB or smaller")
  .refine((value) => value.startsWith("data:image/"), "Only image uploads are accepted")
  .optional();

export const ordersRouter = createRouter({
  // Public: Create a new order (from builders)
  create: publicQuery
    .input(
      z.object({
        customer: z.object({
          fullName: z.string().min(1),
          email: z.string().email(),
          phone: z.string().min(1),
          country: z.string().min(1),
          city: z.string().optional(),
          address: z.string().optional(),
          companyName: z.string().optional(),
          brandName: z.string().optional(),
          website: z.string().optional(),
          instagram: z.string().optional(),
          preferredContact: z.enum(["email", "phone", "whatsapp"]).optional(),
        }),
        category: z.string(),
        categoryAr: z.string().optional(),
        productSelections: z.record(z.string(), z.any()).optional(),
        packagingSelections: z.record(z.string(), z.any()).optional(),
        quantity: z.number().int().positive(),
        estimatedBudget: z.number().optional(),
        estimatedPrice: z.number().optional(),
        logoUrl: optionalImageDataUrl,
        referenceImageUrl: optionalImageDataUrl,
        projectDescription: z.string().optional(),
        aiRecommendation: z.record(z.string(), z.any()).optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();

      // Check if customer exists by email
      const existingCustomer = await db.query.customers.findFirst({
        where: eq(customers.email, input.customer.email),
      });

      let customerId: number;
      if (existingCustomer) {
        customerId = existingCustomer.id;
      } else {
        const result = db.insert(customers).values({
          fullName: input.customer.fullName,
          email: input.customer.email,
          phone: input.customer.phone,
          country: input.customer.country,
          city: input.customer.city || null,
          address: input.customer.address || null,
          companyName: input.customer.companyName || null,
          brandName: input.customer.brandName || null,
          website: input.customer.website || null,
          instagram: input.customer.instagram || null,
          preferredContact: input.customer.preferredContact || "email",
        }).run();
        customerId = Number(result.lastInsertRowid);
      }

      // Generate order ID
      const orderId = `ORD-${Date.now().toString(36).toUpperCase()}`;

      // Create order
      const orderResult = db.insert(orders).values({
        orderId,
        customerId,
        category: input.category,
        categoryAr: input.categoryAr || null,
        status: "submitted",
        productSelections: input.productSelections || null,
        packagingSelections: input.packagingSelections || null,
        quantity: input.quantity,
        estimatedBudget: input.estimatedBudget || null,
        estimatedPrice: input.estimatedPrice || null,
        logoUrl: input.logoUrl || null,
        referenceImageUrl: input.referenceImageUrl || null,
        projectDescription: input.projectDescription || null,
        aiRecommendation: input.aiRecommendation || null,
      }).run();

      const newOrderId = Number(orderResult.lastInsertRowid);

      // Create initial status history
      await db.insert(orderStatusHistory).values({
        orderId: newOrderId,
        status: "submitted",
        notes: "Order submitted by customer",
        visibleToCustomer: true,
      });

      return { orderId, id: newOrderId };
    }),

  // Admin: List all orders
  list: adminTokenQuery
    .input(
      z.object({
        status: z.string().optional(),
        category: z.string().optional(),
        search: z.string().optional(),
      }).optional()
    )
    .query(async ({ input }) => {
      const db = getDb();

      const allOrders = await db.query.orders.findMany({
        orderBy: [desc(orders.createdAt)],
      });

      // Get customers for each order
      const ordersWithCustomers = await Promise.all(
        allOrders.map(async (order) => {
          const customer = await db.query.customers.findFirst({
            where: eq(customers.id, order.customerId),
          });
          return { ...order, customer: customer || null };
        })
      );

      // Apply filters
      let filtered = ordersWithCustomers;
      if (input?.status) {
        filtered = filtered.filter((o) => o.status === input.status);
      }
      if (input?.category) {
        filtered = filtered.filter((o) => o.category === input.category);
      }
      if (input?.search) {
        const searchLower = input.search.toLowerCase();
        filtered = filtered.filter(
          (o) =>
            o.orderId.toLowerCase().includes(searchLower) ||
            o.customer?.fullName.toLowerCase().includes(searchLower) ||
            o.customer?.email.toLowerCase().includes(searchLower)
        );
      }

      return filtered;
    }),

  // Admin: Get single order with full details
  getById: adminTokenQuery
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const db = getDb();
      const order = await db.query.orders.findFirst({
        where: eq(orders.id, input.id),
      });
      if (!order) return null;

      const customer = await db.query.customers.findFirst({
        where: eq(customers.id, order.customerId),
      });
      const statusHistory = await db.query.orderStatusHistory.findMany({
        where: eq(orderStatusHistory.orderId, order.id),
        orderBy: [desc(orderStatusHistory.createdAt)],
      });
      const quotation = await db.query.quotations.findFirst({
        where: eq(quotations.orderId, order.id),
      });

      return {
        ...order,
        customer: customer || null,
        statusHistory,
        quotation: quotation || null,
      };
    }),

  // Public: Track order by orderId + email
  track: publicQuery
    .input(z.object({ orderId: z.string(), email: z.string() }))
    .query(async ({ input }) => {
      const db = getDb();
      const order = await db.query.orders.findFirst({
        where: eq(orders.orderId, input.orderId),
      });
      if (!order) return null;

      const customer = await db.query.customers.findFirst({
        where: eq(customers.id, order.customerId),
      });

      if (!customer || customer.email !== input.email) return null;

      const statusHistory = await db.query.orderStatusHistory.findMany({
        where: eq(orderStatusHistory.orderId, order.id),
        orderBy: [desc(orderStatusHistory.createdAt)],
      });

      const quotation = await db.query.quotations.findFirst({
        where: eq(quotations.orderId, order.id),
      });

      return {
        ...order,
        customer: {
          fullName: customer.fullName,
          email: customer.email,
          phone: customer.phone,
          country: customer.country,
        },
        statusHistory: statusHistory.filter((s) => s.visibleToCustomer),
        quotation: quotation || null,
      };
    }),

  // Admin: Update order status
  updateStatus: adminTokenQuery
    .input(
      z.object({
        id: z.number(),
        status: z.string(),
        notes: z.string().optional(),
        visibleToCustomer: z.boolean().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();

      await db
        .update(orders)
        .set({ status: input.status as any })
        .where(eq(orders.id, input.id));

      await db.insert(orderStatusHistory).values({
        orderId: input.id,
        status: input.status,
        notes: input.notes || null,
        visibleToCustomer: input.visibleToCustomer || false,
      });

      return { success: true };
    }),

  // Admin: Update order notes
  updateNotes: adminTokenQuery
    .input(
      z.object({
        id: z.number(),
        adminNotes: z.string().optional(),
        customerNotes: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      await db
        .update(orders)
        .set({
          adminNotes: input.adminNotes || null,
          customerNotes: input.customerNotes || null,
        })
        .where(eq(orders.id, input.id));
      return { success: true };
    }),
});
