import { describe, expect, it } from "vitest";
import { createAdminToken } from "./admin-auth";

describe("admin authentication", () => {
  it("rejects credentials when secure admin environment values are not configured", async () => {
    await expect(createAdminToken("admin@example.com", "password")).rejects.toMatchObject({
      code: "UNAUTHORIZED",
    });
  });
});

