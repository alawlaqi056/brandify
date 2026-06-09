import { ErrorMessages } from "@contracts/constants";
import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import type { TrpcContext } from "./context";
import { verifyAdminToken } from "./admin-auth";

export const t = initTRPC.context<TrpcContext>().create({
  transformer: superjson,
});

export const createRouter = t.router;
export const publicQuery = t.procedure;

const requireAuth = t.middleware(async (opts) => {
  const { ctx, next } = opts;

  if (!ctx.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: ErrorMessages.unauthenticated,
    });
  }

  return next({ ctx: { ...ctx, user: ctx.user } });
});

function requireRole(role: string) {
  return t.middleware(async (opts) => {
    const { ctx, next } = opts;

    if (!ctx.user || ctx.user.role !== role) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: ErrorMessages.insufficientRole,
      });
    }

    return next({ ctx: { ...ctx, user: ctx.user } });
  });
}

export const authedQuery = t.procedure.use(requireAuth);
export const adminQuery = authedQuery.use(requireRole("admin"));

// Admin-only middleware using x-admin-token header (for Brandify admin panel)
const requireAdminToken = t.middleware(async (opts) => {
  const { ctx, next } = opts;
  const authHeader = ctx.req.headers.get("x-admin-token");

  if (!authHeader) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Admin token required" });
  }

  try {
    const admin = await verifyAdminToken(authHeader);
    return next({ ctx: { ...ctx, admin } });
  } catch {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid admin token" });
  }
});

export const adminTokenQuery = publicQuery.use(requireAdminToken);
