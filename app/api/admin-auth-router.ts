import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import { createAdminToken, verifyAdminToken } from "./admin-auth";

export const adminAuthRouter = createRouter({
  login: publicQuery
    .input(z.object({ email: z.string().email(), password: z.string().min(1) }))
    .mutation(async ({ input }) => {
      const token = await createAdminToken(input.email, input.password);
      return { token, email: input.email };
    }),

  me: publicQuery.query(async ({ ctx }) => {
    try {
      const token = ctx.req.headers.get("x-admin-token");
      if (!token) return null;
      const admin = await verifyAdminToken(token);
      return admin;
    } catch {
      return null;
    }
  }),
});
