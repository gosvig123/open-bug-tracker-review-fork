import Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import cors from "@koa/cors";

import { PrismaClient } from "@prisma/client";

const app = new Koa();
const port = 3000;

const prisma = new PrismaClient()

const router = new Router();
app.use(cors());
app.use(bodyParser());

router.post("/events", async (ctx: Koa.Context, next: Koa.Next) => {
  ctx.body = ctx.request.body;
  console.log(ctx.body);
  await next();
});

app.listen(port, () => {
  console.log(`🚀 Server listening ${port} 🍟 🚀`);
});

app.use(router.routes());

// POST localhost:3000/events
