import Koa from "koa";

const ProjectController = {
  async createProject(ctx: Koa.Context, next: Koa.Next) {
    try {
      const name = ctx.request.body;
      console.log("in project controller. ");
      //const project = await Project.create(name)
      ctx.response.body = name;
      ctx.response.status = 201;
    } catch (error) {
      console.log(error);
    }
  },
  // ,

  async getProject(ctx: Koa.Context) {
    //const project = await Project.getProjects()
    ctx.response.body = {};
  },
};

export default ProjectController;
