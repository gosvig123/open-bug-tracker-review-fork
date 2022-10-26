import Koa from "koa";
import Project from "../models/Projects";

const ProjectController = {
  async createProject(ctx: Koa.Context, next: Koa.Next) {
    try {
      const body = ctx.request.body;
      if (body === undefined || typeof body.name !== "string") {
        throw new Error("no project name");
      }

      const project = await Project.create(body.name);
      ctx.response.body = project;
      ctx.response.status = 201;
    } catch (error) {
      console.log(error);
    }
  },

  async getProject(ctx: Koa.Context) {
    //const project = await Project.getProjects()
    ctx.response.body = {};
  },
};

export default ProjectController;
