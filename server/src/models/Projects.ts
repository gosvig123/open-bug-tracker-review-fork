import prisma from "../lib/prisma";

class Project {
  constructor(public id: number, public name: string) {}

  static async create(projectName: string): Promise<Project> {
    const { prjoect_id, name } = await prisma.project.create({
      data: {
        name: projectName,
      },
    });
    return new Project(prjoect_id, name);
  }
}

export default Project;
