import { db } from "@/db/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as authShcema from "@/db/schema/auth";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "sqlite", schema: authShcema }),
  emailAndPassword: { enabled: true },
  trustedOrigins: [process.env.BETTER_AUTH_URL!],
  plugins: [nextCookies()],
});
