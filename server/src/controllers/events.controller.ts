import Koa from "koa";
import { getOccurrencesCollection } from "../lib/mongo";
import prisma from "../lib/prisma";

interface EventInput {
  project_id: number;
  message: string;
  stack_trace: string;
  metadata: any;
}

const EventsController = {
  async createEvent(ctx: Koa.Context, next: Koa.Next) {
    try {
      const event = ctx.request.body as unknown as EventInput;

      let bug = await prisma.bugs.findUnique({
        where: {
          message: event.message,
        },
      });

      if (bug) {
        bug = await prisma.bugs.update({
          where: { message: bug.message },
          data: {
            num_occurences: bug.num_occurences + 1,
            last_seen: new Date().toISOString(),
          },
        });
      } else {
        bug = await prisma.bugs.create({
          data: {
            project_id: event.project_id,
            message: event.message,
            stack_trace: event.stack_trace,
            num_occurences: 1,
            first_seen: new Date().toISOString(),
            last_seen: new Date().toISOString(),
          },
        });
      }

      // BUG CREATED
      const occurrences = await getOccurrencesCollection();
      await occurrences.insertOne({
        project_id: event.project_id,
        bug_id: bug.bug_id,
        message: event.message,
        stack_trace: event.stack_trace,
        metadata: event.metadata,
      });

      ctx.status = 202;
    } catch (error) {
      console.log(error);
    }
  },
};

export default EventsController;
