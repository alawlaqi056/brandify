import { createRouter, publicQuery } from "./middleware";
import { helloRouter } from "./hello-router";
import { adminAuthRouter } from "./admin-auth-router";
import { ordersRouter } from "./orders-router";
import { productsRouter } from "./products-router";
import { factoriesRouter } from "./factories-router";
import { quotationsRouter } from "./quotations-router";
import { settingsRouter } from "./settings-router";

export const appRouter = createRouter({
  health: publicQuery.query(() => ({ status: "ok" })),
  hello: helloRouter,
  adminAuth: adminAuthRouter,
  orders: ordersRouter,
  products: productsRouter,
  factories: factoriesRouter,
  quotations: quotationsRouter,
  settings: settingsRouter,
});

export type AppRouter = typeof appRouter;
