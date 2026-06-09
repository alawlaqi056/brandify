import { relations } from "drizzle-orm";
import { orders, orderStatusHistory, quotations } from "./schema";

export const ordersRelations = relations(orders, ({ one, many }) => ({
  statusHistory: many(orderStatusHistory),
  quotation: one(quotations, {
    fields: [orders.id],
    references: [quotations.orderId],
  }),
}));

export const orderStatusHistoryRelations = relations(orderStatusHistory, ({ one }) => ({
  order: one(orders, {
    fields: [orderStatusHistory.orderId],
    references: [orders.id],
  }),
}));

export const quotationsRelations = relations(quotations, ({ one }) => ({
  order: one(orders, {
    fields: [quotations.orderId],
    references: [orders.id],
  }),
}));
