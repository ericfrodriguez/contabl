import { Hono } from "hono";
import { db } from "@/server/db";
import {
  transactions,
  transactions as transactionsSchema,
} from "@/server/db/schema";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { HTTPException } from "hono/http-exception";
import { auth } from "../middleware/auth.middleware";

const app = new Hono();

app.get("/", auth, async (ctx) => {
  // const { getUser } = getKindeServerSession();
  // const user = await getUser();
  console.log(ctx.var.user);
  // const transactions = await db.insert(transactionsSchema).values({
  //   amount: 100,
  // });
  return ctx.json({
    success: true,
    transactions: [],
  });
});

export default app;
