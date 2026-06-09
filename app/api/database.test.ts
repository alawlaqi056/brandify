import { describe, expect, it } from "vitest";
import { eq } from "drizzle-orm";
import { getDb } from "./queries/connection";
import { customers, orders } from "@db/schema";

describe("embedded database", () => {
  it("creates and reads local orders without external setup", async () => {
    const db = getDb();
    const email = `test-${Date.now()}@example.com`;
    const customer = db.insert(customers).values({
      fullName: "Local Test",
      email,
      phone: "000",
      country: "Local",
    }).run();
    const orderId = `TEST-${Date.now()}`;
    db.insert(orders).values({
      orderId,
      customerId: Number(customer.lastInsertRowid),
      category: "Perfumes",
      quantity: 100,
    }).run();
    const saved = await db.query.orders.findFirst({ where: eq(orders.orderId, orderId) });
    expect(saved?.orderId).toBe(orderId);
  });
});
