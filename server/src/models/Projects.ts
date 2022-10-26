import { count } from "console";
import prisma from "../lib/prisma";

class Project {
  constructor(public id: number, public name: string) {}

  static async create(projectName: string): Promise<Project> {
    const { id, name } = await prisma.project.create({
      data: {
        name: projectName,
      },
    });
    return new Project(id, name);
  }

  static async getProjects(): Promise<any> {
    let projects = await prisma.project.findMany({});

    const addDetailsToProject =()=> 

    return await Promise.all(projects.map(async (project) => {
      return {
        ...project,
        bugs_count_active: await prisma.bugs.count({
          where: {
            project_id: project.id,
          },
        }),
      };
    }));
  }

  // static async getProject(id: number): Promise<any> {

  // }
}

export default Project;
