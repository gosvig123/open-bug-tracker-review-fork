import Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import cors from "@koa/cors";
import koaConnect from "koa-connect";

import dotenv from "dotenv";
dotenv.config();

import EventsController from "./controllers/events.controller";
import ProjectController from "./controllers/projects.controller";
import { Context } from "vm";
import { nextTick } from "process";
import BugsController from "./controllers/bugs.controller";
import querystring from "query-string";
import axios from "axios";

const app = new Koa();
const port = process.env.PORT || 8080;

const router = new Router();
var options = {
  origin: "*",
};

app.use(async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", "*");
  ctx.set("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  await next();
});

app.use(cors(options));
app.use(bodyParser());

router.post("/events", EventsController.createEvent);
router.post("/projects", ProjectController.createProject);

router.get("/bugs", BugsController.getBugs);
router.get("/bugs/:id", BugsController.getBug);
router.put("/bugs/:id/solve", BugsController.updateBug);

router.get("/projects", ProjectController.getProjects);
router.get("/project/:id", ProjectController.getProject);

router.get("/bugs/:id/occurrence/:id", EventsController.getEvent);

router.get("/login/github", (ctx: Context) => {
  const qs = {
    client_id: process.env.GITHUB_CLIENT_ID,
    redirect_uri: process.env.GITHUB_AUTHORIZE_URI,
    scope: "user:email",
    state: process.env.GITHUB_STATE,
  };
  ctx.redirect(
    `https://github.com/login/oauth/authorize?${querystring.stringify(qs)}`
  );
});

router.get("/login/github/authorize", async (ctx: Context) => {
  const code = ctx.query.code;
  const state = ctx.query.state;
  if (state !== process.env.GITHUB_STATE) {
    ctx.body = "Invalid state";
    return;
  }

  const response = await axios.post(
    "https://github.com/login/oauth/access_token",
    {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code: code,
      redirect_uri: process.env.GITHUB_AUTHORIZE_URI,
    }
  );

  const data = querystring.parse(response.data);
  const accessToken = data.access_token;
  const userResponse = await axios.get("https://api.github.com/user", {
    headers: {
      Authorization: `token ${accessToken}`,
    },
  });
  console.log(userResponse.data);
});

// router.get("/health", (ctx: Context) => {
//   ctx.body = ctx.req.oidc.isAuthenticated() ? "Logged in" : "Logged out";
// });
// //@ts-ignore
// router.get("/private", requiresAuth(), (ctx: Context) => {
//   ctx.body = ctx.req.oidc.user;
// });

app.listen(port, () => {
  console.log(`🚀 Server listening ${port} 🍟 🚀`);
});

app.on("error", async (err, ctx: Koa.Context, next: Koa.Next) => {
  console.log(err);
  await next();
});

app.use(router.routes());
