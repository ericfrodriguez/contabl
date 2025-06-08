import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { type KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";
import { type Context, type Next } from "hono";
import { createMiddleware } from "hono/factory";

export const auth = createMiddleware<{
  Variables: { user: KindeUser };
}>(async (ctx: Context, next: Next) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return ctx.json(
      {
        message: "User not authorized",
        status: "401",
      },
      401,
    );
  }

  ctx.set("user", user);

  await next();
});
