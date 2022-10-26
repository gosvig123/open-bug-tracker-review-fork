import Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import cors from "@koa/cors";

import EventsController from "./controllers/events.controller";
import ProjectController from "./controllers/projects.controller";
import { Context } from "vm";
import { nextTick } from "process";

const app = new Koa();
const port = 3000;

const router = new Router();
app.use(cors());
app.use(bodyParser());

router.post("/events", EventsController.createEvent);
router.post("/projects", ProjectController.createProject);
router.get("/projects", ProjectController.getProjects);

app.listen(port, () => {
  console.log(`🚀 Server listening ${port} 🍟 🚀`);
});

app.on("error", async (err, ctx: Koa.Context, next: Koa.Next) => {
  console.log(err);
  await next();
});

app.use(router.routes());
