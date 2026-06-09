import { SignJWT, jwtVerify } from "jose";
import { TRPCError } from "@trpc/server";
import { scryptSync, timingSafeEqual } from "node:crypto";
import { env } from "./lib/env";

function verifyPassword(password: string): boolean {
  const expected = Buffer.from(env.adminPasswordScryptHash, "hex");
  if (!expected.length) return false;
  const actual = scryptSync(password, env.adminPasswordSalt, expected.length);
  return timingSafeEqual(actual, expected);
}

function jwtSecret() {
  return new TextEncoder().encode(env.adminJwtSecret);
}

export async function createAdminToken(email: string, password: string): Promise<string> {
  if (email.toLowerCase() !== env.adminEmail.toLowerCase() || !verifyPassword(password)) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid credentials" });
  }

  const token = await new SignJWT({ email, role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("24h")
    .setIssuedAt()
    .sign(jwtSecret());

  return token;
}

export async function verifyAdminToken(token: string): Promise<{ email: string; role: string }> {
  try {
    const { payload } = await jwtVerify(token, jwtSecret(), { clockTolerance: 60 });
    return payload as { email: string; role: string };
  } catch {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid or expired token" });
  }
}
