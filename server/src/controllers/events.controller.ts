import Koa from "koa";

const EventsController = {
  async createEvent(ctx: Koa.Context, next: Koa.Next) {
    try {
      ctx.body = ctx.request.body;
      console.log(ctx.body);
      console.log("hit");
      await next();
    } catch (error) {
      console.log(error);
    }
  },
};

export default EventsController;
