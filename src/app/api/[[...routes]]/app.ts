import { Hono } from "hono";
import { auth } from "@/features/auth";

export const runtime = "edge";

export const app = new Hono<{
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
}>()
  .basePath("/api")
  .get("/", (c) => c.json({ success: true }));

app.use("*", async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session) {
    c.set("user", null);
    c.set("session", null);
    return next();
  }

  c.set("user", session.user);
  c.set("session", session.session);
  return next();
});

app.on(["GET", "POST"], "/auth/**", (c) => {
  return auth.handler(c.req.raw);
});
