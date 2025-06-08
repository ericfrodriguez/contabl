import { Hono } from "hono";
import { handle } from "hono/vercel";

import transactions from "./router/transactions.router";

export const runtime = "nodejs";

const app = new Hono().basePath("/api");

app.route("/transactions", transactions);

export const GET = handle(app);
export const POST = handle(app);
