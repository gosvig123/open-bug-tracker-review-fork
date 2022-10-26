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

  async getProjects(ctx: Koa.Context) {
    try {
      const projects = await Project.getProjects();
      ctx.response.body = projects;
    } catch (error) {
      console.log(error);
    }
  },

  // async getProject(ctx: Koa.Context) {
  //   try {
  //     const body = ctx.request.body;
  //     if (body === undefined || typeof body.id !== 'number') {
  //       throw new Error("no project name");
  //     }

  //     const project = await Project.getProjects(body.id)
  //     ctx.response.body = { project };
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },
};

export default ProjectController;
