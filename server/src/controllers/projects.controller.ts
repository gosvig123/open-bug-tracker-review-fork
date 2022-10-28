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

  async getProject(ctx: Koa.Context) {
    try {
      const id = parseInt(ctx.params.id);
      if (id === undefined) {
        throw new Error("no project name");
      }
      console.log(id);
      const result = await Project.getProject(id);
      ctx.response.body = result;
    } catch (error) {
      console.log(error);
    }
  },

  async getBugdetails (ctx: Koa.Context) {
    try {
      const id = parseInt(ctx.params.id)
      const bug_id = 2
      // google.com/2/jrehkjhkj31ur4tyf98dcj
    } catch (error) {
      console.log(error)
    }
  }
};

export default ProjectController;
