import Koa from "koa";
const app = new Koa();
const port = 3000;

app.use(async (ctx) => {
  ctx.body = "Hello world";
});

app.listen(port, () => {
  console.log(`🚀 Server listening ${port} 🍟 🚀`);
});
